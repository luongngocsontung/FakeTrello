import React from "react";
import { useAppSelector } from "../../app/hooks";
import { trelloListsId } from "../../features/FakeTrello/trelloSlice";
import TrelloList from "../TrelloList";
import AddListButton from "./AddListButton";

function TrelloBoard() {
    const listsId = useAppSelector(trelloListsId);

    return (
        <div id="board">
            <div id="lists-container" className="droppable">
                {listsId.map((id) => {
                    return <TrelloList key={id} listId={id} />;
                })}
                <AddListButton />
            </div>
        </div>
    );
}

export default TrelloBoard;
