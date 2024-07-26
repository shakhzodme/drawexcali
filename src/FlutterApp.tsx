import { Layer, Stage } from "react-konva";
import { Text } from "./flutter/Text";
import React from "react";
import { Row } from "./flutter/Row";
import { Column } from "./flutter/Column";

// const Text = React.forwardRef<Konva.Text, Konva.TextConfig>((props, ref) => {
// 	return <KonvaText {...props} ref={ref} />;
// });

export const FlutterApp: React.FC = () => {
	const [tx, setTx] = React.useState<number[]>([]);

	const randomize = () =>
		setTx(new Array(Math.floor(Math.random() * 15)).fill(0));

	React.useEffect(() => {
		randomize();
	}, []);

	return (
		<>
			<button type="button" onClick={randomize}>
				etet
			</button>
			<Stage width={window.innerWidth} height={window.innerHeight} draggable>
				<Layer>
					<Column debug="outerlayer">
						<Column gap={5} debug="col1">
							{tx.map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<Text key={i} text={i.toString()} />
							))}
						</Column>
						<Row gap={0}>
							<Text text="1" />
							<Text text="2" />
							<Text text="3" />
							<Text text="4" />
						</Row>
						<Column gap={0} debug="col2">
							<Text text="5" />
							<Text text="6" />
							<Text text="7" />
							<Text text="8" />
						</Column>
					</Column>
				</Layer>
			</Stage>
		</>
	);
};
