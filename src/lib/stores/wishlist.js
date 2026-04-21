import { writable } from 'svelte/store';

//wishlist store with localstorage
function createWishlist() {

    //check if localstorage is available and get stored wishlist
    if (typeof localStorage !== 'undefined') {
        stored = localStorage.getItem('wishlist');//get stored wishlist from localstorage
    }

    const initial = stored ? JSON.parse(stored) : [];//use stored data, otherwise start with empty array
    const store = writable(initial);//create writable store with initial value from localstorage

    store.subscribe((value) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('wishlist', JSON.stringify(value));//update localstorage whenever wishlist changes
        }
    }); return store;//return
}
export const wishlist = createWishlist();
