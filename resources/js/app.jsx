import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import axios from "axios";
window.axios = axios;

createInertiaApp({
    // Pakai import.meta.glob agar semua pages termasuk folder Auth bisa di-import
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx");
        return pages[`./Pages/${name}.jsx`]();
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
