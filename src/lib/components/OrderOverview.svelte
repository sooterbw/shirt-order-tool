<script>
    import { formData } from "../stores.js";

	let selectedForm;
    let total = 0;
    let orders = [];
    let sizes = $formData.options.sizes;
    let types = $formData.options.types;

	$: {
		selectedForm = $formData.forms.filter((form) => {
			return form.active == true;
		})[0]
        orders = selectedForm.orders.map(x => {
            return x.order
        })
        orders = orders.flat()
        total = selectedForm.orders.reduce((a,b) => {
            return a + b.subtotal
        }, 0)
	}
</script>
<div class="cell">
    <h2>{selectedForm.name} - Summary</h2>
    {#each types as type}
    <h3>{type.name}</h3>
    <table>
        <thead>
            <tr>
                <th>qty</th>
                <th>size</th>
                <th>subtotal</th>
            </tr>
        </thead>
        <tbody>
            {#each sizes as size}
            {#if orders.filter(x => x.type == type.name && x.size == size).length > 0}
            <tr>
                <td>
                    {orders.filter(x => x.type == type.name && x.size == size).reduce((a,b) => a + b.quantity, 0)}
                </td>
                <td>{size}</td>
                {#if size == 'AXXL'}
                <td>${orders.filter(x => x.type == type.name && x.size == size).reduce((a,b) => a + b.quantity, 0) * type.price + 2}</td>
                {:else if size == 'AXXXL'}
                <td>${orders.filter(x => x.type == type.name && x.size == size).reduce((a,b) => a + b.quantity, 0) * type.price + 4}</td>
                {:else}
                <td>${orders.filter(x => x.type == type.name && x.size == size).reduce((a,b) => a + b.quantity, 0) * type.price}</td>
                {/if}
            </tr>
            {/if}
            {/each}
        </tbody>
    </table>
    {/each}
    <h2 class="total">Total: ${total}</h2>
</div>

<style>
    .cell {
        display: flex;
        flex-direction: column;
        padding: 2em;
        margin: 1em 1em 1em 2em;
        height: calc(100% - 6em);
        background-color: rgb(209, 213, 219);
        border-radius: 10px;
        filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
    }
    
    table {
        background-color: white;
        border-radius: 10px;
        border-spacing: 0;
        overflow: hidden;
    }

    thead {
        background-color: rgb(243 244 246);
    }

    th {
        text-align: start;
        padding-left: 1em;
    }

    tr {
        height: 2em;
    }

    td {
        padding-left: 1em;
    }

    .total {
        text-align: end;
    }
</style>