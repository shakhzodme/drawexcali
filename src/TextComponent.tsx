import type konva from "konva";
import React from "react";
import { Group, Text } from "react-konva";
import { EVENT_STOP_EDITING } from "./events";
import { TransformComponent } from "./TransformComponent";
import { getRefs } from "./helpers";

export const TextComponent: React.FC<{
	x: number;
	y: number;
	text: string;
}> = ({ x, y, text: _text }) => {
	const [text, setText] = React.useState(_text);
	const groupRef = React.useRef<konva.Group>(null);
	const textRef = React.useRef<konva.Text>(null);
	const [editable, setEditable] = React.useState(false);
	const inputRef = React.useRef<HTMLInputElement>();

	React.useEffect(() => {
		if (!editable) return;
		getRefs([textRef, groupRef], ([textEl, groupEl]) => {
			if (!inputRef.current) {
				const input = document.createElement("input");
				inputRef.current = input;
				input.style.position = "absolute";
				input.style.visibility = "hidden";
				document.body.append(input);
			}
			// biome-ignore lint/style/noNonNullAssertion: exists
			const input = inputRef.current!;
			const pos = textEl.getAbsolutePosition();
			input.style.visibility = "visible";
			input.style.fontFamily = "Arial";
			input.style.fontSize = `${15}px`;
			input.style.width = `${textEl.getWidth()}px`;
			input.style.top = `${pos.y - 4}px`;
			input.style.left = `${pos.x}px`;

			// const stage = textEl.getStage();
			// const scale = stage?.getAbsoluteScale()?.x ?? 1;
			// input.style.transform = `scale(${scale})`;

			input.value = text;
			input.addEventListener("input", (e) => {
				const target = e.target as HTMLInputElement;
				setText(target.value ?? "");
				groupEl.setSize(textEl.getSize());
				groupEl.fire("sizechange");
			});
			input.focus();
		});
	}, [editable]);

	React.useEffect(() => {
		const handler = () => {
			if (!editable) return;
			setEditable(false);
			const input = inputRef.current;
			if (!input) return;
			input.style.visibility = "hidden";
		};
		document.body.addEventListener(EVENT_STOP_EDITING.type, handler);
		return () =>
			document.body.removeEventListener(EVENT_STOP_EDITING.type, handler);
	}, [editable]);

	React.useEffect(() => () => inputRef.current?.remove?.(), []);

	return (
		<TransformComponent nodeRef={groupRef}>
			<Group ref={groupRef} x={x} y={y} draggable={!editable}>
				<Text
					visible={!editable}
					ref={textRef}
					contentEditable={true}
					editModeEnabled={true}
					text={text}
					fontSize={15}
					fontFamily="Arial"
					fill="green"
					onDblClick={() => setEditable(true)}
				/>
			</Group>
		</TransformComponent>
	);
};
