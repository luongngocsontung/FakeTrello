import React from "react";
import { Button } from "antd";
import { useAppDispatch } from "../app/hooks";
import { addList } from "../features/Lists/listsSlice";
import { PlusOutlined } from "@ant-design/icons";
import { styled } from "styled-components";

let listId = 1;

function AddListButton() {
    const dispatch = useAppDispatch();

    const handleAddNewList = () => {
        const newList = {
            id: listId++,
            title: "DMM Di Ngu Thoi",
        };
        dispatch(addList(newList));
    };

    return (
        <StyledAddListButton>
            <Button
                onClick={handleAddNewList}
                icon={<PlusOutlined />}
                id="add-list-buttons"
            >
                Add another list
            </Button>
        </StyledAddListButton>
    );
}

const StyledAddListButton = styled.div`
    #add-list-buttons {
        min-width: 272px;
        padding: 12px 0px;
        background-color: #ffffff3d;
        height: fit-content;
        border-color: transparent;
        color: white;
        border-radius: 12px;
    }

    #add-list-buttons:hover {
        background-color: #a6c5e229;
    }
`;

export default AddListButton;
