import { writable } from 'svelte/store';

//notification store for showing tempo messages
export const notification = writable(null);

//function to show notification message
export function showNotification(msg) {
    notification.set(msg);//message
    setTimeout(() => {
        notification.set(null);//clear notification after 2 seconds
    }, 2000);
}
