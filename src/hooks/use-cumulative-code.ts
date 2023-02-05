import { useTypedSelector } from "./use-typed-selectors";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderCells = order.map(id => data[id]);

    const showFunc =       `
      import _React from 'react';
      import _ReactDOM from 'react-dom';
      var show = (value) => {
        const root = document.querySelector('#root');
        if (typeof value === 'object') {
          if(value.$$typeof && value.props) {
            _ReactDOM.render(value, root);
          } else {
            root.innerHTML = JSON.stringify(value);
          }
        } else {
          root.innerHTML = value;
        }
      }
    `;

    const showFuncNoop = 'var show = () => {}';

    const cummulativeCells = [];
    for (let c of orderCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cummulativeCells.push(showFunc);
        } else {
          cummulativeCells.push(showFuncNoop);
        }
        cummulativeCells.push(c.content);
      }
      if(c.id === cellId) {
        break;
      }
    }
    return cummulativeCells;
  }).join('\n');
}