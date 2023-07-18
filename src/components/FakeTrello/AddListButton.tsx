import React, { useRef, useState } from "react";
import { Button, Input, InputRef } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { addList } from "../../features/Lists/listsSlice";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { StyledCard } from ".";
import { getNewId } from "../../utils/functions";

function AddListButton() {
    const [isAddingList, setIsAddingList] = useState(false);
    const [title, setTitle] = useState("");
    const titleRef = useRef<InputRef>(null);

    const dispatch = useAppDispatch();

    const handleAddNewList = () => {
        if (!title) return;

        const newList = {
            id: getNewId(),
            title: title,
        };
        dispatch(addList(newList));
        setTitle("");
    };

    return (
        <StyledAddListButton
            id="add-list"
            className={isAddingList ? "open-add-list" : ""}
        >
            <Button
                onClick={() => {
                    setIsAddingList(true);
                    titleRef.current?.focus();
                }}
                icon={<PlusOutlined />}
                id="add-list-buttons"
            >
                Add another list
            </Button>

            <StyledCard id="add-list-container">
                <Input
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter list title..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAddNewList();
                        }
                    }}
                />
                <div id="confirm-actions" className="mt-8">
                    <Button
                        id="confirm-add-list"
                        type="primary"
                        onClick={handleAddNewList}
                    >
                        Add list
                    </Button>
                    <CloseOutlined
                        style={{ fontSize: 21 }}
                        onClick={() => {
                            setIsAddingList(false);
                            setTitle("");
                        }}
                    />
                </div>
            </StyledCard>
        </StyledAddListButton>
    );
}

const StyledAddListButton = styled.div`
    &.open-add-list {
        #add-list-buttons {
            display: none;
        }
        #add-list-container {
            opacity: 1;
        }
    }

    #add-list-buttons {
        display: block;
        background-color: #ffffff3d;
        min-width: 272px;
        padding: 12px 0px;
        height: fit-content;
        border-color: transparent;
        color: white;
        border-radius: 12px;
    }

    #add-list-container {
        opacity: 0;
        padding: 8px;

        input {
            transition: none;
            background-color: #22272b;
            color: white;

            &::placeholder {
                color: #ffffffbd;
            }
        }

        #add-list-buttons:hover {
            background-color: #a6c5e229;
        }

        #confirm-actions {
            display: flex;
            align-items: center;
            gap: 8px;

            #confirm-add-list {
                color: #1d2125;
                font-weight: 400;
            }

            button {
                transition: none;
            }
        }
    }
`;

export default AddListButton;
