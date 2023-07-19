import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getNewId } from "../../utils/functions";
import { addTask } from "../../features/Tasks/taskSlice";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import TextArea from "../common/TextArea";
import { closeAddTask, isOpenAddTask } from "../../features/Utils/utilsSlice";

function AddTaskCard({ listId }: { listId: string }) {
    const componentRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const isOpen = useAppSelector((state) => isOpenAddTask(state, listId));
    const dispatch = useAppDispatch();

    const handleAddNewTask = () => {
        const taskTitle = titleRef.current?.value;
        if (!taskTitle) return;

        const newTask = {
            listId: listId,
            id: getNewId(),
            title: taskTitle,
        };
        dispatch(addTask(newTask));
        titleRef.current.value = "";
        titleRef.current.style.height = "auto";
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                componentRef.current &&
                !componentRef.current.contains(event.target as Node)
            ) {
                // User clicked outside the component
                dispatch(closeAddTask(listId));
            }
        };
        // Add event listener to detect clicks outside the component
        setTimeout(() => {
            document.addEventListener("click", handleClickOutside);
        }, 1);
        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isOpen]);

    // Focus input field
    useEffect(() => {
        if (isOpen) titleRef.current?.focus();
    }, [isOpen]);

    if (!isOpen) return false;

    return (
        <StyledAddTaskCard
            id="add-task-container"
            className="mb-8"
            ref={componentRef}
        >
            <TextArea
                ref={titleRef}
                rows={3}
                placeholder="Enter a title for this task..."
                onPressEnter={(e) => {
                    e.preventDefault();
                    handleAddNewTask();
                }}
            />
            <div id="confirm-actions" className="mt-8">
                <Button
                    id="confirm-add-task"
                    type="primary"
                    onClick={handleAddNewTask}
                >
                    Add task
                </Button>
                <CloseOutlined
                    style={{ fontSize: 21 }}
                    onClick={() => {
                        dispatch(closeAddTask(listId));
                    }}
                />
            </div>
        </StyledAddTaskCard>
    );
}

const StyledAddTaskCard = styled.div`
    textarea {
        transition: none;
        background-color: #22272b;
        color: white;

        &::placeholder {
            color: #ffffffbd;
        }

        &:hover {
            background-color: #22272b;
            border: none;
            box-shadow: none;
        }
    }

    #add-task-buttons:hover {
        background-color: #a6c5e229;
    }

    #confirm-actions {
        display: flex;
        align-items: center;
        gap: 8px;

        #confirm-add-task {
            color: #1d2125;
            font-weight: 400;
            transition: none;
        }
    }
`;

export default AddTaskCard;
