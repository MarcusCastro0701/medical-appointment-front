import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { chatApi, type ChatMessage } from "../../api/chat";
import { getErrorMessage } from "../../api/client";
import { useChats } from "../../contexts/ChatContext";
import { ChatWindow } from "../../components/chat/ChatWindow";
import { EmptyState } from "../../components/chat/EmptyState";
import { ErrorBanner } from "../../components/ui/ErrorBanner";
import { Button } from "../../components/ui/Button";
import { Spinner } from "../../components/ui/Spinner";

const Main = styled.div`
  flex: 1;
  display: flex;
  min-width: 0;
`;

const Centered = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function ChatPage() {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const { chats, loading: chatsLoading, refresh } = useChats();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    setSendError(null);
    setLimitReached(false);

    if (!chatId) {
      setMessages([]);
      setHistoryError(null);
      return;
    }

    let cancelled = false;
    setHistoryLoading(true);
    setHistoryError(null);
    chatApi
      .history(chatId)
      .then((res) => {
        if (cancelled) return;
        setMessages(res.data.messages);
      })
      .catch((err) => {
        if (cancelled) return;
        setHistoryError(getErrorMessage(err, "Couldn't load this conversation."));
      })
      .finally(() => {
        if (cancelled) return;
        setHistoryLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [chatId]);

  async function handleSend(question: string) {
    const optimisticMessage: ChatMessage = { role: "human", content: question };
    setMessages((prev) => [...prev, optimisticMessage]);
    setSending(true);
    setSendError(null);

    try {
      const res = await chatApi.send({ question, chatId });
      setMessages((prev) => [...prev, { role: "ai", content: res.data.reply }]);
      refresh();
      if (!chatId) {
        navigate(`/chat/${res.data.chatId}`, { replace: true });
      }
    } catch (err) {
      setMessages((prev) => prev.slice(0, -1));
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setLimitReached(true);
      }
      setSendError(getErrorMessage(err, "Couldn't send your message."));
    } finally {
      setSending(false);
    }
  }

  if (historyLoading) {
    return (
      <Main>
        <Centered>
          <Spinner $size={24} />
          <span>Loading conversation…</span>
        </Centered>
      </Main>
    );
  }

  if (historyError) {
    return (
      <Main>
        <Centered>
          <ErrorBanner>{historyError}</ErrorBanner>
          <Button onClick={() => navigate("/chat")}>+ New chat</Button>
        </Centered>
      </Main>
    );
  }

  const showWelcome = !chatId && !chatsLoading && chats.length === 0;

  const banner = limitReached ? (
    <ErrorBanner tone="warning">
      This conversation has reached its message limit. Please start a new chat to continue.
    </ErrorBanner>
  ) : sendError ? (
    <ErrorBanner>{sendError}</ErrorBanner>
  ) : null;

  return (
    <Main>
      <ChatWindow
        messages={messages}
        sending={sending}
        inputDisabled={sending || limitReached}
        banner={banner}
        emptyState={showWelcome ? <EmptyState /> : undefined}
        onSend={handleSend}
      />
    </Main>
  );
}
