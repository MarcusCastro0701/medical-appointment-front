import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { chatApi, type Chat } from "../api/chat";
import { getErrorMessage } from "../api/client";

type ChatContextValue = {
  chats: Chat[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const res = await chatApi.list();
      setChats(res.data);
    } catch (err) {
      setError(getErrorMessage(err, "Couldn't load your conversations."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return <ChatContext.Provider value={{ chats, loading, error, refresh }}>{children}</ChatContext.Provider>;
}

export function useChats() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChats must be used within a ChatProvider");
  return ctx;
}
