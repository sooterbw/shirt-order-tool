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
			<div class="span-1"><NewOrder /></div>
			<div class="span-1"><OrderOverview /></div>
		</div>
		<div class="span-2"><OrderTable /></div>
	</div>
	{/if}
</main>

<style>
	main {
		position: relative;
		display: flex;
		max-height: 100vh;
	}

	.main-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
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