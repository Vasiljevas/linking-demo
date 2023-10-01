import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import "./App.css";

type Coin = {
  id: number;
  denomination: string;
};

function App() {
  const [coins, setCoins] = useState<Coin[]>([
    { id: 1, denomination: "1 Litas" },
    { id: 2, denomination: "2 Litai" },
    { id: 3, denomination: "5 Litai" },
    { id: 4, denomination: "1 Euras" },
    { id: 5, denomination: "2 Eurai" },
    { id: 6, denomination: "5 Eurai" },
  ]);

  const [litai, setLitai] = useState<Coin[]>([]);

  const handleDragDrop = (results: DropResult) => {
    const { source, destination } = results;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const setFn = source.droppableId === "col-1" ? setCoins : setLitai;
      const list = source.droppableId === "col-1" ? coins : litai;

      const newList = list.filter((_, idx: number) => idx !== source.index);

      newList.splice(destination.index, 0, list[source.index]);

      setFn(newList);
    }

    if (source.droppableId !== destination.droppableId) {
      const setDestFn =
        destination.droppableId === "col-2" ? setLitai : setCoins;
      const destList = destination.droppableId === "col-2" ? litai : coins;
      const setSrcFn = source.droppableId === "col-1" ? setCoins : setLitai;
      const srcList = source.droppableId === "col-1" ? coins : litai;

      const newSrcList = srcList.filter((_, idx) => idx !== source.index);
      setSrcFn(newSrcList);

      destList.splice(destination.index, 0, srcList[source.index]);
      setDestFn([...destList]);
    }
  };

  return (
    <>
      <h1>Linking app</h1>
      <div className="coins-container">
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="coins-column">
            <div className="coin">All coins:</div>
            <Droppable droppableId="col-1" type="COIN">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="droppable"
                >
                  {coins.map((coin, index) => (
                    <Draggable
                      draggableId={`${coin.id}`}
                      key={coin.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={coin.id}
                          className="coin clickable"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          {coin.denomination}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="coins-column">
            <div className="coin"> Litai:</div>
            <Droppable droppableId="col-2" type="COIN">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="droppable"
                >
                  {litai.map((litas, index) => (
                    <Draggable
                      draggableId={`${litas.id}`}
                      key={litas.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          key={litas.id}
                          className="coin clickable"
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          {litas.denomination}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
