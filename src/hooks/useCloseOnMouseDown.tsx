import React, { useEffect } from "react";

interface Props {
    isOpen: boolean;
    htmlElement?: HTMLElement | null;
    className?: string;
    action: () => void;
}

function useCloseOnMouseDown({
    isOpen,
    htmlElement,
    className = "",
    action,
}: Props) {
    useEffect(() => {
        if (isOpen) {
            const target =
                htmlElement || document.getElementsByClassName(className)[0];
            const handleClickOutside = (e: MouseEvent) => {
                if (target && !target.contains(e.target as Node)) {
                    // User clicked outside the component
                    action();
                }
            };
            setTimeout(() => {
                document.addEventListener("mousedown", handleClickOutside);
            }, 1);

            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isOpen]);
}

export default useCloseOnMouseDown;
