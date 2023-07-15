import { ListState } from "../features/Lists/listsSlice";

export const getNewId = () => {
    return (
        Date.now().toString(36) + Math.random().toString(36).substring(2, 12)
    );
};

export const swap = (array: string[], a: any, b: any) => {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
};

export const reOrderInSameDroppableEl = (
    array: string[],
    indexDragging: number,
    indexSwap: number,
    dropPosition: string
) => {
    // Handle for dropPoistion top/bottom first
    if (dropPosition === "top") {
        for (let i = indexDragging; i > 0; i--) {
            // if(i !== 0)
            swap(array, i, i - 1);
        }
        return;
    } else if (dropPosition === "bottom") {
        for (let i = indexDragging; i < array.length - 1; i++) {
            swap(array, i, i + 1);
        }
        return;
    }

    if (indexDragging < indexSwap) {
        for (let i = indexDragging; i < indexSwap; i++) {
            if (i == indexSwap - 1 && dropPosition === "before") break;
            swap(array, i, i + 1);
        }
        return;
    } else if (indexDragging > indexSwap) {
        for (let i = indexDragging; i > indexSwap; i--) {
            if (i === indexSwap + 1 && dropPosition === "after") break;
            swap(array, i, i - 1);
        }
        return;
    }
};

export const addTaskToAnotherList = (
    taskDraggingList: ListState,
    taskDropList: ListState,
    indexDragging: number,
    indexSwap: number,
    dropPosition: string
) => {
    const taskDraggingId = taskDraggingList.tasksId[indexDragging];
    console.log(">>>>", indexDragging);
    // Remove task dragging in it's origin list
    taskDraggingList.tasksId = [
        ...taskDraggingList.tasksId.slice(0, indexDragging),
        // ...taskDraggingList.tasksId.slice(indexDragging + 1),
    ];

    // Handle drop position for top/bottom first
    // if (dropPosition === "top") {
    //     return taskDropList.unshift(taskDraggingId);
    // } else if (dropPosition === "bottom") {
    //     return taskDropList.push(taskDraggingId);
    // }
    // get index to insert dragging task to new list
    // const indexPut =
    //     dropPosition === "after"
    //         ? indexSwap + 1
    //         : dropPosition === "before"
    //         ? indexSwap - 1
    //         : indexSwap;
    // // Add task dragging to new list
    // taskDropList.splice(indexPut, 0, taskDraggingId);
};
