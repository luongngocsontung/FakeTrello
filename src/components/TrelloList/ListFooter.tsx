import React, { useRef, useState } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, InputRef } from "antd";
import { styled } from "styled-components";
import { TrelloListProps } from ".";
import { useAppDispatch } from "../../app/hooks";
import { addTask } from "../../features/Tasks/taskSlice";
import { getNewId } from "../../utils/functions";

function ListFooter({ listId }: TrelloListProps) {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [title, setTitle] = useState("");
    const titleRef = useRef<InputRef>(null);

    const dispatch = useAppDispatch();

    const handleAddNewTask = () => {
        if (!title) return;

        const newTask = {
            listId: listId,
            id: getNewId(),
            title: title,
        };
        dispatch(addTask(newTask));
        setTitle("");
    };

    return (
        <StyledListFooter is-adding-task={isAddingTask.toString()}>
            <Button
                type="ghost"
                id="add-task-buttons"
                icon={<PlusOutlined />}
                onClick={() => setIsAddingTask(true)}
            >
                Add a task
            </Button>

            <div id="add-task-container">
                <Input
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddNewTask();
                        }
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
                            setIsAddingTask(false);
                            setTitle("");
                        }}
                    />
                </div>
            </div>
        </StyledListFooter>
    );
}

interface CustomComponentProps {
    "is-adding-task": string;
}

const StyledListFooter = styled.div<CustomComponentProps>`
    padding: 8px;

    #add-task-buttons {
        display: ${(props) =>
            props["is-adding-task"] === "true" ? "none" : "flex"};
        align-items: center;
        height: fit-content;
        border-color: transparent;
        color: inherit;
        border-radius: 8px;
        padding: 4px 10px;
        width: 100%;
    }

    #add-task-buttons:hover {
        background-color: #a6c5e229;
    }

    #add-task-container {
        visibility: ${(props) =>
            props["is-adding-task"] === "true" ? "visible" : "hidden"};
        position: ${(props) =>
            props["is-adding-task"] === "true" ? "unset" : "absolute"};

        input {
            transition: none;
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
            }

            button {
                transition: none;
            }
        }
    }
`;

export default ListFooter;
