import React from "react";
import { TrelloListProps } from ".";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { trelloList } from "../../features/Lists/listsSlice";
import TrelloTask from "../TrelloTask";

function ListBody({ listId }: TrelloListProps) {
    const list = useAppSelector((state) => trelloList(state, listId));
    const dispatch = useAppDispatch();

    if (!list) return false;

    return (
        <StyledListBody className="droppable vertical-drop">
            {list.tasksId.map((id) => {
                return <TrelloTask key={id} taskId={id} />;
            })}
        </StyledListBody>
    );
}

const StyledListBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-x: hidden;
    overflow-y: auto;
`;

export default ListBody;
