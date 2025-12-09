export default function medusaError(error: any): never {
    if (error?.response) {
        const message = error.response.data?.message || error.response.data;
        throw new Error(
            message?.charAt
                ? `${message.charAt(0).toUpperCase()}${message.slice(1)}.`
                : "Request failed."
        );
    }

    // Handle errors thrown by the Medusa JS SDK (FetchError exposes status/statusText)
    if (error?.status) {
        const statusText = error.statusText ? ` ${error.statusText}` : "";
        const statusMsg = `Request failed with status ${error.status}${statusText}`;
        const message = error.message || statusMsg;
        throw new Error(`${statusMsg}: ${message}`);
    }

    if (error?.request) {
        throw new Error("No response received: " + error.request);
    }

    throw new Error(
        "Error setting up the request: " + (error?.message || "Unknown")
    );
}
