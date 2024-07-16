import type { Vector2d } from "konva/lib/types";
import React from "react";
import { type KonvaNodeEvents, Layer, Stage, Text } from "react-konva";
import { TextComponent } from "./TextComponent";
import { useStore } from "./store";
import { EVENT_INSERT_TEXT, EVENT_STOP_EDITING } from "./events";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";

const App: React.FC = () => {
  const editing = useStore((state) => state.editing);
  const [scale, setScale] = React.useState<Vector2d>({
    x: 1,
    y: 1,
  });

  const onWheel: KonvaNodeEvents["onWheel"] = (e) => {
    const delta = (e.evt.deltaY * -1) / 1000;
    setScale(({ x: scaleOld }) => {
      const _scale = Math.abs(scaleOld + delta);
      const scale = _scale < 0.2 ? scaleOld : _scale > 3 ? scaleOld : _scale;
      return { x: scale, y: scale };
    });
  };

  const [insertingText, setInsertingText] = React.useState(false);
  React.useEffect(() => {
    const handler = () => {
      setInsertingText(true);
    };
    document.body.addEventListener(EVENT_INSERT_TEXT.type, handler);
    return () => {
      document.body.removeEventListener(EVENT_INSERT_TEXT.type, handler);
    };
  }, []);
  const onClick: KonvaNodeEvents["onClick"] = (e) => {
    document.body.dispatchEvent(EVENT_STOP_EDITING);
    console.log(e);
  };

  return (
    <div>
      <div className="fixed top-0 size-full flex flex-col z-10 pointer-events-none p-2">
        <Toolbar />
        {/* <Sidebar /> */}
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        draggable={!editing}
        onWheel={onWheel}
        scale={scale}
        onClick={onClick}
        style={{
          cursor: insertingText ? "crosshair" : "default",
        }}
      >
        <Layer>
          <TextComponent x={50} y={50} text="Example text" />
        </Layer>
      </Stage>
    </div>
  );
};

export default App;
