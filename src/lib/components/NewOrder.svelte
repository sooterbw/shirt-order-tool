<script>
    import { formData } from "../stores.js";
    import { updateFormData } from "../data";

	let selectedForm;
    let order = [];
    let orderRow = {};
    let errMsg = '';
    let total = 0;
    let name = '';

	$: {
		selectedForm = $formData.forms.filter((form) => {
			return form.active == true;
		})[0]
	}

    function addRow(row) {
        let push = true;
        if(row.size && row.quantity && row.type) {
            for(let i = 0; i < $formData.options.types.length; i ++) {
                if ($formData.options.types[i].name == row.type) {
                    total += $formData.options.types[i].price
                    if (row.size == 'AXXL') {
                        total += 2
                    } else if (row.size == 'AXXXL') {
                        total += 4
                    }
                }
            }
            for (let i = 0; i<order.length; i++) {
                if (row.type == order[i].type && row.size == order[i].size) {
                    push = false;
                    order[i].quantity += row.quantity
                }
            }
            if (push) {
                order.push(row)
            }
            order = order
            orderRow = {};
            errMsg = ''
        } else {
            errMsg = 'Fill out all fields'
        }
        console.log($formData.forms[$formData.forms.indexOf(selectedForm)])
    }

    function handleSubmit() {
        let push = true;
        let form = $formData.forms[$formData.forms.indexOf(selectedForm)];
        // add new order
        $formData.forms[$formData.forms.indexOf(selectedForm)].orders.push({
            name: name,
            subtotal: total,
            order: order
        })
        $formData = $formData
        updateFormData($formData)
        order = []
        total = 0
        name = ''
    }
</script>

<div class="cell">
    <form on:submit|preventDefault={handleSubmit}>
        <div class="heading">
            <h3>New Order</h3>
            <div class="total">
                Total: ${total}
            </div>        
        </div>
        <div class="form-field">
            <label for="">Customer Name</label>
            <input type="text" bind:value={name} required>
        </div>
        <div class="table-container">
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
        </div>
        <div class="inputs">
            <input class="qty" type="number" min="0" bind:value={orderRow.quantity}>
            <select class="type" bind:value={orderRow.type}>
                <option value="" default></option>
                {#each $formData.options.types as type, i}
                <option value="{type.name}">{type.name}</option>
                {/each}
            </select>
            <select class="size" bind:value={orderRow.size}>
                <option value="" default></option>
                {#each $formData.options.sizes as size, i}
                <option value="{size}">{size}</option>
                {/each}
            </select>
            <div class="add" on:click="{() => addRow(orderRow)}">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </div>
        </div>

        {#if errMsg}
        <p class="error">{errMsg}</p>
        {/if}

        <button class="submit">
            Create Order
        </button>
    </form>
</div>

<style>
    h3, .total {
        margin: .5em 0 .5em 0;
    }

    .table-container {
        min-width: 450px;
        margin-top: 20px;
        overflow: hidden;
    }

    .qty {
        width: 50px;
    }

    .size {
        width: 20%;
    }

    .type {
        width: 60%;
    }

    .total {
        font-size: 18px;
    }

    table {
        border-color: transparent;
        border-spacing: 0;
        width: 100%;
    }

    thead {
        background-color: rgb(243 244 246);
    }

    th, td {
        text-align: left;
        padding-left: 10px;
        height: 2em;
    }

    input, select {
        height: 42px;
    }

    svg {
        color: white;
        margin: auto;
    }

    .form-field {
        width: 100%;
    }

    .form-field input {
        width: 100%;
    }

    .table-container {
        background-color: white;
        border-radius: 10px;
    }

    .inputs {
        margin-top: 20px;
        display: flex;
        height: 42px;
        width: 100%;
    }

    .inputs select {
        margin-left: 10px;
    }

    .cell {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2em;
        margin: 1em 2em 1em 1em;
        height: calc(100% - 6em);
        background-color: rgb(209, 213, 219);
        border-radius: 10px;
        filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    }

    .heading {
        display: flex;
        justify-content: space-between;
        align-self: flex-start;
        width: 100%;
    }

    .add {
        display: flex;
        justify-content: center;
        margin-left: 10px;
        align-items: center;
        border-radius: 10px;
        height: 100%;
        width: 42px;
        background-color: rgba(91, 33, 182);
    }

    .submit {
        height: 42px;
        margin-top: 20px;
    }

    .error {
        color: red;
    }

</style>