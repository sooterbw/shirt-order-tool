<script>
    import { formData } from "../stores.js";

    $:forms = $formData.forms

    export let index;
</script>

<div>
    {forms[index].name}
</div>
<div>
    {forms[index].orders}
</div>