<script>
    import { formData } from "../stores.js";

	let selectedForm;

	$: {
		selectedForm = $formData.forms.filter((form) => {
			return form.active == true;
		})[0]
	}
</script>

<div class="cell">
    {selectedForm.orders}
</div>

<style>
    .cell {
        padding: 2em;
        margin: 1em 2em 1em 2em;
        min-height: calc(100% - 6em);
        background-color: rgb(209, 213, 219);
        border-radius: 10px;
    }
</style>