import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { trelloTask } from "../../features/Tasks/taskSlice";
import { styled } from "styled-components";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

export interface TrelloTaskProps {
    taskId: string;
}

function TrelloTask({ taskId }: TrelloTaskProps) {
    const task = useAppSelector((state) => trelloTask(state, taskId));
    const dispatch = useAppDispatch();

    if (!task) return false;

    return (
        <StyledTrelloTask>
            {task.title}
            <Button id="edit-task" icon={<EditOutlined />} />
        </StyledTrelloTask>
    );
}

const StyledTrelloTask = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 12px;
    border-radius: 8px;
    background-color: #22272b;
    font-weight: 400;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #282e33;
        #edit-task {
            visibility: visible;
        }
    }

    #edit-task {
        visibility: hidden;
        background-color: transparent;
        border: none;
        color: inherit;
    }

    #edit-task :hover {
        color: #4096ff;
    }
`;

export default TrelloTask;
