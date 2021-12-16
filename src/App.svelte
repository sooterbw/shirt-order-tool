<script>
	import FormList from './lib/components/FormList.svelte';
	import OrderTable from './lib/components/OrderTable.svelte';
	import OrderOverview from './lib/components/OrderOverview.svelte';
	import NewOrder from './lib/components/NewOrder.svelte';
	import { formData } from "./lib/stores.js";

	let selectedForm;

	$: {
		selectedForm = $formData.forms.filter((form) => {
			return form.active == true;
		})[0]
	}

</script>

<main>
	<div>
		<FormList />
	</div>
	{#if selectedForm}
	<div class="main-container">
		<div class="flex-row">
			<div class="span-1"><OrderOverview /></div>
			<div class="span-1"><NewOrder /></div>
		</div>
		<div class="span-2"><OrderTable /></div>
	</div>
	{:else}
	<div class="none-selected">
		<h1>Select a Form</h1>
		<h1>or</h1>
		<h1>Create a New One</h1>
	</div>
	{/if}
</main>

<style>
	main {
		position: relative;
		display: flex;
		max-height: 100vh;
		overflow-y: scroll;
	}

	.main-container {
		padding-top: 1em;
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
	}

	.none-selected {
		height: 100%;
		widows: 100%;
		margin: auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.flex-row {
		display: flex;
		min-height: 50vh;
	}

	.flex-row div {
		width: 100%;
	}

	.span-2 {
		grid-column: span 2;
	}
</style>