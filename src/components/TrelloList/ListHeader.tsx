import React, { useEffect, useState } from "react";
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
import useCloseOnMouseDown from "../../hooks/useCloseOnMouseDown";

function ListHeader({ listId }: TrelloListProps) {
    const listTitle = useAppSelector((state) => trelloListTitle(state, listId));
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(listTitle);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    useCloseOnMouseDown({
        isOpen: isDropdownOpen,
        className: "ant-dropdown",
        action() {
            setIsDropdownOpen(false);
        },
    });

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

    // useEffect(() => {
    //     if (isDropdownOpen) {
    //         const dropdown = document.getElementsByClassName("ant-dropdown")[0];

    //         const handleClickOutside = (e: MouseEvent) => {
    //             if (dropdown && !dropdown.contains(e.target as Node)) {
    //                 // User clicked outside the component
    //                 setIsDropdownOpen(false);
    //             }
    //         };
    //         setTimeout(() => {
    //             document.addEventListener("mousedown", handleClickOutside);
    //         }, 1);

    //         return () => {
    //             document.removeEventListener("mousedown", handleClickOutside);
    //         };
    //     }
    // }, [isDropdownOpen]);

    return (
        <StyledListHeader id="task-dnd" className="draggable">
            <input
                id="list-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleChangeListTitle}
                onFocus={(e) => e.currentTarget.setAttribute("isFocus", "true")}
            />

            <Dropdown menu={{ items }} open={isDropdownOpen}>
                <EllipsisOutlined
                    style={{ fontSize: 21 }}
                    onClick={() => {
                        setIsDropdownOpen(true);
                    }}
                />
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
