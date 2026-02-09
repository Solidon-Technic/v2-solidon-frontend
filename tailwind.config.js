const path = require("path");

module.exports = {
    darkMode: "class",
    presets: [require("@medusajs/ui-preset")],
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/modules/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            transitionProperty: {
                width: "width margin",
                height: "height",
                bg: "background-color",
                display: "display opacity",
                visibility: "visibility",
                padding:
                    "padding-top padding-right padding-bottom padding-left",
            },
            colors: {
                grey: {
                    0: "#FFFFFF",
                    5: "#F9FAFB",
                    10: "#F3F4F6",
                    20: "#E5E7EB",
                    30: "#D1D5DB",
                    40: "#9CA3AF",
                    50: "#6B7280",
                    60: "#4B5563",
                    70: "#374151",
                    80: "#1F2937",
                    90: "#111827",
                },
                space_indigo: {
                    DEFAULT: "#22223b",
                    100: "#07070c",
                    200: "#0d0d17",
                    300: "#141423",
                    400: "#1b1b2f",
                    500: "#22223b",
                    600: "#40406f",
                    700: "#6060a3",
                    800: "#9595c2",
                    900: "#cacae0",
                },
                dusty_grape: {
                    DEFAULT: "#4a4e69",
                    100: "#0f1015",
                    200: "#1e1f2a",
                    300: "#2c2f3f",
                    400: "#3b3e54",
                    500: "#4a4e69",
                    600: "#666b8f",
                    700: "#8b8fac",
                    800: "#b1b4c8",
                    900: "#d8dae3",
                },
                lilac_ash: {
                    DEFAULT: "#9a8c98",
                    100: "#1f1c1f",
                    200: "#3f383e",
                    300: "#5e535c",
                    400: "#7d6f7b",
                    500: "#9a8c98",
                    600: "#aea4ad",
                    700: "#c3bbc1",
                    800: "#d7d2d6",
                    900: "#ebe8ea",
                },
                almond_silk: {
                    DEFAULT: "#c9ada7",
                    100: "#2e1f1c",
                    200: "#5b3e38",
                    300: "#895d54",
                    400: "#ad8279",
                    500: "#c9ada7",
                    600: "#d4bdb8",
                    700: "#dececa",
                    800: "#e9dedc",
                    900: "#f4efed",
                },
                parchment: {
                    DEFAULT: "#f2e9e4",
                    100: "#3f2a1e",
                    200: "#7f543d",
                    300: "#b58165",
                    400: "#d3b5a4",
                    500: "#f2e9e4",
                    600: "#f4ede9",
                    700: "#f7f1ee",
                    800: "#faf6f4",
                    900: "#fcfaf9",
                },
                sales: {
                    DEFAULT: "#9e2a2b",
                    50: "#fef2f2",
                    100: "#fee2e2",
                    200: "#fecaca",
                    300: "#fca5a5",
                    400: "#f87171",
                    500: "#9e2a2b",
                    600: "#7f1d1d",
                    700: "#651818",
                    800: "#4c1414",
                    900: "#3c1010",
                },
            },
            borderRadius: {
                none: "0px",
                soft: "2px",
                base: "4px",
                rounded: "8px",
                large: "16px",
                circle: "9999px",
            },
            maxWidth: {
                "8xl": "100rem",
            },
            screens: {
                "2xsmall": "320px",
                xsmall: "512px",
                small: "1024px",
                medium: "1280px",
                large: "1440px",
                xlarge: "1680px",
                "2xlarge": "1920px",
            },
            fontSize: {
                "3xl": "2rem",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Ubuntu",
                    "sans-serif",
                ],
            },
            keyframes: {
                ring: {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                },
                "fade-in-right": {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0)",
                    },
                },
                "fade-in-top": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
                "fade-out-top": {
                    "0%": {
                        height: "100%",
                    },
                    "99%": {
                        height: "0",
                    },
                    "100%": {
                        visibility: "hidden",
                    },
                },
                "accordion-slide-up": {
                    "0%": {
                        height: "var(--radix-accordion-content-height)",
                        opacity: "1",
                    },
                    "100%": {
                        height: "0",
                        opacity: "0",
                    },
                },
                "accordion-slide-down": {
                    "0%": {
                        "min-height": "0",
                        "max-height": "0",
                        opacity: "0",
                    },
                    "100%": {
                        "min-height": "var(--radix-accordion-content-height)",
                        "max-height": "none",
                        opacity: "1",
                    },
                },
                enter: {
                    "0%": { transform: "scale(0.9)", opacity: 0 },
                    "100%": { transform: "scale(1)", opacity: 1 },
                },
                leave: {
                    "0%": { transform: "scale(1)", opacity: 1 },
                    "100%": { transform: "scale(0.9)", opacity: 0 },
                },
                "slide-in": {
                    "0%": { transform: "translateY(-100%)" },
                    "100%": { transform: "translateY(0)" },
                },
            },
            animation: {
                ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
                "fade-in-right":
                    "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
                "fade-in-top":
                    "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
                "fade-out-top":
                    "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
                "accordion-open":
                    "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
                "accordion-close":
                    "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
                enter: "enter 200ms ease-out",
                "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
                leave: "leave 150ms ease-in forwards",
        },
    },
    plugins: [require("tailwindcss-radix")()],
}}
