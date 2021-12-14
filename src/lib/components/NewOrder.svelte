<script>
    import { formData } from "../stores.js";
    import { updateFormData } from "../data";

	let selectedForm;
    let order = [];
    let orderRow = {};

	$: {
		selectedForm = $formData.forms.filter((form) => {
			return form.active == true;
		})[0]
	}

    function addRow(row) {
        order.push(row)
        console.log(order)
        order = order
        orderRow = {};
    }

    function handleSubmit() {
        $formData[selectedForm]
        updateFormData($formData)
    }
</script>

<div class="cell">
    <div class="heading">
        <h3>New Order</h3>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-field">
            <label for="">Customer Name</label>
            <input type="text" required>
        </div>
        <table>
            <thead>
                <tr>
                    <th class="qty">qty</th>
                    <th class="type">type</th>
                    <th class="size">size</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#if order.length < 1}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                {:else}
                {#each order as row, i}
                <tr>
                    <td>{order[i].quantity}</td>
                    <td>{order[i].type}</td>
                    <td>{order[i].size}</td>
                    <td></td>
                </tr>
                {/each}
                {/if}
            </tbody>
        </table>
            <div class="inputs">
                <div>
                    <input class="qty" type="number" min="0" bind:value={orderRow.quantity}>
                </div>
                <div>
                    <select class="type" bind:value={orderRow.type}>
                        <option value="" default></option>
                        {#each $formData.options.types as type, i}
                        <option value="{type.name}">{type.name}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <select class="size" bind:value={orderRow.size}>
                        <option value="" default></option>
                        {#each $formData.options.sizes as size, i}
                        <option value="{size}">{size}</option>
                        {/each}
                    </select>
                </div>
                <div>
                    <div class="submit" on:click="{() => addRow(orderRow)}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                </div>
            </div>

        <button class="submit">
            Create
        </button>
    </form>
</div>

<style>
    h3 {
        margin: .5em 0 .5em 0;
    }

    table {
        height: 250px;
        overflow-y: scroll;
        padding: 1em;
        width: 100%;
    }

    th {
        text-align: start;
        text-transform: capitalize;
        width: max-content;
    }
    
    tr {
        height: 1em;
    }

    button {
        position: absolute;
        bottom: 1em;
        right: 1em;
    }

    .inputs div .submit {
        display: flex;
        justify-content: center;
        justify-items: center;
        border-radius: 10px;
        position: inherit;
        height: 2em;
        padding-left: .5em;
        padding-right: .5em;
        cursor: pointer;
    }

    svg {
        color: white;
        margin: auto;
    }

    .cell {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 2em;
        margin: 1em 1em 1em 2em;
        height: calc(100% - 6em);
        background-color: rgb(209, 213, 219);
        border-radius: 10px;
    }

    .heading {
        align-self: flex-start;
        width: 250px;
    }

    .form-field {
        width: 250px;
    }

    .inputs {
        display: flex;
        width: 250px;
    }

    .inputs div {
        margin-right: .5em;
    }

    .qty {
        width: 50px;
    }
    .type {
        width: 125px;
    }
    .size {
        width: 50px;
    }
</style>