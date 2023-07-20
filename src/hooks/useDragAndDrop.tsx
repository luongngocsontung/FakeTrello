import React, { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { reOrderList } from "../features/FakeTrello/trelloSlice";
import { reOrderTask } from "../features/Lists/listsSlice";

let draggingElement: HTMLElement | null = null;
let placeHolderElement: HTMLElement | null = null;
let cloneDraggingElement: HTMLElement | null = null;
let clickedElement: HTMLElement | null = null;
let touchedElement: HTMLElement | null | undefined | Element = null;
let listsContainer: HTMLElement | null | undefined = null;
let tasksContainer: HTMLElement | null | undefined = null;
let dropPoistion: string = "";
let shiftX = 0;
let shiftY = 0;
let mouseClientX = 0;
let mouseClientY = 0;
let isMoving = false;
let scrollEdgeX: any = null;
let scrollEdgeY: any = null;
let mouseX: number = 0;
let mouseY: number = 0;

// Move cloneElement with mouse's position
const moveAt = (pageX: number, pageY: number) => {
    cloneDraggingElement!.style.left = pageX - shiftX + "px";
    cloneDraggingElement!.style.top = pageY - shiftY + "px";
    scrollAtEdge(pageX, pageY);
};

// Auto scroll when mouse meets droppable element Edge
const scrollAtEdge = (pageX: number, pageY: number) => {
    if (!draggingElement) return;

    // store global mouse position for purpose of scroll fast or slow
    mouseX = pageX;
    mouseY = pageY;
    let maxStep = 50;

    const autoScrollX = () => {
        // Get point has will active auto scroll
        const edgeLeft = 200;
        const edgeRight = window.innerWidth - 200;
        if (mouseX < edgeLeft || mouseX > edgeRight) {
            if (scrollEdgeX) return true;
            scrollEdgeX = setInterval(() => {
                if (!listsContainer) return false;
                let gap = 0;
                if (mouseX < edgeLeft) {
                    // If element has been scrolled to the edge then do nothing
                    if (listsContainer.scrollLeft <= 0) return false;
                    // Caculate scrollBy
                    const intensity = (edgeLeft - mouseX) / 2000;
                    gap = -maxStep * intensity;
                } else if (mouseX > edgeRight) {
                    // If element has been scrolled to the edge then do nothing
                    if (
                        listsContainer.scrollLeft >=
                        listsContainer.scrollWidth - listsContainer.offsetWidth
                    )
                        return false;
                    // Caculate scrollBy
                    const intensity = (mouseX - edgeRight) / 2000;
                    gap = maxStep * intensity;
                }
                listsContainer.scrollBy(gap, 0);
                return true;
            }, 0);
        } else {
            if (!scrollEdgeX) return false;
            clearInterval(scrollEdgeX);
            scrollEdgeX = null;
            return false;
        }
    };

    const autoScrollY = () => {
        if (!tasksContainer) return;
        const boundingRect = tasksContainer.getBoundingClientRect();
        const edgeTop = boundingRect.top + 50;
        const edgeBottom = boundingRect.top + boundingRect.height - 50;
        if (pageY < edgeTop || pageY > edgeBottom) {
            if (scrollEdgeY) return true;
            scrollEdgeY = setInterval(() => {
                if (!tasksContainer) return false;
                let gap = 0;
                if (mouseY < edgeTop) {
                    // If element has been scrolled to the edge then do nothing
                    if (tasksContainer.scrollTop <= 0) return false;
                    // Caculate scrollBy
                    const intensity = (edgeTop - mouseY) / 2000;
                    gap = -maxStep * intensity;
                } else if (mouseY > edgeBottom) {
                    // If element has been scrolled to the edge then do nothing
                    if (
                        tasksContainer.scrollTop >=
                        tasksContainer.scrollHeight - boundingRect.height
                    )
                        return false;
                    // Caculate scrollBy
                    const intensity = (mouseY - edgeBottom) / 2000;
                    gap = maxStep * intensity;
                }
                tasksContainer.scrollBy(0, gap);
                return true;
            }, 0);
        } else {
            if (!scrollEdgeY) return false;
            clearInterval(scrollEdgeY);
            scrollEdgeY = null;
            return false;
        }
    };

    if (draggingElement.id === "list-dnd") {
        autoScrollX();
    } else if (draggingElement.id === "task-dnd") {
        // prioriy autoScrollX first
        if (autoScrollX()) return;
        tasksContainer = placeHolderElement?.closest(".droppable");
        autoScrollY();
    }
};

function useDragAndDrop() {
    const dispatch = useAppDispatch();

    const handleOnMouseDown = (e: MouseEvent) => {
        // Only check for left mouse down
        if (e.button !== 0 || draggingElement) return;
        const target = e.target as HTMLElement;
        // .draggable are elements used for triggering DND
        const draggableElement = target.closest(".draggable");
        // If target is being focused then will not execute DND
        if (!draggableElement || target.getAttribute("isFocus") === "true")
            return;

        e.preventDefault();
        // Store CLicked Element for handle on mouse up because of preventDefault
        clickedElement = target;
        // .drag-element is element will be moved when DND
        draggingElement = draggableElement.closest(".drag-element");
        if (!draggingElement) return;

        // this is for perfect draggingELement's position
        shiftX = e.clientX - draggingElement.getBoundingClientRect().left;
        shiftY = e.clientY - draggingElement.getBoundingClientRect().top;

        // For checking mouse move (up/down/left/right)
        mouseClientX = e.clientX;
        mouseClientY = e.clientY;

        // Store some value because if we get that from mousemove will decrease performance since mousemove call continuosly
        listsContainer = document.getElementById("lists-container");

        document.addEventListener("mousemove", handleOnMouseMove);
    };

    const handleOnMouseMove = (e: MouseEvent) => {
        e.preventDefault();
        if (!draggingElement) return;
        if (!isMoving) {
            // Start moving when mouse's position move away from mouseDown's position greater than 5
            const isAbleMoving =
                Math.abs(e.clientX - mouseClientX) > 5 ||
                Math.abs(e.clientY - mouseClientY) > 5;
            if (isAbleMoving) {
                isMoving = true;
                cloneDraggingElement = draggingElement.cloneNode(
                    true
                ) as HTMLDivElement;

                // set up styles for moving
                cloneDraggingElement.style.position = "absolute";
                cloneDraggingElement.style.zIndex = "1000";
                cloneDraggingElement.style.width =
                    draggingElement.offsetWidth + "px";
                cloneDraggingElement.style.height =
                    draggingElement.offsetHeight + "px";
                cloneDraggingElement.style.rotate = "4deg";
                cloneDraggingElement.style.pointerEvents = "none";
                document
                    .getElementById("fake-trello")
                    ?.classList.add("no-hover");

                // append to body
                document.body.append(cloneDraggingElement);
                moveAt(e.pageX, e.pageY);
                // Add a placeholder
                placeHolderElement = draggingElement.cloneNode(
                    true
                ) as HTMLDivElement;
                placeHolderElement.id = "";
                // add class to placeholder element to make it look like a placeholder
                placeHolderElement.classList.replace(
                    "drag-element",
                    "dragging"
                );
                // hide dragging element because we already have placeholder
                draggingElement.hidden = true;
                // add placeholder right before dragging element
                const droppableEl = draggingElement.closest(".droppable");
                droppableEl?.insertBefore(placeHolderElement, draggingElement);
            }
        } else {
            if (!cloneDraggingElement || !placeHolderElement) return;
            // Start moving clone Element
            moveAt(e.pageX, e.pageY);
            // Get touched Element
            const mouseTouchedElement: Element | undefined | null = (
                e.target as HTMLElement
            )?.closest(`.drag-element#${draggingElement.id}`);
            // Handle for DND task to another List
            if (!mouseTouchedElement && draggingElement.id === "task-dnd") {
                const elementBelow = e.target as HTMLElement;
                // If still inside droppable task then do not thing
                if (elementBelow?.closest(".droppable#list-body")) return;
                // Get task droppable list (tasks container) and append/prepend task
                const droppableElement = elementBelow
                    ?.closest("#list-dnd")
                    ?.getElementsByClassName("droppable")[0];
                if (!droppableElement) return;

                // Get middleY of droppableElement
                const boundingClientRectDroppable =
                    droppableElement?.getBoundingClientRect();
                const middleY =
                    boundingClientRectDroppable.top +
                    boundingClientRectDroppable.height / 2;
                /* if mouse's position is on upper half of droppableEl then prepend
                        else then append */
                if (e.clientY <= middleY) {
                    droppableElement.prepend(placeHolderElement);
                    dropPoistion = "top";
                } else {
                    droppableElement.append(placeHolderElement);
                    dropPoistion = "bottom";
                }
                return;
            }
            if (!mouseTouchedElement) return;
            touchedElement = mouseTouchedElement;
            const droppableElement = touchedElement.closest(".droppable");

            const manipulateDom = (type: "list" | "task") => {
                if (
                    !droppableElement ||
                    !draggingElement ||
                    !placeHolderElement ||
                    !touchedElement
                )
                    return;

                // Check if user is moving mouse down/right or up/left
                const mouseNext =
                    type === "list"
                        ? e.clientX > mouseClientX
                        : e.clientY > mouseClientY;
                const mousePrevious =
                    type === "list"
                        ? e.clientX < mouseClientX
                        : e.clientY < mouseClientY;

                const touchedElSibling = touchedElement.nextElementSibling;
                // Reassign mouseClient for the next mouse move check
                mouseClientX = e.clientX;
                mouseClientY = e.clientY;
                // If user is moving mouse to right (list) or down (task)
                if (mouseNext) {
                    if (touchedElSibling) {
                        droppableElement.insertBefore(
                            placeHolderElement,
                            touchedElSibling
                        );
                        dropPoistion = "after";
                    } else {
                        droppableElement.append(placeHolderElement);
                        dropPoistion = "after";
                    }
                }
                // If user is moving mouse to left (list) or up (task)
                else if (mousePrevious) {
                    droppableElement.insertBefore(
                        placeHolderElement,
                        touchedElement
                    );
                    dropPoistion = "before";
                }
            };

            // Swap for Lists
            if (draggingElement.id === "list-dnd") manipulateDom("list");
            // Swap for Tasks
            else if (draggingElement.id === "task-dnd") manipulateDom("task");
        }
    };

    const handleOnMouseUp = (e: MouseEvent) => {
        // Handle focus input for List Title
        if (!isMoving && clickedElement) {
            clickedElement.focus();
        }
        if (!draggingElement) return;
        // update state if reorder
        if (
            draggingElement.id === "list-dnd" &&
            touchedElement &&
            dropPoistion
        ) {
            dispatch(
                reOrderList({
                    draggingId: draggingElement.getAttribute("trello-id")!,
                    touchedId: touchedElement.getAttribute("trello-id")!,
                    dropPosition: dropPoistion,
                })
            );
        } else if (
            draggingElement.id === "task-dnd" &&
            placeHolderElement &&
            dropPoistion
        ) {
            const taskDraggingListId = draggingElement
                .closest("#list-dnd")
                ?.getAttribute("trello-id")!;
            const taskDropListId = placeHolderElement
                .closest("#list-dnd")
                ?.getAttribute("trello-id")!;
            dispatch(
                reOrderTask({
                    draggingId: draggingElement.getAttribute("trello-id")!,
                    touchedId: touchedElement?.getAttribute("trello-id")!,
                    dropPosition: dropPoistion,
                    taskDraggingListId: taskDraggingListId,
                    taskDropListId: taskDropListId,
                })
            );
        }
        document.removeEventListener("mousemove", handleOnMouseMove);
        // Clean up
        document.getElementById("fake-trello")?.classList.remove("no-hover");
        clearInterval(scrollEdgeX);
        clearInterval(scrollEdgeY);
        scrollEdgeX = null;
        scrollEdgeY = null;
        draggingElement.hidden = false;
        draggingElement = null;
        cloneDraggingElement?.remove();
        cloneDraggingElement = null;
        placeHolderElement?.remove();
        placeHolderElement = null;
        clickedElement = null;
        touchedElement = null;
        isMoving = false;
        mouseClientX = 0;
        mouseClientY = 0;
        dropPoistion = "";
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
