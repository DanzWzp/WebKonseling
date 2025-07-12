import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.ts",
        "./resources/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },

            fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.25rem",
                "2xl": "1.5rem",
                "3xl": "1.875rem",
            },

            colors: {
                primary: {
                    light: "#3ABEF9",
                    DEFAULT: "#0EA5E9",
                    dark: "#0369A1",
                },
                accent: {
                    DEFAULT: "#22D3EE",
                },
                techbg: "#0f172a", // biru gelap ala IT
            },

            backgroundImage: {
                "hero-pattern":
                    "url('https://www.transparenttextures.com/patterns/cubes.png')",
                digital: "linear-gradient(to bottom right, #0f172a, #1e293b)",
            },

            animation: {
                typing: "typing 3.5s steps(40, end) forwards",
                blink: "blink 0.75s step-end infinite",

                // ✅ Custom untuk Hero Section
                typingName: "typingName 4s steps(34, end) infinite alternate",
                typingRole: "typingRole 3s steps(21, end) infinite alternate",
            },

            keyframes: {
                typing: {
                    from: { width: "0%" },
                    to: { width: "100%" },
                },
                blink: {
                    "0%, 100%": { borderColor: "transparent" },
                    "50%": { borderColor: "#22D3EE" },
                },

                // ✅ Custom Keyframes
                typingName: {
                    from: { width: "0%" },
                    to: { width: "100%" },
                },
                typingRole: {
                    from: { width: "0%" },
                    to: { width: "100%" },
                },
            },

            boxShadow: {
                glow: "0 0 15px rgba(34, 211, 238, 0.5)",
            },
        },
    },

    plugins: [forms],
};
