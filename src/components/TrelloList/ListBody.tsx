import React from "react";
import { TrelloListProps } from ".";
import { styled } from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { trelloListTasksId } from "../../features/Lists/listsSlice";
import TrelloTask from "../TrelloTask";
import AddTaskCard from "./AddTaskCard";

function ListBody({ listId }: TrelloListProps) {
    const listTasksId = useAppSelector((state) =>
        trelloListTasksId(state, listId)
    );

    if (!listTasksId) return false;

    return (
        <StyledListBody id="list-body" className="droppable">
            {listTasksId.map((id) => {
                return <TrelloTask key={id} taskId={id} listId={listId} />;
            })}
            <AddTaskCard listId={listId} />
        </StyledListBody>
    );
}

const StyledListBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: auto;
    gap: 7px;
    margin: 0 4px 8px 4px;
    padding: 0 4px;

    /* Style for scroll bar */
    &::-webkit-scrollbar {
        height: 8px;
        width: 8px;
    }

    &::-webkit-scrollbar-button {
        display: block;
        height: 100%;
    }

    &::-webkit-scrollbar-track-piece {
        background-color: #1c2015;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: #323b35;
        border-radius: 10px;
    }
`;

export default ListBody;
