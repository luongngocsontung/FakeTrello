import React, { useEffect, useRef } from "react";
import { Button } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addList } from "../../features/Lists/listsSlice";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import { StyledCard } from ".";
import { getNewId, scrollToEdge } from "../../utils/functions";
import Input from "../common/Input";
import {
    closeAddTask,
    isOpenAddTask,
    openAddTask,
} from "../../features/Utils/utilsSlice";
import useCloseOnMouseDown from "../../hooks/useCloseOnMouseDown";

const ADD_LIST_ID = "add-list";

function AddListButton() {
    const titleRef = useRef<HTMLInputElement>(null);
    const componentRef = useRef<HTMLDivElement>(null);
    const isOpenAddList = useAppSelector((state) =>
        isOpenAddTask(state, ADD_LIST_ID)
    );
    const dispatch = useAppDispatch();
    useCloseOnMouseDown({
        isOpen: isOpenAddList,
        htmlElement: componentRef.current,
        action() {
            dispatch(closeAddTask(ADD_LIST_ID));
        },
    });

    const scrollToRight = () => {
        const listContainer = componentRef.current?.closest("#lists-container");
        if (!listContainer) return;

        scrollToEdge(listContainer, "right");
    };

    const handleAddNewList = async () => {
        const listTitle = titleRef.current?.value;
        if (!listTitle) return;

        const newList = {
            id: getNewId(),
            title: listTitle,
        };
        // Set await so listContainer will wait till has new list and then scroll
        await dispatch(addList(newList));
        titleRef.current.value = "";

        scrollToRight();
    };

    useEffect(() => {
        if (!isOpenAddList) return;

        // Focus input when add list card open
        titleRef.current?.focus();
    }, [isOpenAddList]);

    return (
        <StyledAddListButton id="add-list">
            <Button
                onClick={async () => {
                    await dispatch(openAddTask(ADD_LIST_ID));
                    scrollToRight();
                }}
                icon={<PlusOutlined />}
                id="add-list-buttons"
                style={{ display: isOpenAddList ? "none" : "block" }}
            >
                Add another list
            </Button>

            <StyledCard
                id="add-list-container"
                style={{ display: isOpenAddList ? "block" : "none" }}
                ref={componentRef}
            >
                <Input
                    ref={titleRef}
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
                            dispatch(closeAddTask(ADD_LIST_ID));
                        }}
                    />
                </div>
            </StyledCard>
        </StyledAddListButton>
    );
}

const StyledAddListButton = styled.div`
    #add-list-buttons {
        display: block;
        background-color: #ffffff3d;
        min-width: 272px;
        padding: 12px 0px;
        height: fit-content;
        border-color: transparent;
        color: white;
        border-radius: 12px;

        &:hover {
            background-color: #ffffff23;
        }
    }

    #add-list-container {
        padding: 8px;

        input {
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
