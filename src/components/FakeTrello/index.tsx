import { styled } from "styled-components";
import SaveTrelloButton from "./SaveTrelloButton";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import TrelloBoard from "./TrelloBoard";

function FakeTrello() {
    useDragAndDrop();
    console.log("Asdsad");
    return (
        <StyledFakeTrello>
            <div id="title">
                <span>Fake Trello</span>
                <SaveTrelloButton />
            </div>
            <TrelloBoard />
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
            gap: 12px;
            padding: 12px 12px 12px 12px;
            display: flex;
            margin-bottom: 8px;
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
    box-sizing: border-box;
`;

export default FakeTrello;
