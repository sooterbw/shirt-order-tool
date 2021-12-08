import App from './App.svelte';
import { checkData } from './lib/data.js'
import { formData } from "./lib/stores.js";

let forms;

formData.subscribe(value => {
	forms = value;
})

checkData()

const app = new App({
	target: document.body,
	props: {
		forms: forms,
	}
});

export default app;