/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            height: {
                'half-screen': '44vh',
            },
        },
    },
    plugins: [],
}