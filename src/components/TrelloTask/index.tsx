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
        <StyledTrelloTask id="task-dnd" className="draggable drag-element">
            <div id="trello-task">
                <div id="task-container">
                    {task.title}
                    <Button id="edit-task" icon={<EditOutlined />} />
                </div>
            </div>
        </StyledTrelloTask>
    );
}

const StyledTrelloTask = styled.div`
    padding: 7px 8px 0 8px;

    &.dragging #trello-task {
        background-color: #a1bdd914;
    }

    &.dragging #task-container {
        visibility: hidden;
    }

    #trello-task {
        border-radius: 8px;
        background-color: #22272b;
        font-weight: 400;
        color: white;
        white-space: break-spaces;
        cursor: pointer;

        #task-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2px 2px 2px 12px;

            #edit-task {
                visibility: hidden;
                background-color: transparent;
                border: none;
                color: inherit;
            }

            #edit-task :hover {
                color: #4096ff;
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
