<script>
    import { formData } from "../stores.js";
    import { updateFormData } from "../data";

	let selectedForm;
    let sizes = $formData.options.sizes;
    let types = $formData.options.types;
    let orders = [];


	$: {
		selectedForm = $formData.forms.filter((form) => {
			return form.active == true;
		})[0]
        orders = selectedForm.orders
	}

    function checkPaid(order) {
        let isPaid = $formData.forms[$formData.forms.indexOf(selectedForm)].orders[orders.indexOf(order)].paid
        if(isPaid) {
            $formData.forms[$formData.forms.indexOf(selectedForm)].orders[orders.indexOf(order)].paid = false
        } else {
            $formData.forms[$formData.forms.indexOf(selectedForm)].orders[orders.indexOf(order)].paid = true
        }
        updateFormData($formData)
        $formData = $formData
    }

    function deleteOrder(order) {
        $formData.forms[$formData.forms.indexOf(selectedForm)].orders.splice(orders.indexOf(order), 1)
        updateFormData($formData)
        $formData = $formData
    }
</script>

<div class="table-container">
    <table>
        <thead>
            <tr>
                <th colspan="1"></th>
                <th colspan="1"></th>
                {#each types as type}
                <th class="first-th" colspan="9">{type.name}</th>
                {/each}
                <th colspan="1"></th>
                <th colspan="1"></th>
            </tr>
            <tr>
                <th colspan="1">name</th>
                <th colspan="1">paid</th>
                {#each sizes as size}
                <th colspan="1">{size}</th>
                {/each}
                {#each sizes as size}
                <th colspan="1">{size}</th>
                {/each}
                <th colspan="1">subtotal</th>
                <th colspan="1"></th>
            </tr>
        </thead>
        <tbody>
            {#each orders as order}
            <tr>
                <td>{order.name}</td>
                <td>
                    <div on:click="{() => checkPaid(order)}" class="check-box">
                        {#if order.paid}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        {/if}
                    </div>
                </td>
                {#each types as type}
                    {#each sizes as size}
                    {#if order.order.filter((x) => x.type == type.name && x.size == size).length > 0}
                    <td>{order.order.filter((x) => x.type == type.name && x.size == size).reduce((a,b) => a + b.quantity, 0)}</td>
                    {:else}
                    <td>0</td>
                    {/if}
                    {/each}
                {/each}
                <td>${order.subtotal}</td>
                <td>
                    <div on:click="{() => deleteOrder(order)}" class="delete">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                    </div>
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-container {
        margin: 1em 2em 1em 2em;
    }

    table {
        margin: auto;
        min-height: calc(100% - 6em);
        background-color: white;
        border-spacing: 0;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    }

    thead {
        background-color: rgb(243 244 246);
    }

    tbody tr {
        border-bottom: 2px solid rgb(243 244 246);
    }

    tr {
        height: 2em;
    }

    .first-th {
        text-align: center;
    }

    th {
        text-align: start;
        padding-left: 1em;
    }

    td {
        padding-left: 1em;
        border-top: 2px solid rgb(243 244 246);
    }

    .check-box {
        border: 2px solid black;
        border-radius: 5px;
        height: 1em;
        width: 1em;
        cursor: pointer;
    }

    .delete {
        height: 1em;
        width: 1em;
        cursor: pointer;
        color: rgb(239 68 68);
    }
</style>