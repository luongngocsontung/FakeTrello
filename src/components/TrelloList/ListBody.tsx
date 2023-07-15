import React from "react";
import { TrelloListProps } from ".";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { tempDelete, trelloListTasksId } from "../../features/Lists/listsSlice";
import TrelloTask from "../TrelloTask";

function ListBody({ listId }: TrelloListProps) {
    const listTasksId = useAppSelector((state) =>
        trelloListTasksId(state, listId)
    );
    const dispatch = useAppDispatch();

    if (!listTasksId) return false;

    return (
        <StyledListBody id="list-body" className="droppable">
            {listTasksId.map((id) => {
                return <TrelloTask key={id} taskId={id} />;
            })}
            {/* <button
                onClick={() => {
                    dispatch(tempDelete({ listId: listId }));
                }}
            >
                Delete
            </button> */}
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
`;

export default ListBody;
