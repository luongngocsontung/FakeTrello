import React, { useRef } from "react";
import { styled } from "styled-components";

interface TextAreaProps
    extends React.DetailedHTMLProps<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    > {
    onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props, ref) => {
        const localRef = useRef<HTMLTextAreaElement>(null);
        const { onPressEnter, ...restProps } = props;
        const textareaRef =
            ref instanceof Function ? localRef : ref || localRef;

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (props.onChange) props.onChange(e);
            adjustHeight();
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && onPressEnter) {
                onPressEnter(e);
            }
            if (props.onKeyDown) props.onKeyDown(e);
        };

        const adjustHeight = () => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            textarea.style.height = "auto";
            const computedHeight = textarea.scrollHeight;
            textarea.style.height = `${computedHeight}px`;
        };

        return (
            <StyledTextArea
                ref={textareaRef}
                {...restProps}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        );
    }
);

const StyledTextArea = styled.textarea`
    width: 100%;
    padding: 8px 8px 8px 12px;
    resize: none;
    outline: none;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    font-family: inherit;
    box-sizing: border-box;
`;

export default TextArea;
