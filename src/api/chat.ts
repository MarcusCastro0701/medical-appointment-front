import { api } from "./client";

export type Chat = {
  id: string;
  userId: number;
  messageCount: number;
  createdAt: string;
};

export type ChatMessage = {
  role: "human" | "ai";
  content: string;
};

export type ChatHistory = {
  chatId: string;
  messages: ChatMessage[];
};

export type SendMessagePayload = {
  question: string;
  chatId?: string;
};

export type SendMessageResponse = {
  chatId: string;
  reply: string;
  intent: "schedule" | "cancel" | "unknown";
  success: boolean;
};

export const chatApi = {
  list: () => api.get<Chat[]>("/chats"),
  history: (chatId: string) => api.get<ChatHistory>(`/chats/${chatId}`),
  send: (payload: SendMessagePayload) => api.post<SendMessageResponse>("/chat", payload),
};
