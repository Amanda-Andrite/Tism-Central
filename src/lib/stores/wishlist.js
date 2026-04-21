import { writable } from 'svelte/store';
import { browser } from '$app/environment';

//wishlist store with localstorage
function createWishlist() {

    const initial = browser //check if running in browser
        ? JSON.parse(localStorage.getItem('wishlist') || '[]')//get data or empty array
        : [];//if not in browser, return empty array

    const store = writable(initial);//create store

    //update localstorage when store changes
    if (browser) {
        store.subscribe((value) => {
            localStorage.setItem('wishlist', JSON.stringify(value));//update
        });
    }
    return store;//return
}
export const wishlist = createWishlist();
