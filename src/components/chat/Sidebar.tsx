import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useChats } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";
import { formatDate } from "../../utils/formatDate";
import { Spinner } from "../ui/Spinner";

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 280px;
  flex-shrink: 0;
  height: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    height: auto;
    max-height: 40vh;
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const AppointmentsLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.bg};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const NewChatButton = styled.button`
  width: 100%;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const List = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ChatItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.bg};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`;

const ChatTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

const ChatMeta = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const StateMessage = styled.p`
  padding: 16px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

const Footer = styled.div`
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Email = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LogoutButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

export function Sidebar() {
  const { chats, loading, error } = useChats();
  const { email, logout } = useAuth();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      navigate("/login", { replace: true });
    }
  }

  return (
    <Aside>
      <Header>
        <NewChatButton onClick={() => navigate("/chat")}>+ New chat</NewChatButton>
        <AppointmentsLink to="/appointments">📅 My Appointments</AppointmentsLink>
      </Header>

      <List>
        {loading && <StateMessage>Loading conversations…</StateMessage>}
        {!loading && error && <StateMessage>{error}</StateMessage>}
        {!loading && !error && chats.length === 0 && (
          <StateMessage>No conversations yet. Start one with "+ New chat".</StateMessage>
        )}
        {!loading &&
          !error &&
          chats.map((chat) => (
            <ChatItem key={chat.id} to={`/chat/${chat.id}`}>
              <ChatTitle>Conversation</ChatTitle>
              <ChatMeta>
                {formatDate(chat.createdAt)} · {chat.messageCount} message{chat.messageCount === 1 ? "" : "s"}
              </ChatMeta>
            </ChatItem>
          ))}
      </List>

      <Footer>
        <Email title={email ?? undefined}>{email}</Email>
        <LogoutButton onClick={handleLogout} disabled={loggingOut}>
          {loggingOut ? <Spinner $size={12} /> : "Log out"}
        </LogoutButton>
      </Footer>
    </Aside>
  );
}
