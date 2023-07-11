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
        <StyledTrelloList>
            <StyledCard id="trello-list">
                <ListHeader listId={listId} />
                <ListBody listId={listId} />
                <ListFooter listId={listId} />
            </StyledCard>
        </StyledTrelloList>
    );
}

const StyledTrelloList = styled.div`
    #trello-list {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        max-height: 100%;
    }
`;

export default TrelloList;
