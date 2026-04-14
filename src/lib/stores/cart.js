import {writable} from 'svelte/store';

//cart store to manage cart state
export const cartOverlayVisible = writable(false);

//store for cart items, each item has id, name, price, quantity
//(array of objects)
export const cartItems = writable([]);