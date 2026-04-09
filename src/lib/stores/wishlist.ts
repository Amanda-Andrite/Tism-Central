import { writable } from 'svelte/store';

function createWishlist() {
    const stored =
        typeof localStorage !== 'undefined'
            ? localStorage.getItem('wishlist')
            : null;

    const initial: number[] = stored ? JSON.parse(stored) : [];
    const store = writable<number[]>(initial);

    store.subscribe((value) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('wishlist', JSON.stringify(value));
        }
    });return store;
}
export const wishlist = createWishlist();
