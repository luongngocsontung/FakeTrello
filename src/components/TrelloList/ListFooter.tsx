import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { styled } from "styled-components";
import { TrelloListProps } from ".";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { isOpenAddTask, openAddTask } from "../../features/Utils/utilsSlice";

function ListFooter({ listId }: TrelloListProps) {
    const isCloseAddTask = useAppSelector(
        (state) => !isOpenAddTask(state, listId)
    );
    const dispatch = useAppDispatch();

    if (!isCloseAddTask) return false;

    return (
        <StyledListFooter id="list-footer">
            <Button
                type="ghost"
                id="add-task-buttons"
                icon={<PlusOutlined />}
                onClick={() => dispatch(openAddTask(listId))}
            >
                Add a task
            </Button>
        </StyledListFooter>
    );
}

const StyledListFooter = styled.div`
    padding: 8px;

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
