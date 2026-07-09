import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40% { transform: scale(1); opacity: 1; }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Bubble = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 14px 16px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border-bottom-left-radius: 4px;
  background: ${({ theme }) => theme.colors.aiBubbleBg};
`;

const Dot = styled.span<{ $delay: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textSubtle};
  animation: ${bounce} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`;

export function TypingIndicator() {
  return (
    <Row>
      <Bubble>
        <Dot $delay={0} />
        <Dot $delay={0.15} />
        <Dot $delay={0.3} />
      </Bubble>
    </Row>
  );
}
