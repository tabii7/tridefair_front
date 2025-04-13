import { observable } from "@legendapp/state";

export const addToCart$ = observable({
  cartItems: 0,
  disableCartButton: [] as any,
  checkOutData: {} as any,
});
