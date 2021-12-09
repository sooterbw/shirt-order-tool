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
    <div>
        {selectedForm.name}
    </div>
    <div>
        {selectedForm.orders}
    </div>
</div>

<style>
    .cell {
        padding: 2em;
        margin: 1em 2em 1em 1em;
        height: calc(100% - 6em);
        background-color: rgb(209, 213, 219);
        border-radius: 10px;
    }
</style>