import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ChatProvider } from "../../contexts/ChatContext";
import { Sidebar } from "../chat/Sidebar";

const Shell = styled.div`
  display: flex;
  height: 100vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

export function ChatLayout() {
  return (
    <ChatProvider>
      <Shell>
        <Sidebar />
        <Outlet />
      </Shell>
    </ChatProvider>
  );
}
