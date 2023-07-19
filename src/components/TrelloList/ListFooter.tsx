import React, { useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { styled } from "styled-components";
import { TrelloListProps } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isOpenAddTask, openAddTask } from "../../features/Utils/utilsSlice";
import { scrollToEdge } from "../../utils/functions";

function ListFooter({ listId }: TrelloListProps) {
    const componentRef = useRef<HTMLDivElement>(null);
    const isCloseAddTask = useAppSelector(
        (state) => !isOpenAddTask(state, listId)
    );
    const dispatch = useAppDispatch();

    const scrollToBottom = () => {
        const taskContainer = componentRef.current?.previousElementSibling;
        if (!taskContainer) return;
        scrollToEdge(taskContainer, "bottom");
    };

    return (
        <StyledListFooter
            id="list-footer"
            style={{ display: isCloseAddTask ? "block" : "none" }}
            ref={componentRef}
        >
            <Button
                type="ghost"
                id="add-task-buttons"
                icon={<PlusOutlined />}
                onClick={async () => {
                    await dispatch(openAddTask(listId));
                    setTimeout(() => {
                        scrollToBottom();
                    }, 1);
                }}
            >
                Add a task
            </Button>
        </StyledListFooter>
    );
}

const StyledListFooter = styled.div`
    padding: 0 8px 8px 8px;

    #add-task-buttons {
        display: flex;
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
`;

export default ListFooter;
