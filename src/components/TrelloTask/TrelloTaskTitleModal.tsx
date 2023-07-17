import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    TaskTitleModal,
    closeTaskTitleModal,
} from "../../features/TrelloTaskTitleModal/TaskTitleModalSlice";
import { Button, Input } from "antd";
import {
    changeTaskTitle,
    trelloTaskTitle,
} from "../../features/Tasks/taskSlice";
import { TextAreaRef } from "antd/es/input/TextArea";
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

            quickCard.style.left = left;
            quickCard.style.top = top;
            quickCard.style.width = width;
        }
    }, [isOpen]);

    // Update textarea value
    useEffect(() => {
        setTitle(taskTitle || "");
        titleRef.current?.resizableTextArea?.textArea.select();
    }, [taskTitle]);

    return (
        <StyledTrelloTaskTitleModal
            id="task-title-modal"
            onClick={handleOnClickModal}
            is-open={isOpen.toString()}
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
            </div>
        </StyledTrelloTaskTitleModal>
    );
}

interface CustomDivProps {
    "is-open": string;
}

const StyledTrelloTaskTitleModal = styled.div<CustomDivProps>`
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10;
    background-color: #0009;
    display: ${(props) => (props["is-open"] === "true" ? "block" : "none")};

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
    }
`;

export default TrelloTaskTitleModal;
