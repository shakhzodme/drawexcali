import type { RefObject } from "react";

type UnrefType<T> = T extends RefObject<infer RT> ? RT : never;
type UnrefTuple<Tuple extends [...unknown[]]> = {
	[Index in keyof Tuple]: UnrefType<Tuple[Index]>;
} & { length: Tuple["length"] };

export function getRefs<T extends [...RefObject<unknown>[]], RT>(
	refs: [...T],
	fn: (els: UnrefTuple<T>) => RT,
) {
	const items = refs.map((ref) => ref.current).filter((el) => el != null);
	if (items.length === refs.length) {
		return fn(items as Parameters<typeof fn>["0"]);
	}
}
