import React, { useEffect } from "react";

interface DragAndDropProps {
    ref: HTMLDivElement;
}

const draggable = ["trello-list"];

function useDragAndDrop(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
        const target = ref.current;
        if (!target) return;

        // target.addEventListener("mousedown", (e) => {
        //     const targetId = e.target?.id;
        //     if (targetId && draggable.includes(targetId)) {
        //         e.preventDefault();
        //         console.log(targetId);
        //     }
        // });
        return () => {
            ref.current?.removeEventListener("mousedown", () => {});
        };
    }, []);
}

export default useDragAndDrop;
