import { useState, type KeyboardEvent } from "react";
import styled from "styled-components";
import { Button } from "../ui/Button";

const MIN_LENGTH = 10;
const MAX_LENGTH = 500;

const Bar = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
`;

const TextArea = styled.textarea`
  flex: 1;
  resize: none;
  max-height: 160px;
  min-height: 44px;
  padding: 11px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 15px;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.bg};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
  }
`;

const Hint = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

type Props = {
  disabled: boolean;
  onSend: (question: string) => void;
};

export function MessageInput({ disabled, onSend }: Props) {
  const [value, setValue] = useState("");

  const trimmed = value.trim();
  const tooShort = trimmed.length > 0 && trimmed.length < MIN_LENGTH;
  const canSend = !disabled && trimmed.length >= MIN_LENGTH && trimmed.length <= MAX_LENGTH;

  function handleSend() {
    if (!canSend) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <Bar>
      <Column>
        <TextArea
          rows={1}
          placeholder="Describe what you'd like to do (e.g. schedule or cancel an appointment)…"
          value={value}
          maxLength={MAX_LENGTH}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {tooShort && <Hint>Message must be at least {MIN_LENGTH} characters.</Hint>}
      </Column>
      <Button type="button" disabled={!canSend} onClick={handleSend}>
        Send
      </Button>
    </Bar>
  );
}
