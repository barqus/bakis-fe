import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import "./DragableTable.css";
import { GiTrophy } from "react-icons/gi";

const DragableTable = ({ players, setPlayers }) => {

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(players);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPlayers(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="players">
        {(provided) => (
            <ul className="characters mt-4" {...provided.droppableProps} ref={provided.innerRef}>
                {players.map(({ nickname }, index) => {
                    return (
                        <Draggable key={nickname} draggableId={nickname} index={index}>
                            {(provided) => (
                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                                    className={`mb-2 flex items-center bg-gradient-to-r from-purple-800 to-green-500 px-4 rounded-lg
                                        ${(index + 1) === 1 ? "py-8 mt-1 border-4 text-4xl"
                                            : (index + 1) === 2 ? "py-4 border-2 text-3xl"
                                                : (index + 1) === 3 ? "py-3 border-2 text-2xl"
                                                    : "py-2 text-base"}`}>
                                    <p className="text-white font-bold">
                                        {(index + 1) === 1 ? <GiTrophy className="inline mb-1 mr-2" style={{ color: "#FFD700" }} />
                                            : (index + 1) === 2 ? <GiTrophy className="inline mb-1 mr-2" style={{ color: "#C0C0C0" }} />
                                                : (index + 1) === 3 && <GiTrophy className="inline mb-1 mr-2" style={{ color: "#CD7F32" }} />}
                                        {index + 1}. {nickname}
                                    </p>
                                </li>
                            )}
                        </Draggable>
                    );
                })}
                {provided.placeholder}
            </ul>
        )}
    </Droppable>
</DragDropContext>
  );
};

export default DragableTable;
