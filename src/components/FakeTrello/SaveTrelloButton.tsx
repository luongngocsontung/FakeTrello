import { Button } from "antd";
import React, { useState } from "react";
import { store } from "../../app/store";

function SaveTrelloButton() {
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveToLocalStorage = () => {
        setIsSaving(true);
        const { trello, trelloLists, trelloTasks } = store.getState();
        localStorage.setItem("trello", JSON.stringify(trello, null, 2));
        localStorage.setItem(
            "trelloLists",
            JSON.stringify(trelloLists, null, 2)
        );
        localStorage.setItem(
            "trelloTasks",
            JSON.stringify(trelloTasks, null, 2)
        );

        setTimeout(() => {
            setIsSaving(false);
        }, 1500);
    };

    return (
        <Button
            id="save-button"
            loading={isSaving}
            onClick={handleSaveToLocalStorage}
        >
            Save
        </Button>
    );
}

export default SaveTrelloButton;
