/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	// theme: {
	// 	extend: {},
	// },
    theme: {
		extend: {
            colors: {
                // 'app': '#0442ED'
                // 'app': '#0052FF'
                'app': '#F5C518'
            }
        },
	},
	plugins: [],
};