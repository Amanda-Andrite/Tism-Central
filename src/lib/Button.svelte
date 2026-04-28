<script>
	//Props allow this component to be reused with different text and styles
    export let text = ''; //Text inside button
    export let buttonClass = ''; //Extra class passed for any styling variations
	export let type = 'button'; //Button type (button, submit etc)
</script>


<!-- Reusable button component, uses dynamic class binding so that different styles can be applied while keeping the design consistent -->
<button type={type} class={`app-button ${buttonClass}`} on:click>
    {text}
</button>

<style>
	.app-button {
		padding: var(--space-md);
		border: none;
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
		color: var(--color-white);
		font-size: var(--font-base);
		font-family: var(--font-body);
		cursor: pointer;

		transition: transform 0.15s ease, box-shadow 0.2s ease, background-color 0.2s ease;
	}

	.app-button:hover {
		background-color: var(--color-hover-button);
		color: var(--color-white);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px var(--color-shadow);
	}

	/* Active state - simulates a button "press" interaction */
	.app-button:active {
		transform: translateY(0);
		box-shadow: 0 2px 6px var(--color-shadow);
	}

	/* accessibility for keyboard users */
	.app-button:focus-visible {
		outline: 2px solid var(--color-accent);
		outline-offset: 2px;
	}
	
	/* Variant used on start page buttons */
	.start-button {
		width: 100%;
		max-width: 240px;
	}

	/* Variant used in modal */
	.continue-button {
		width: 100%;
	}

	/* Variant used for edit/delete actions */
	.action-button {
		width: 80px;
		padding: var(--space-sm) 0;
		font-size: var(--font-sm);
	}

</style>