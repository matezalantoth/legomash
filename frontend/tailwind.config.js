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
            fontFamily: {
                'cera-pro': ['Cera Pro', 'sans-serif'],
            },
            animation: {
                'jump-in': 'jumpIn 400ms linear forwards',
                'jump-out': 'jumpOut 200ms linear forwards',
                'fade-in': 'fadeInRight 400ms linear',
                'fade-out': 'fadeOutLeft 400ms linear'
            },
            keyframes: {
                jumpIn: {
                    '0%': {transform: 'scale(0)', opacity: 0},
                    '100%': {transform: 'scale(1)', opacity: 1},
                },
                jumpOut: {
                    '0%': {transform: 'scale(1)', opacity: 1},
                    '100%': {transform: 'scale(0)', opacity: 0},
                },
                'fadeInRight': {
                    '0%': {
                        opacity: '0',
                        transform: 'translateX(-400px)',
                    },
                    '100%': {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                },
                'fadeOutLeft': {
                    '0%': {
                        opacity: '1',
                        transform: 'translateX(0)',
                    },
                    '100%': {
                        opacity: '0',
                        transform: 'translateX(400px)',
                    },
                },
            },
        },
    },
    plugins: [],
}