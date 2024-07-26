import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { FlutterApp } from "./FlutterApp.tsx";

// biome-ignore lint/style/noNonNullAssertion: react root
ReactDOM.createRoot(document.getElementById("root")!).render(
	// <React.StrictMode>
	// <App />,
	<FlutterApp />,
	// </React.StrictMode>,
);
