<script>
    import { formData } from "../stores.js";
    import { updateFormData } from "../data.js";

    $: forms = $formData.forms

    let isModal = false;
    let formName = "";

    function selectForm(index) {
        for (let i = 0; i<forms.length; i++) {
            $formData.forms[i].active = false;
        }
        $formData.forms[index].active = true;
    }

    function createForm(name) {
        $formData.forms.push({
            name: name,
            active: false,
            orders: []
        })
        $formData = $formData;
        updateFormData($formData)
        isModal = false;
        formName = '';
    }

</script>

{#if isModal}
<div class="modal-mask"></div>
<div class="modal-container">
    <form on:submit|preventDefault="{() => createForm(formName)}">
        <label for="name">Form Name</label>
        <input bind:value="{formName}" type="text" placeholder="Enter name of the form">
        <div class="form-buttons">
            <button type="reset" on:click="{() => isModal = false}">Cancel</button>
            <button type="submit" class="submit-form-button">Create</button>
        </div>
    </form>
</div>
{/if}

<div class="sticky-menu">
    <h2>T-shirt order form</h2>
    {#if forms.length > 0}
    {#each forms as form, i}
    <div on:click="{() => selectForm(i)}" class="menu-item {form.active ? 'menu-item-active' : ''}">
        <p>{form.name}</p>
    </div>
    {/each}
    {:else}
    <p>No forms available</p>
    {/if}
    <button class="new-form-button" on:click="{() => isModal = true}">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <div>New Form</div>
    </button>
</div>

<style>
    form {
        position: relative;
        align-self: center;
        justify-self: center;
        background-color: white;
        z-index: 100;
        height: 200px;
        width: 350px;
        border-radius: 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
        padding-left: 1.5em;
        padding-right: 1.5em;
    }

    h2 {
        align-self: center;
        text-transform: capitalize;
        font-size: 1.2em;
    }

    label {
        font-weight: 500;
    }

    .new-form-button {
        position: absolute;
        bottom: .5em;
        right: 0;
        align-self: flex-end;
        margin-right: 1em;
    }

    .form-buttons {
        display: flex;
        justify-content: flex-end;
        padding-top: 1.5em;
        width: 100%;
    }

    .submit-form-button {
        background-color: rgba(91, 33, 182);
        color: white;
        margin-left: 1em;
    }

    .sticky-menu {
        position: sticky;
        display: flex;
        flex-direction: column;
        justify-content: start;
        top: 0;
        left: 0;
        padding-left: 1em;
        padding-right: 1em;
        height: 100vh;
        width: 200px;
        color: white;
        background-color: rgba(124, 58, 237);
    }

    .menu-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding-left: .5em;
        height: 2.2em;
        border-radius: 10px;
        font-weight: 500;
        margin-bottom: .5em;
    }

    .menu-item:hover {
        background-color: rgba(76, 29, 149);
    }

    .menu-item-active {
        background-color: rgba(76, 29, 149);
    }

    .modal-container {
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: 20;
        top: 0;
        left: 0;
        display: flex;
        justify-items: center;
        justify-content: center;
    }

    .modal-mask {
        position:absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 10;
        background-color: black;
        opacity: 80%;
        width: 100vw;
        height: 100vh;
    }

</style>