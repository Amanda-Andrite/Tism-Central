import { writable } from 'svelte/store';

//wishlist store with localstorage
function createWishlist() {
    const stored =
        typeof localStorage !== 'undefined'
            ? localStorage.getItem('wishlist')
            : null;

    const initial = stored ? JSON.parse(stored) : [];//start with empty array
    const store = writable(initial);//create writable store with initial value from localstorage

    store.subscribe((value) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('wishlist', JSON.stringify(value));//update localstorage whenever wishlist changes
        }
    });return store;//return
}
export const wishlist = createWishlist();
