import React, { useRef } from "react";
import { styled } from "styled-components";

interface InputProps
    extends React.DetailedHTMLProps<
        React.InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const localRef = useRef<HTMLInputElement>(null);
    const inputRef = ref instanceof Function ? localRef : ref || localRef;

    const { ...restProps } = props;

    return <StyledInput ref={inputRef} {...restProps} />;
});

const StyledInput = styled.input`
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

export default Input;
