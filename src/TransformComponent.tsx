import type Konva from "konva";
import type { RefObject } from "react";
import React from "react";
import { Group, Rect } from "react-konva";
import { getRefs } from "./helpers";
import { KonvaEventListener } from "konva/lib/Node";

export const TransformComponent: React.FC<{
	children: React.ReactNode;
	nodeRef: RefObject<Konva.Group>;
}> = ({ children, nodeRef }) => {
	React.useEffect(() => {
		return getRefs([nodeRef], ([nodeEl]) => {
			const sizechangehandler = () => {
				console.log("HERERER", nodeEl.getSize());
			};

			nodeEl.on("sizechange", sizechangehandler);

			return () => {
				nodeEl.off("sizechange", sizechangehandler);
			};
		});
	}, [nodeRef]);

	return (
		<Group>
			<Rect fill="blue" />
			{children}
		</Group>
	);
};
