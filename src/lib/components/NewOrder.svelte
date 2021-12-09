<script>
    import { formData } from "../stores.js";

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
        orderRow = {};
    }
</script>

<div class="cell">
    <div class="heading">
        <h3>New Order</h3>
    </div>
    <form>
        <div class="form-field">
            <label for="">Customer Name</label>
            <input type="text" required>
        </div>
        <table>
            <thead>
                <tr>
                    <th>qty</th>
                    <th>type</th>
                    <th>size</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#each order as row, i}
                <tr>
                    <td>{order[i].quantity}</td>
                    <td>{order[i].type}</td>
                    <td>{order[i].size}</td>
                    <td></td>
                </tr>
                {/each}
                <tr>
                    <td>
                        <input type="number" min="0" bind:value={orderRow.quantity}>
                    </td>
                    <td>
                        <select bind:value={orderRow.type}>
                            <option value="" default></option>
                            {#each $formData.options.types as type, i}
                            <option value="{type.name}">{type.name}</option>
                            {/each}
                        </select>
                    </td>
                    <td>
                        <select bind:value={orderRow.size}>
                            <option value="" default></option>
                            {#each $formData.options.sizes as size, i}
                            <option value="{size}">{size}</option>
                            {/each}
                        </select>
                    </td>
                    <td>
                        <div class="submit" on:click="{() => addRow(orderRow)}">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
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
        padding-top: 1em;
        width: 100%;
    }

    th {
        text-align: start;
        text-transform: capitalize;
        width: max-content;
    }
    
    tr {
        height: 2em;
    }

    td {
        height: 100%;
    }

    button {
        position: absolute;
        bottom: 1em;
        right: 1em;
    }

    td .submit {
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

    input {
        width: 100%;
    }

    input[type=number] {
        width: 4em;
        padding-left: .75em;
    }
</style>