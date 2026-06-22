import React, { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Toolbar = styled.div`
  display: flex;
  gap: 6px;
  padding: 8px;
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-bottom: none;
  border-radius: 10px 10px 0 0;
`;

const ToolButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 13px;
  font-weight: 700;
  color: #555;
  cursor: pointer;
  &:hover {
    background: #fdeef4;
    color: #d81b60;
    border-color: #d81b60;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 0 0 10px 10px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 220px;
  box-sizing: border-box;
  font-family: inherit;
  &:focus {
    border-color: #d81b60;
  }
`;

const Hint = styled.p`
  font-size: 11px;
  color: #999;
  margin: 4px 0 0 0;
`;

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const applyFormat = (before: string, after: string = before, placeholderText = "texto") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || placeholderText;

    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const applyLinePrefix = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + prefix.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  return (
    <Wrapper>
      <Toolbar>
        <ToolButton type="button" onClick={() => applyFormat("**", "**", "negrito")} title="Negrito">
          B
        </ToolButton>
        <ToolButton type="button" onClick={() => applyFormat("_", "_", "itálico")} title="Itálico">
          I
        </ToolButton>
        <ToolButton type="button" onClick={() => applyLinePrefix("## ")} title="Título de seção">
          Título
        </ToolButton>
        <ToolButton type="button" onClick={() => applyLinePrefix("- ")} title="Lista">
          Lista
        </ToolButton>
      </Toolbar>
      <TextArea
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      <Hint>Selecione um texto e clique em B ou I para formatar. Título e Lista se aplicam à linha atual.</Hint>
    </Wrapper>
  );
};

export default MarkdownEditor;