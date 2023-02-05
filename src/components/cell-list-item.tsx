import React from "react";
import './cell-list-item.css';
import { Cell } from "../state";
import TextEditor from "./text-editor";
import CodeCell from "./code-cell";
import ActionBars from "./action-bar";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  
  let child: JSX.Element;
  if(cell.type === 'code') {
    child = <>
      <div className="action-bar-wrapper">
        <ActionBars id={cell.id} />
      </div>
      <CodeCell cell={cell} />
    </>
  } else {
    child = <>
        <TextEditor cell={cell}/>
        <ActionBars id={cell.id} />
     </>
  }
  return (
    <div className="cell-list-item">
      {child}
    </div>
  )
}

export default CellListItem;