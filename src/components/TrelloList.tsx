import React, { useRef, useState } from "react";
import { Card } from "antd";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { changeListTitle, trelloList } from "../features/Lists/listsSlice";
import { styled } from "styled-components";

interface TrelloListProps {
    listId: number;
}

function TrelloList({ listId }: TrelloListProps) {
    const list = useAppSelector((state) => trelloList(state, listId));
    const dispatch = useAppDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChangeListTitle = () => {
        dispatch(
            changeListTitle({
                listId: listId,
                newTitle: inputRef.current?.value || "DMM",
            })
        );
    };

    return (
        <StyledTrelloList>
            <Card id="trello-list" title={list?.title}></Card>
        </StyledTrelloList>
    );
}

const StyledTrelloList = styled.div`
    #trello-list {
        width: 272px;
    }
`;

export default TrelloList;
