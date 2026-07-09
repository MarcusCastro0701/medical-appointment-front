import { useEffect, useRef, type ReactNode } from "react";
import styled from "styled-components";
import type { ChatMessage } from "../../api/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { MessageInput } from "./MessageInput";

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 100%;
`;

const Messages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EmptyWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BannerWrapper = styled.div`
  padding: 0 16px;
`;

type Props = {
  messages: ChatMessage[];
  sending: boolean;
  inputDisabled: boolean;
  banner?: ReactNode;
  emptyState?: ReactNode;
  onSend: (question: string) => void;
};

export function ChatWindow({ messages, sending, inputDisabled, banner, emptyState, onSend }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  return (
    <Wrapper>
      <Messages>
        {messages.length === 0 && !sending && emptyState ? (
          <EmptyWrapper>{emptyState}</EmptyWrapper>
        ) : (
          messages.map((message, index) => <MessageBubble key={index} message={message} />)
        )}
        {sending && <TypingIndicator />}
        <div ref={bottomRef} />
      </Messages>
      {banner && <BannerWrapper>{banner}</BannerWrapper>}
      <MessageInput disabled={inputDisabled} onSend={onSend} />
    </Wrapper>
  );
}
