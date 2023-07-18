import React, { useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    changeListTitle,
    removeList,
    trelloListTitle,
} from "../../features/Lists/listsSlice";
import { TrelloListProps } from ".";
import { EllipsisOutlined, DeleteOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";

function ListHeader({ listId }: TrelloListProps) {
    const listTitle = useAppSelector((state) => trelloListTitle(state, listId));
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(listTitle);

    const handleRemoveList = () => {
        dispatch(removeList(listId));
    };

    const items: MenuProps["items"] = [
        {
            key: "0",
            label: "Remove List",
            icon: <DeleteOutlined />,
            onClick: handleRemoveList,
        },
    ];

    const handleChangeListTitle = (
        e: React.FocusEvent<HTMLInputElement, Element>
    ) => {
        e.currentTarget.setAttribute("isFocus", "false");
        const newTitle = e.target.value;
        if (!newTitle) {
            return setTitle(listTitle);
        }

        dispatch(
            changeListTitle({
                listId: listId,
                newTitle: newTitle,
            })
        );
    };

    return (
        <StyledListHeader id="task-dnd" className="draggable">
            <input
                id="list-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleChangeListTitle}
                onFocus={(e) => e.currentTarget.setAttribute("isFocus", "true")}
            />

            <Dropdown menu={{ items }} trigger={["click"]}>
                <EllipsisOutlined style={{ fontSize: 21 }} />
            </Dropdown>
        </StyledListHeader>
    );
}

const StyledListHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    cursor: pointer;

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
