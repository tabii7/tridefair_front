import { observable } from "@legendapp/state";

export const categoryProducts$ = observable({
  categoryProducts: [] as any,
  searchQuery: false as any,
});
