import {writable} from 'svelte/store';

export const showAuthModal = writable(false);

export const authState = writable({
    email: '',
    password: '',
    errorMessage: '',
    successMessage: ''

});

export function resetAuthState() {
    authState.set({
        email: '',
        password: '',
        errorMessage: '',
        successMessage: '',
    });
}