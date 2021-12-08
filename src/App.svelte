<script>
	import FormList from './lib/components/FormList.svelte';
	import OrderTable from './lib/components/OrderTable.svelte';
	import OrderOverview from './lib/components/OrderOverview.svelte';
	import NewOrder from './lib/components/NewOrder.svelte';
</script>

<main>
	<div>
		<FormList />
	</div>
	<div class="main-container">
		<div><NewOrder index=0/></div>
		<div><OrderOverview index=0/></div>
		<div><OrderTable index=0/></div>
	</div>
</main>

<style>
	main {
		position: relative;
		display: flex;
	}

	.main-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding-left: 2em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>