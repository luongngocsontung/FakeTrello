import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    TaskTitleModal,
    closeTaskTitleModal,
} from "../../features/TrelloTaskTitleModal/TaskTitleModalSlice";
import { Button, Input, Tag } from "antd";
import {
    changeTaskTitle,
    trelloTaskTitle,
} from "../../features/Tasks/taskSlice";
import { TextAreaRef } from "antd/es/input/TextArea";
import { DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;

function TrelloTaskTitleModal() {
    const quickCardRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<TextAreaRef>(null);
    const { listId, taskId, top, left, width, isOpen } =
        useAppSelector(TaskTitleModal);
    const taskTitle = useAppSelector((state) => trelloTaskTitle(state, taskId));
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState(taskTitle);

    const clostModal = () => {
        dispatch(closeTaskTitleModal());
    };

    const handleOnClickModal = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const target = e.target as HTMLDivElement;
        if (target.id === "task-title-modal") clostModal();
    };

    const handleChangeTaskTitle = () => {
        if (!title) return;

        dispatch(changeTaskTitle({ id: taskId, newTitle: title }));
        clostModal();
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
        }
    }, [isOpen]);

    // Update textarea value
    useEffect(() => {
        setTitle(taskTitle || "");
        titleRef.current?.focus();
    }, [taskTitle]);

    return (
        <StyledTrelloTaskTitleModal
            id="task-title-modal"
            className={isOpen ? "modal-open" : ""}
            onClick={handleOnClickModal}
        >
            <div ref={quickCardRef} id="quick-card-editor-task">
                <TextArea
                    bordered={false}
                    autoSize={{ minRows: 4 }}
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
