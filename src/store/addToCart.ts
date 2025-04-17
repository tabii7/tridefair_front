import { observable } from "@legendapp/state";

export const addToCart$ = observable({
  cartItems: 0 as number,
  disableCartButton: [] as any,
  checkOutData: {} as any,
});
