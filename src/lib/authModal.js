import {writable} from 'svelte/store';

//Controls whether the auth modal is visible/not (true=modal open / false=modal closed)
export const showAuthModal = writable(false);

//Stores all data for the auth form
export const authState = writable({
    email: '',
    password: '',
    errorMessage: '',
    successMessage: ''

});

//Resets the auth form to default state (used when opening/closing modal to clear old data)
export function resetAuthState() {
    authState.set({
        email: '',
        password: '',
        errorMessage: '',
        successMessage: '',
    });
}