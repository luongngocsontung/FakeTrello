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
        <StyledTrelloList className="drag-element">
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
        visibility: hidden;
    }

    #trello-list {
        box-sizing: border-box;
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
