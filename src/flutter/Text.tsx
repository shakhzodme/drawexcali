import { Text as KonvaText } from "react-konva";
import type Konva from "konva";
import { getRefs } from "../helpers";
import React from "react";
import { useP } from "./utils/pr";

export const Text: React.FC<{
	text?: string;
}> = ({ text = "" }) => {
	const ref = React.useRef<Konva.Text>(null);
	const ctx = useP(false);

	React.useEffect(() => {
		getRefs([ref], ([item]) => {
			item.setAttr("data-flutter", true);
		});

		return () => {
			ctx.recalculate();
		};
	}, []);

	React.useEffect(() => {
		getRefs([ref], ([item]) => {
			item.setText(text);
			ctx.recalculate();
		});
	}, [text]);

	return <KonvaText ref={ref} text={text} fontSize={30} />;
};
