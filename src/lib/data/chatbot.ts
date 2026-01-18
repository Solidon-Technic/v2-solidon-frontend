"use server";

import { sdk } from "@lib/config";
import { getAuthHeaders } from "./cookies";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

type GreetingResponse = {
    message: ChatMessage;
    isLoggedIn: boolean;
};

type ChatResponse = {
    message: ChatMessage;
};

export async function getChatGreeting(): Promise<GreetingResponse> {
    const headers = await getAuthHeaders();

    const response = await sdk.client.fetch<GreetingResponse>(
        "/store/chatbot",
        {
            method: "GET",
            headers,
        }
    );

    return response;
}

export async function sendChatMessage(
    messages: ChatMessage[]
): Promise<ChatResponse> {
    const headers = {
        ...(await getAuthHeaders()),
        "Content-Type": "application/json",
    };

    const response = await sdk.client.fetch<ChatResponse>("/store/chatbot", {
        method: "POST",
        headers,
        body: { messages },
    });

    return response;
}
