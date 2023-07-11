import { styled } from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { trelloListsId } from "../../features/FakeTrello/trelloSlice";
import TrelloList from "../TrelloList";
import AddListButton from "./AddListButton";
import SaveTrelloButton from "./SaveTrelloButton";
import useDragAndDrop from "../../hooks/useDragAndDrop";

function FakeTrello() {
    const listsId = useAppSelector(trelloListsId);
    useDragAndDrop();

    return (
        <StyledFakeTrello>
            <div id="title">
                <span>Fake Trello</span>
                <SaveTrelloButton />
            </div>
            <div id="board">
                <div id="lists-container" className="droppable">
                    {listsId.map((id) => {
                        return <TrelloList key={id} listId={id} />;
                    })}
                    <AddListButton />
                </div>
            </div>
        </StyledFakeTrello>
    );
}

const StyledFakeTrello = styled.div`
    height: 100vh;
    background-color: #8f3f66;
    display: flex;
    flex-direction: column;

    #title {
        padding: 12px 16px;
        background-color: rgba(0, 0, 0, 0.24);
        color: white;
        font-weight: 700;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            border-width: 3px;
            color: inherit;
            width: 80px;
            background-color: transparent;
            padding: 6px;
            height: fit-content;
        }
    }
    #board {
        flex: 1 1 auto;
        position: relative;

        #lists-container {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            display: flex;
            gap: 12px;
            margin-bottom: 8px;
            padding: 12px 12px 0 12px;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
        }

        /* Style for scroll bar */
        #lists-container::-webkit-scrollbar {
            height: 12px;
            width: 12px;
        }

        #lists-container::-webkit-scrollbar-button {
            display: block;
            height: 4px;
            width: 4px;
        }

        #lists-container::-webkit-scrollbar-track-piece {
            background: #00000026;
            border-radius: 10px;
        }

        #lists-container::-webkit-scrollbar-thumb {
            background: #ffffff63;
            border-radius: 10px;
        }
    }
`;

export const StyledCard = styled.div`
    background-color: #101204;
    color: rgb(182, 194, 207);
    min-height: 20px;
    border-radius: 12px;
    width: 272px;
`;

export default FakeTrello;
