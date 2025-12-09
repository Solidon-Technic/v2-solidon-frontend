import Medusa from "@medusajs/js-sdk";

// Support both server-only and legacy public env names
const MEDUSA_BACKEND_URL =
    process.env.MEDUSA_BACKEND_URL ||
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ||
    "http://localhost:9000";

if (
    process.env.NODE_ENV === "production" &&
    !process.env.MEDUSA_BACKEND_URL &&
    !process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
) {
    throw new Error(
        "MEDUSA_BACKEND_URL is missing. Set it to your backend origin (e.g. https://api.example.com)."
    );
}

export const sdk = new Medusa({
    baseUrl: MEDUSA_BACKEND_URL,
    debug: process.env.NODE_ENV === "development",
    publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});
