import React from "react";
import { Group, Rect, Text } from "react-konva";
import { getRefs } from "../helpers";
import type Konva from "konva";
import { p, useP, type PT } from "./utils/pr";
import _ from "lodash";

export type BaseFlexProps = {
	debug?: string;
	debugColor?: string;
	direction: "row" | "column";
	children: React.ReactNode;
	gap?: number;
};

export const BaseFlex: React.FC<BaseFlexProps> = ({
	debug,
	direction,
	debugColor,
	children,
	gap = 0,
}) => {
	// biome-ignore lint/suspicious/noExplicitAny: log fn
	const log = (...args: any[]) => debug && console.log(debug, ...args);

	const ctx = useP(true);
	const [ctr, setCtr] = React.useState(0);

	const groupRef = React.useRef<Konva.Group>(null);
	const bgRef = React.useRef<Konva.Rect>(null);
	const [height, setHeight] = React.useState(0);
	const [width, setWidth] = React.useState(0);

	React.useEffect(() => {
		getRefs([groupRef, bgRef], ([group, bg]) => {
			group.setAttr("data-flutter", true);
			bg.setAttr("data-flutter", true);
			bg.setAttr("data-debug", true);
		});
	}, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		log(ctr);
		return getRefs([groupRef], ([groupEl]) => {
			let newGroupHeight = 0;
			let newGroupWidth = 0;
			let lastY = 0;
			let lastX = 0;

			for (const child of groupEl.children) {
				if (!child.getAttr("data-flutter") || child.getAttr("data-debug"))
					continue;

				if (direction === "column") {
					child.y(lastY);
					lastY += child.height() + gap;

					newGroupHeight += child.height();
					newGroupWidth =
						child.width() > newGroupWidth ? child.width() : newGroupWidth;
				} else {
					child.x(lastX);
					lastX += child.width() + gap;

					newGroupHeight =
						child.height() > newGroupHeight ? child.height() : newGroupHeight;
					newGroupWidth += child.width();
				}
			}

			if (direction === "column") {
				setHeight(newGroupHeight + (groupEl.children.length - 1) * gap);
				setWidth(newGroupWidth);
			} else {
				setHeight(newGroupHeight);
				setWidth(newGroupWidth + (groupEl.children.length - 1) * gap);
			}

			log(
				[...groupEl.children].filter((v) => !v.getAttr("data-debug")),
				height,
				width,
			);
		});
	}, [ctr]);

	const pv: PT = React.useMemo(
		() => ({
			recalculate: _.debounce(() => {
				log("RECALCULATING");
				ctx?.recalculate?.();
				setCtr((ctr) => ctr + 1);
			}, 0),
		}),
		[],
	);

	React.useEffect(() => {
		ctx?.recalculate?.();
	}, [children]);

	return (
		<p.Provider value={pv}>
			<Group ref={groupRef} height={height} width={width}>
				<Rect
					ref={bgRef}
					width={width}
					height={height}
					fill={debugColor ?? "rgba(0,0,0,0.2)"}
					stroke="black"
				/>
				{children}
			</Group>
		</p.Provider>
	);
};
