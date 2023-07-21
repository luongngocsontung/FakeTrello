import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { trelloTaskTitle } from "../../features/Tasks/taskSlice";
import { styled } from "styled-components";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { openTaskTitleQuickCard } from "../../features/TrelloTaskQuickCard/TaskTitleQuickCardSlice";
import { setTaskModalId } from "../../features/TrelloTaskModal/taskModalSlice";

export interface TrelloTaskProps {
    taskId: string;
    listId: string;
}

function TrelloTask({ taskId, listId }: TrelloTaskProps) {
    const taskRef = useRef<HTMLDivElement>(null);
    const taskTitle = useAppSelector((state) => trelloTaskTitle(state, taskId));
    const dispatch = useAppDispatch();

    const handleOpenTaskTitleQuickCard = () => {
        const taskHTML = taskRef.current;
        if (!taskHTML) return;

        const taskBoundingRect = taskHTML.getBoundingClientRect();
        dispatch(
            openTaskTitleQuickCard({
                listId,
                taskId,
                top: taskBoundingRect.top + "px",
                left: taskBoundingRect.left + "px",
                width: taskBoundingRect.width + "px",
                isOpen: true,
            })
        );
    };

    const handleOpenTaskModal = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const target = e.target as HTMLElement;
        // If user click open task title quick card then do nothing
        if (["BUTTON", "svg"].includes(target.tagName)) return;
        dispatch(setTaskModalId(taskId));
    };

    if (!taskTitle) return false;

    return (
        <StyledTrelloTask
            id="task-dnd"
            className="draggable drag-element"
            trello-id={taskId}
            ref={taskRef}
        >
            <div id="trello-task" onClick={handleOpenTaskModal}>
                <div id="task-container">
                    <span>{taskTitle}</span>
                    <Button
                        onClick={handleOpenTaskTitleQuickCard}
                        id="edit-task"
                        icon={<EditOutlined />}
                    />
                </div>
            </div>
        </StyledTrelloTask>
    );
}

const StyledTrelloTask = styled.div`
    &.dragging #trello-task {
        background-color: #a1bdd914;
    }

    &.dragging #task-container {
        visibility: hidden;
    }

    #trello-task {
        padding: 1px 0;
        border-radius: 8px;
        background-color: #22272b;
        font-weight: 400;
        color: white;
        white-space: break-spaces;
        word-wrap: break-word;
        cursor: pointer;

        #task-container {
            position: relative;
            padding: 8px 8px 8px 12px;

            #edit-task {
                transition: none;
                position: absolute;
                right: 2px;
                top: 2px;
                visibility: hidden;
                background-color: #282e3396;
                border: none;
                color: #adadad;
            }

            #edit-task:hover {
                background-color: #2c3439;
            }
        }
    }

    #trello-task:hover {
        background-color: #282e33;
        #task-container #edit-task {
            visibility: visible;
        }
    }
`;

export default TrelloTask;
