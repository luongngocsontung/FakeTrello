import React from "react";
import { styled } from "styled-components";
import { StyledCard } from "../FakeTrello";
import ListHeader from "./ListHeader";
import ListBody from "./ListBody";
import ListFooter from "./ListFooter";

export interface TrelloListProps {
    listId: string;
}

function TrelloList({ listId }: TrelloListProps) {
    return (
        <StyledTrelloList
            id="list-dnd"
            className="drag-element"
            trello-id={listId}
        >
            <StyledCard id="trello-list">
                <div id="trello-list-container">
                    <ListHeader listId={listId} />
                    <ListBody listId={listId} />
                    <ListFooter listId={listId} />
                </div>
            </StyledCard>
        </StyledTrelloList>
    );
}

const StyledTrelloList = styled.div`
    &.dragging #trello-list {
        background-color: #00000023;
    }

    &.dragging #trello-list-container {
        opacity: 0;
    }

    &.box-shadow #trello-list {
        box-shadow: inset 0px 0px 0px 1px #bcd6f01f, 0px 8px 12px #0304045c,
            0px 0px 1px #03040480;
    }

    #trello-list {
        display: flex;
        flex-direction: column;
        max-height: 100%;
    }
    #trello-list-container {
        display: flex;
        flex-direction: column;
        min-height: 20px;
    }
`;

export default TrelloList;
