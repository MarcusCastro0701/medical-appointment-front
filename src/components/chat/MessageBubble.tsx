import styled from "styled-components";
import type { ChatMessage } from "../../api/chat";

const Row = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
`;

const Bubble = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: 15px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  background: ${({ theme, $isUser }) => ($isUser ? theme.colors.userBubbleBg : theme.colors.aiBubbleBg)};
  color: ${({ theme, $isUser }) => ($isUser ? theme.colors.userBubbleText : theme.colors.aiBubbleText)};
  border-bottom-right-radius: ${({ $isUser }) => ($isUser ? "4px" : undefined)};
  border-bottom-left-radius: ${({ $isUser }) => (!$isUser ? "4px" : undefined)};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 85%;
  }
`;

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "human";
  return (
    <Row $isUser={isUser}>
      <Bubble $isUser={isUser}>{message.content}</Bubble>
    </Row>
  );
}
