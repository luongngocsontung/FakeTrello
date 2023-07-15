import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { reOrderList } from "../features/FakeTrello/trelloSlice";
import { reOrderTask } from "../features/Lists/listsSlice";

let draggingElement: HTMLDivElement | null = null;
let draggingElType: string = "";
let cloneDraggingElement: HTMLDivElement | null = null;
let clickedElement: HTMLElement | null = null;
let shiftX = 0;
let shiftY = 0;
let mouseClientX = 0;
let mouseClientY = 0;
let isMoving = false;
let draggingId: string | null = "";
let dropPoistion: string = "";
let swapElementId: string | null = "";
let taskDraggingListId: string | undefined | null = "";
let taskDropListId: string | undefined | null = "";

function useDragAndDrop() {
    const dispatch = useAppDispatch();

    // Move Element with mouse's position
    const moveAt = (pageX: number, pageY: number) => {
        cloneDraggingElement!.style.left = pageX - shiftX + "px";
        cloneDraggingElement!.style.top = pageY - shiftY + "px";
    };

    const handleOnMouseDown = (e: MouseEvent) => {
        // Only check for left click
        if (e.button !== 0) return;
        const target = e.target as HTMLElement;
        // .draggable are elements used for triggering DND
        const draggableElement = target.closest(".draggable");
        // If target is being focused then will not execute DND
        if (!draggableElement || target.getAttribute("isFocus") === "true")
            return;

        e.preventDefault();
        // Store CLicked Element for handle on mouse up because of preventDefault
        clickedElement = target;
        // .drag-element are elements will be moved when DND
        draggingElement = draggableElement.closest(".drag-element");
        if (!draggingElement) return;

        // this is for perfect draggingELement's position
        shiftX = e.clientX - draggingElement.getBoundingClientRect().left;
        shiftY = e.clientY - draggingElement.getBoundingClientRect().top;

        // For checking mouse move (up/down/left/right)
        mouseClientX = e.clientX;
        mouseClientY = e.clientY;

        document.addEventListener("mousemove", handleOnMouseMove);
    };

    const handleOnMouseMove = (e: MouseEvent) => {
        if (!draggingElement) return;
        if (!isMoving) {
            // Start moving when mouse's position move away from mouseDown's position greater than 5
            const isAbleMoving =
                Math.abs(e.clientX - mouseClientX) > 5 ||
                Math.abs(e.clientY - mouseClientY) > 5;
            if (isAbleMoving) {
                isMoving = true;
                const tempDiv = document.createElement("div");
                tempDiv.append(draggingElement.cloneNode(true));
                cloneDraggingElement = tempDiv;

                // set up styling for moving
                cloneDraggingElement.style.position = "absolute";
                cloneDraggingElement.style.zIndex = "1000";
                cloneDraggingElement.style.width =
                    draggingElement.offsetWidth + "px";
                cloneDraggingElement.style.height =
                    draggingElement.offsetHeight + "px";
                cloneDraggingElement.style.rotate = "4deg";

                // append to body
                document.body.append(cloneDraggingElement);
                moveAt(e.pageX, e.pageY);
                // add class to dragging element to make it look as a placeholder
                draggingElement.classList.replace("drag-element", "dragging");
                // get dragging trello-id
                draggingId = draggingElement.getAttribute("trello-id");
                // get dragging element type
                draggingElType = draggingElement.id;
                // get list id if draggingEl is a task
                taskDraggingListId = draggingElement
                    .closest("#list-dnd")
                    ?.getAttribute("trello-id");
            }
        } else {
            if (!cloneDraggingElement) return;
            moveAt(e.pageX, e.pageY);

            // Get valid Elment for swapping elements's place
            cloneDraggingElement.hidden = true;
            const swapElement: HTMLDivElement | null | undefined = document
                .elementFromPoint(e.clientX, e.clientY)
                ?.closest(`.drag-element#${draggingElement.id}`);
            cloneDraggingElement.hidden = false;
            // Handle for DND task to another List
            if (!swapElement) {
                if (draggingElement.id === "task-dnd") {
                    cloneDraggingElement.hidden = true;
                    const elementBelow = document.elementFromPoint(
                        e.clientX,
                        e.clientY
                    );
                    cloneDraggingElement.hidden = false;
                    // If still inside droppable task then do not thing
                    if (elementBelow?.closest(".droppable#list-body")) return;
                    // Get task droppable container and append/prepend task
                    const droppableElement = elementBelow
                        ?.closest("#list-dnd")
                        ?.getElementsByClassName("droppable")[0];
                    if (!droppableElement) return;
                    // Get list Id that task about to drop in
                    taskDropListId = elementBelow
                        .closest("#list-dnd")
                        ?.getAttribute("trello-id");
                    // Get middleY of droppableElement
                    const boundingClientRectDroppable =
                        droppableElement?.getBoundingClientRect();
                    const middleY =
                        boundingClientRectDroppable.top +
                        boundingClientRectDroppable.height / 2;
                    /* if mouse's position is on upper half of droppableEl then prepend
                        else then append */
                    if (e.clientY <= middleY) {
                        droppableElement.prepend(draggingElement);
                        dropPoistion = "top";
                    } else {
                        droppableElement.append(draggingElement);
                        dropPoistion = "bottom";
                    }
                }
                return;
            }

            swapElementId = swapElement.getAttribute("trello-id");

            const droppableElement = swapElement.closest(".droppable");

            const manipulateDom = (type: "list" | "task") => {
                if (!droppableElement || !draggingElement) return;
                // get list id if task about to drop in
                taskDropListId = swapElement
                    .closest("#list-dnd")
                    ?.getAttribute("trello-id");
                // Check if user is moving mouse down/right or up/left
                const mouseNext =
                    type === "list"
                        ? e.clientX > mouseClientX
                        : e.clientY > mouseClientY;
                const mousePrevious =
                    type === "list"
                        ? e.clientX < mouseClientX
                        : e.clientY < mouseClientY;
                const swapNextSibling = swapElement.nextElementSibling;
                // Reassign mouseClient for the next mouse move check
                mouseClientX = e.clientX;
                mouseClientY = e.clientY;
                // If user is moving mouse to right (list) or down (task)
                if (mouseNext) {
                    if (swapNextSibling) {
                        droppableElement.insertBefore(
                            draggingElement,
                            swapNextSibling
                        );
                        dropPoistion = "after";
                    } else {
                        droppableElement.append(draggingElement);
                        dropPoistion = "after";
                    }
                }
                // If user is moving mouse to left (list) or up (task)
                else if (mousePrevious) {
                    droppableElement.insertBefore(draggingElement, swapElement);
                    dropPoistion = "before";
                }
            };

            // Swap for Lists
            if (draggingElType === "list-dnd") manipulateDom("list");
            // Swap for Tasks
            else if (draggingElType === "task-dnd") manipulateDom("task");
        }
    };

    const handleOnMouseUp = (e: MouseEvent) => {
        if (!draggingElement) return;
        // Handle focus input for List Title
        if (!isMoving && clickedElement) {
            clickedElement.focus();
        }
        // update state if reorder
        if (draggingId && dropPoistion) {
            if (draggingElType === "list-dnd" && swapElementId)
                dispatch(
                    reOrderList({
                        draggingId: draggingId,
                        insertId: swapElementId,
                        dropPosition: dropPoistion,
                    })
                );
            else if (
                draggingElType === "task-dnd" &&
                taskDraggingListId &&
                taskDropListId
            ) {
                dispatch(
                    reOrderTask({
                        draggingId: draggingId,
                        insertId: swapElementId,
                        dropPoistion: dropPoistion,
                        taskDraggingListId: taskDraggingListId,
                        taskDropListId: taskDropListId,
                    })
                );
            }
        }

        // Clean up
        document.removeEventListener("mousemove", handleOnMouseMove);
        draggingElement.classList.replace("dragging", "drag-element");
        draggingElement = null;
        cloneDraggingElement?.remove();
        cloneDraggingElement = null;
        clickedElement = null;
        isMoving = false;
        mouseClientX = 0;
        mouseClientY = 0;
        draggingId = "";
        dropPoistion = "";
        swapElementId = "";
        draggingElType = "";
        taskDraggingListId = "";
        taskDropListId = "";
    };

    // Handle On Mouse Down
    useEffect(() => {
        document.addEventListener("mousedown", handleOnMouseDown);
        document.addEventListener("mouseup", handleOnMouseUp);
        return () => {
            document.removeEventListener("mousedown", handleOnMouseDown);
            document.removeEventListener("mouseup", handleOnMouseUp);
        };
    }, []);
}

export default useDragAndDrop;
