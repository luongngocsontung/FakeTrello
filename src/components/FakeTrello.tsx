import React from "react";
import { styled } from "styled-components";
import { useAppSelector } from "../app/hooks";
import { trelloListsId } from "../features/FakeTrello/trelloSlice";
import TrelloList from "./TrelloList";
import AddListButton from "./AddListButton";

function FakeTrello() {
    const listsId = useAppSelector(trelloListsId);

    return (
        <StyledFakeTrello>
            <div id="title">Fake Trello</div>
            <div id="lists-container">
                {listsId.map((id) => {
                    return <TrelloList key={id} listId={id} />;
                })}
                <AddListButton />
            </div>
        </StyledFakeTrello>
    );
}

const StyledFakeTrello = styled.div`
    height: 100vh;
    background-color: #8f3f66;
    display: flex;
    flex-direction: column;

    #title {
        padding: 12px 16px;
        background-color: rgba(0, 0, 0, 0.24);
        color: white;
        font-weight: 700;
        font-size: 18px;
    }

    #lists-container {
        display: flex;
        gap: 12px;
        margin-bottom: 8px;
        padding: 12px 12px 0 12px;
        height: 100vh;
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;
    }

    /* Style for scroll bar */
    #lists-container::-webkit-scrollbar {
        height: 12px;
        width: 12px;
    }

    #lists-container::-webkit-scrollbar-button {
        display: block;
        height: 4px;
        width: 4px;
    }

    #lists-container::-webkit-scrollbar-track-piece {
        background: #00000026;
        border-radius: 10px;
    }

    #lists-container::-webkit-scrollbar-thumb {
        background: #ffffff63;
        border-radius: 10px;
    }
`;

export default FakeTrello;
