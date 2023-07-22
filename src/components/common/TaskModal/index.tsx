import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import {
    AlignLeftOutlined,
    CloseOutlined,
    ProjectOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    TaskModalId,
    setTaskModalId,
} from "../../../features/TrelloTaskModal/taskModalSlice";
import {
    changeTaskDescription,
    trelloTask,
} from "../../../features/Tasks/taskSlice";
import { trelloListTitle } from "../../../features/Lists/listsSlice";
import TextArea from "../TextArea";
import useCloseOnMouseDown from "../../../hooks/useCloseOnMouseDown";
import { Button } from "antd";

function TrelloTaskModal() {
    const componentRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [isEditingDes, setIsEditingDes] = useState(false);
    const taskId = useAppSelector(TaskModalId);
    const task = useAppSelector((state) => trelloTask(state, taskId));
    const listTitle = useAppSelector((state) =>
        trelloListTitle(state, task?.listId)
    );
    const dispatch = useAppDispatch();
    useCloseOnMouseDown({
        isOpen: !!taskId,
        htmlElement: componentRef.current,
        action: () => handleCloseModal(),
    });

    const handleCloseModal = () => {
        dispatch(setTaskModalId(null));
        handleCancelEditDes();
    };

    const handleStartEditDes = async () => {
        const textarea = descriptionRef.current;
        if (!textarea) return;
        textarea.value = task?.description || "";
        textarea.rows = 15;
        textarea.style.height = "auto";
        setTimeout(() => {
            textarea.style.height = textarea.scrollHeight + "px";
            textarea.focus();
        }, 1);
        setIsEditingDes(true);
    };

    const handleCancelEditDes = () => {
        const textarea = descriptionRef.current;
        if (!textarea) return;
        textarea.rows = 2;
        textarea.value = task?.description || "";
        textarea.style.height = "auto";
        setIsEditingDes(false);
    };

    const handleSaveEditDes = () => {
        dispatch(
            changeTaskDescription({
                taskId: taskId || "",
                description: descriptionRef.current?.value || "",
            })
        );
        handleCancelEditDes();
    };

    useEffect(() => {
        if (taskId) {
            const textarea = descriptionRef.current;
            if (!textarea) return;
            textarea.value = task?.description || "";
        }
    }, [taskId]);

    const isOpenTextArea = !task?.description || isEditingDes;
    const isOpenTaskDescription = task?.description && !isEditingDes;

    return (
        <StyledTrellTaskModal style={{ display: taskId ? "flex" : "none" }}>
            <div id="task-modal-card" ref={componentRef}>
                <CloseOutlined
                    id="close-modal-button"
                    onClick={handleCloseModal}
                />
                <div id="modal-title">
                    <ProjectOutlined style={{ fontSize: 20 }} />
                    <div className="fullWidth">
                        <div id="task-title">{task?.title}</div>
                        <div id="list-title" className="mt-8">
                            in list <span>{listTitle}</span>
                        </div>
                    </div>
                </div>
                <div id="left-column">
                    <div id="task-description-container">
                        <AlignLeftOutlined style={{ fontSize: 20 }} />
                        <div className="fullWidth">
                            <div id="description-text">Description</div>
                            {isOpenTaskDescription && (
                                <div
                                    id="task-description"
                                    className="mt-8"
                                    onClick={handleStartEditDes}
                                >
                                    {task.description}
                                </div>
                            )}
                            <TextArea
                                ref={descriptionRef}
                                className="mt-8"
                                placeholder="Add a more detailed description..."
                                style={{
                                    display: isOpenTextArea ? "block" : "none",
                                }}
                                onClick={handleStartEditDes}
                            />
                            {isEditingDes && (
                                <div id="confirm-buttons" className="mt-8">
                                    <Button
                                        id="save-button"
                                        type="primary"
                                        onClick={handleSaveEditDes}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        id="cancel-button"
                                        type="ghost"
                                        onClick={handleCancelEditDes}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </StyledTrellTaskModal>
    );
}

const StyledTrellTaskModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: #0009;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(182, 194, 207);

    #task-modal-card {
        background-color: #282e33;
        box-sizing: border-box;
        border-radius: 8px;
        min-height: 600px;
        max-height: 600px;
        width: 768px;
        overflow-x: none;
        overflow-y: scroll;
        padding: 20px;
        position: relative;

        #modal-title {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
            margin-right: 20px;

            #task-title {
                font-size: 20px;
                font-weight: 600;
                line-height: 24px;
            }
            span {
                text-decoration: underline;
            }
        }
        #left-column {
            #task-description-container {
                display: flex;
                gap: 16px;

                #description-text {
                    font-size: 16px;
                    font-weight: 600;
                    line-height: 20px;
                }

                #task-description {
                    cursor: pointer;
                    white-space: pre-wrap;
                }

                textarea {
                    background-color: #a1bdd914;
                    color: inherit;

                    &::placeholder {
                        color: inherit;
                    }
                }

                #confirm-buttons {
                    display: flex;
                    gap: 8px;
                    #save-button {
                        color: black;
                    }
                    #cancel-button {
                        color: inherit;
                        &:hover {
                            background-color: #40474db2;
                        }
                    }
                }
            }
        }

        .fullWidth {
            flex: 1;
        }

        #close-modal-button {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 20px;
            padding: 8px;
            cursor: pointer;

            &:hover {
                background-color: #40474db2;
            }
        }
    }
`;

export default TrelloTaskModal;
