import styled, { css } from "styled-components";

type Variant = "primary" | "secondary" | "ghost";

export const Button = styled.button<{ $variant?: Variant; $fullWidth?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 44px;
  padding: 0 20px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ theme, $variant = "primary" }) => {
    if ($variant === "secondary") {
      return css`
        background: ${theme.colors.surface};
        border-color: ${theme.colors.border};
        color: ${theme.colors.text};

        &:hover:not(:disabled) {
          border-color: ${theme.colors.borderStrong};
        }
      `;
    }

    if ($variant === "ghost") {
      return css`
        background: transparent;
        color: ${theme.colors.textMuted};

        &:hover:not(:disabled) {
          background: ${theme.colors.bg};
          color: ${theme.colors.text};
        }
      `;
    }

    return css`
      background: ${theme.colors.primary};
      color: #ffffff;

      &:hover:not(:disabled) {
        background: ${theme.colors.primaryHover};
      }
    `;
  }}
`;
