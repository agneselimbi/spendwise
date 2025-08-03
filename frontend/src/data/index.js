import mock from "./mockService";
import api from "./supabaseService";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
export const dataService = USE_MOCK ? mock : api;
