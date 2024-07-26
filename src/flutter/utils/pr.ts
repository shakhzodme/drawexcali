import React from "react";

export type PT = {
	recalculate(): void;
};

export const p = React.createContext<PT | null>(null);

export function useP(skipCheck: true): PT | null;
export function useP(skipCheck: false): PT;
export function useP(skipCheck = false) {
	const ctx = React.useContext(p);

	if (!skipCheck && !ctx)
		throw new Error("P is used not inside flutter widget");

	return ctx;
}
