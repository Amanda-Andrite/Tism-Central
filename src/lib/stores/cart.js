import {writable} from 'svelte/store';

//cart store to manage cart state
//if true, cart overlay is visible, otherwise hidden
export const cartOverlayVisible = writable(false);

//store for cart items, each item has id, name, price, quantity
//(array of objects)
export const cartItems = writable([]);