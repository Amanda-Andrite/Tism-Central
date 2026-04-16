<script>
    export let text = '';
    export let buttonClass = '';
	export let type = 'button';
</script>

<button type={type} class={`app-button ${buttonClass}`} on:click>
    {text}
</button>

<style>
    .app-button {
        padding: 12px;
        border: none;
        border-radius: var(--radius-md);
        background-color: var(--searchbar-accent);
        color: white;
        font-size: var(--font-base);
        font-family: var(--font-body);
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    }

    .app-button:hover {
		background-color: var(--searchbar-background);
		color: var(--text-primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.app-button:active {
		transform: translateY(0);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
	}

	.app-button:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}

    .start-button {
		width: 100%;
		max-width: 240px;
	}

    .continue-button {
		width: 100%;
	}

</style>