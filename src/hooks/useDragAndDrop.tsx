import React, { useEffect } from "react";

const TRELLO_TITLE_HEIGHT = 62.8;

let draggingElement: HTMLDivElement | null = null;
let shiftX = null;
let shiftY = null;

function useDragAndDrop() {
    // Handle On Mouse Down
    useEffect(() => {
        window.addEventListener("mousedown", (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const draggableElement = target.closest(".draggable");
            if (!draggableElement) return;
            draggingElement = draggableElement.closest(".drag-element");
            if (draggingElement) {
                shiftX =
                    e.clientX - draggingElement.getBoundingClientRect().left;
                shiftY =
                    e.clientY - draggingElement.getBoundingClientRect().top;
                console.log(">>>> dragging: ", draggingElement);
            }
        });
        return () => {
            window.removeEventListener("mousedown", () => {});
        };
    }, []);

    // Handle On Mouse Move
    useEffect(() => {
        const moveAt = (pageX: number, pageY: number) => {
            draggingElement!.style.left = pageX + "px";
            draggingElement!.style.top = pageY - TRELLO_TITLE_HEIGHT + "px";
        };

        window.addEventListener("mousemove", (e: MouseEvent) => {
            if (!draggingElement) return;
            // const copyDraggingElement = draggingElement.cloneNode()
            draggingElement.style.position = "absolute";
            draggingElement.style.zIndex = "1000";
            moveAt(e.pageX, e.pageY);
            console.log("PageY: ", e.pageY);
        });
        return () => {
            window.removeEventListener("mousemove", () => {});
        };
    }, []);

    // Handle On Mouse Up
    useEffect(() => {
        window.addEventListener("mouseup", (e: MouseEvent) => {
            if (!draggingElement) return;
            draggingElement = null;
        });
        return () => {
            window.removeEventListener("mouseup", () => {});
        };
    }, []);
}

export default useDragAndDrop;
