import { writable } from 'svelte/store';

export const notification = writable<string | null>(null);


export function showNotification(msg: string) {
    notification.set(msg);
    setTimeout(() => {
        notification.set(null);
    }, 2000);
}
