import { writable } from "svelte/store";
import { getFormData } from "./data.js";

export const formData = writable(JSON.parse(getFormData()));