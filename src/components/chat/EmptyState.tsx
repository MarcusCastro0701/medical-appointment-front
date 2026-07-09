import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px;
  text-align: center;
`;

const Icon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primaryLight};
  font-size: 24px;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.p`
  margin: 0;
  max-width: 360px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export function EmptyState() {
  return (
    <Wrapper>
      <Icon>💬</Icon>
      <Title>No conversations yet</Title>
      <Subtitle>Type a message below to schedule or cancel a medical appointment with the AI assistant.</Subtitle>
    </Wrapper>
  );
}
