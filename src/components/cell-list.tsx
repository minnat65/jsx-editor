import { Fragment } from "react"
import './cell-list.css';
import CellListItem from "./cell-list-item";
import { useTypedSelector } from "../hooks/use-typed-selectors";
import AddCell from "./add-cell";

const CellList = () => {
  const cells = useTypedSelector(({ cells: { order, data }}) => {
    return order.map((id) => data[id])
  });
  console.log('cells: ', cells);
  

  const cellLists = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forceVisible={ cells.length === 0 } previousCellId={null} />
      {cellLists}
    </div>
  )
}

export default CellList;