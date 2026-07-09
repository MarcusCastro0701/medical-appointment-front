import styled from "styled-components";
import type { ReactNode } from "react";

const Banner = styled.div<{ $tone?: "danger" | "warning" }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 14px;
  line-height: 1.4;
  border: 1px solid
    ${({ theme, $tone = "danger" }) => ($tone === "danger" ? theme.colors.dangerBorder : theme.colors.warningBorder)};
  background: ${({ theme, $tone = "danger" }) => ($tone === "danger" ? theme.colors.dangerBg : theme.colors.warningBg)};
  color: ${({ theme, $tone = "danger" }) => ($tone === "danger" ? theme.colors.danger : theme.colors.warning)};
`;

export function ErrorBanner({ children, tone = "danger" }: { children: ReactNode; tone?: "danger" | "warning" }) {
  return <Banner $tone={tone}>{children}</Banner>;
}
