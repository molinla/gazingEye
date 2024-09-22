/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                "roboto": ["Roboto", "sans-serif"], // 确保Roboto字体已经通过@font-face规则引入或在您的项目中可用
                'pu-hui': ['"Pu Hui"', '"system-ui"', '"微软雅黑"', '"Helvetica Neue"', '"Helvetica"', '"Arial"', '"sans-serif"']
                },
            fontWeight: {
                "thin"      : 100,
                "extralight": 200,
                "light"     : 300,
                "normal"    : 400,
                "medium"    : 500,
                "semibold"  : 600,
                "bold"      : 700,
                "extrabold" : 800,
                "black"     : 900,
            },
            borderWidth: {
                "1": "1px",
            },
            colors: {
                blue: {
                    50: '#edf9ff',
                    100: '#d7f1ff',
                    200: '#b9e8ff',
                    300: '#88dbff',
                    400: '#50c5ff',
                    500: '#28a7ff',
                    600: '#1e90ff',
                    700: '#0a71eb',
                    800: '#0f5abe',
                    900: '#134e95',
                    950: '#11305a',
                },
                gray: {
                    50: '#f5f7f8',
                    100: '#edf0f2',
                    200: '#dee4e7',
                    300: '#c9d3d8',
                    400: '#b3bec6',
                    500: '#9eaab6',
                    600: '#8993a2',
                    700: '#747d8c',
                    800: '#606873',
                    900: '#51575e',
                    950: '#2f3237',
                },
                red: {
                    50: '#fef2f2',
                    100: '#fde3e3',
                    200: '#fccccc',
                    300: '#f9a8a8',
                    400: '#f37677',
                    500: '#e94a4b',
                    600: '#d63031',
                    700: '#b32223',
                    800: '#942021',
                    900: '#7b2122',
                    950: '#430c0c',
                },
                green: {
                    '50': '#f0fdf5',
                    '100': '#ddfbe8',
                    '200': '#bdf5d4',
                    '300': '#89ecb1',
                    '400': '#4eda87',
                    '500': '#2ed573',
                    '600': '#1a9f51',
                    '700': '#187d43',
                    '800': '#186338',
                    '900': '#165130',
                    '950': '#062d18',
                },
                yellow: {
                    '50': '#fffbeb',
                    '100': '#fef2c7',
                    '200': '#fde58a',
                    '300': '#fcd14d',
                    '400': '#fbb815',
                    '500': '#f59b0b',
                    '600': '#d97406',
                    '700': '#b45109',
                    '800': '#923e0e',
                    '900': '#78340f',
                    '950': '#451903',
                },
                orange: {
                    DEFAULT: "#F27F16",
                },
                purple: {
                    DEFAULT: "#BD47FB",
                },
            },
        },
        variants: {
            extend: {
                backgroundColor: ["active", "hover", "focus", "responsive"], // 添加需要的变体
                borderColor    : ["active", "hover", "focus", "responsive"],
                textColor      : ["active", "hover", "focus", "responsive"],
            },
        },
    },
}
