import React, { useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { changeListTitle, trelloList } from "../../features/Lists/listsSlice";
import { TrelloListProps } from ".";
import { EllipsisOutlined } from "@ant-design/icons";

function ListHeader({ listId }: TrelloListProps) {
    const list = useAppSelector((state) => trelloList(state, listId));
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(list?.title);

    const handleChangeListTitle = (
        e: React.FocusEvent<HTMLInputElement, Element>
    ) => {
        e.currentTarget.setAttribute("isFocus", "false");
        const newTitle = e.target.value;
        if (!newTitle) {
            return setTitle(list?.title);
        }

        dispatch(
            changeListTitle({
                listId: listId,
                newTitle: newTitle,
            })
        );
    };

    return (
        <StyledListHeader className="draggable">
            <input
                id="list-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleChangeListTitle}
                onFocus={(e) => e.currentTarget.setAttribute("isFocus", "true")}
            />
            <EllipsisOutlined style={{ fontSize: 21 }} />
        </StyledListHeader>
    );
}

const StyledListHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;

    #list-title {
        width: 100%;
        margin-right: 8px;
        height: 28px;
        padding: 4px 8px 4px 12px;
        background-color: transparent;
        border: none;
        color: inherit;
        font-weight: 600;
        font-size: 14px;
        border-radius: 3px;
        cursor: pointer;
    }

    #list-title:focus {
        background-color: #22272b;
        outline: none;
        box-shadow: inset 0 0 0 2px #85b8ff;
    }
`;

export default ListHeader;
