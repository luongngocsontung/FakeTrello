import React, { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    TaskTitleModal,
    closeTaskTitleModal,
} from "../../features/TrelloTaskTitleModal/TaskTitleModalSlice";
import { Button, Tag } from "antd";
import {
    changeTaskTitle,
    deleteTask,
    trelloTaskTitle,
} from "../../features/Tasks/taskSlice";
import { DeleteOutlined } from "@ant-design/icons";
import TextArea from "../common/TextArea";

let scrollId: any = null;

function TrelloTaskTitleModal() {
    const quickCardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLTextAreaElement>(null);
    const { listId, taskId, top, left, width, isOpen } =
        useAppSelector(TaskTitleModal);
    const taskTitle = useAppSelector((state) => trelloTaskTitle(state, taskId));
    const dispatch = useAppDispatch();

    const closeModal = () => {
        dispatch(closeTaskTitleModal());
    };

    const handleOnClickModal = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const target = e.target as HTMLDivElement;
        if (target.id === "task-title-modal") closeModal();
    };

    const handleChangeTaskTitle = () => {
        const taskTitle = titleRef.current?.value;
        if (!taskTitle) return;

        dispatch(changeTaskTitle({ id: taskId, newTitle: taskTitle }));
        closeModal();
    };

    const handleDeleteTask = () => {
        dispatch(deleteTask({ taskId, listId }));
        closeModal();
    };

    // Update position and select TextArea
    useEffect(() => {
        if (isOpen) {
            const quickCard = quickCardRef.current;
            if (!quickCard) return;
            const boundingRectQuickCard = quickCard.getBoundingClientRect();

            quickCard.style.left = left;
            quickCard.style.width = width;
            if (
                parseFloat(top) + boundingRectQuickCard.height >
                window.innerHeight
            ) {
                quickCard.style.bottom = "25px";
                quickCard.style.top = "";
            } else {
                quickCard.style.top = top;
                quickCard.style.bottom = "";
            }

            // Scroll to show all options if they are hidden
            if (
                parseFloat(left) + parseFloat(width) + 276 >
                window.innerWidth
            ) {
                let gap =
                    parseFloat(left) +
                    parseFloat(width) +
                    276 -
                    window.innerWidth;
                const listsContainer =
                    document.getElementById("lists-container");

                const scroll = () => {
                    listsContainer?.scrollBy({ left: 10 });
                    quickCard.style.left =
                        parseFloat(quickCard.style.left) - 10 + "px";
                    gap -= 10;
                    if (gap <= 0) {
                        return;
                    }
                    clearTimeout(scrollId);
                    scrollId = setTimeout(scroll, 1);
                };
                scroll();
            }

            // Update attribute for textarea and select all the text
            const textarea = titleRef.current;
            if (!textarea) return;

            textarea.value = taskTitle || "";
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
            textarea.select();

            return () => {
                clearTimeout(scrollId);
            };
        }
    }, [isOpen]);

    return (
        <StyledTrelloTaskTitleModal
            id="task-title-modal"
            className={isOpen ? "modal-open" : ""}
            onClick={handleOnClickModal}
        >
            <div ref={quickCardRef} id="quick-card-editor-task">
                <TextArea
                    rows={4}
                    ref={titleRef}
                    onPressEnter={(e) => {
                        e.preventDefault();
                        handleChangeTaskTitle();
                    }}
                />
                <Button
                    id="confirm-change-task-title"
                    type="primary"
                    onClick={handleChangeTaskTitle}
                >
                    Save
                </Button>
                <div id="quick-card-buttons">
                    <Tag
                        icon={<DeleteOutlined />}
                        bordered={false}
                        className="action-buttons"
                        onClick={handleDeleteTask}
                    >
                        <span>Delete</span>
                    </Tag>
                </div>
            </div>
        </StyledTrelloTaskTitleModal>
    );
}

const StyledTrelloTaskTitleModal = styled.div`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10;
    background-color: #0009;
    transform: translateX(100%);

    #quick-card-editor-task {
        position: absolute;

        textarea {
            background-color: #22272b;
            color: white;
            box-shadow: inset 0px 0px 0px 1px #00000000, 0px 1px 1px #03040480,
                0px 0px 1px #03040480;
            padding: 8px 8px 8px 12px;
            line-height: 20px;
        }

        #confirm-change-task-title {
            margin-top: 8px;
            color: #1d2125;
            font-weight: 400;
        }

        #quick-card-buttons {
            position: absolute;
            left: 100%;
            top: 0;
            opacity: 0;
            transform: translateX(-20px);
            transition: opacity 85ms ease-in, transform 85ms ease-in;
            width: 240px;

            .action-buttons {
                background: #0009;
                border-radius: 3px;
                clear: both;
                color: #c7d1db;
                display: block;
                float: left;
                margin: 0 0 4px 8px;
                padding: 6px 12px 6px 10px;
                transition: transform 85ms ease-in;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;

                &:hover {
                    transform: translateX(5px);
                }
            }
        }
    }

    &.modal-open {
        transform: translateX(0);
        #quick-card-editor-task {
            #quick-card-buttons {
                opacity: 1;
                transform: translateX(0);
            }
        }
    }
`;

export default TrelloTaskTitleModal;
