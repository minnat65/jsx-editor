import produce from 'immer';
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

const defaultCodeContent = 
`import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
        onClick={() => setCount(count + 1)}
        style={{ padding: 8, fontSize: 20, cursor: 'pointer' }}
      >
        Click
      </button>
      <h1>{count}</h1>
    </div>
  );
};
show(<Counter />);
`;

const defaultTextContent =
`# use show() method to display something on preview window.
- User can import & use any package from npm.js
- Code can be shared from one code editor to another.
- User can run any JS / JSX code inside the code editor
- They can see a preview of JSX in the preview section.
- Text Editor can help to add some helper text.
`;

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[]; // to store id of each cell in a specific order
  data: {
    [key: string]: Cell
  }
};

const initialState: CellsState = {
  loading: false,
  error: null,
  order: ['abc', 'abd'],
  data: {
    'abc': {
      id: 'abc',
      type: 'text',
      content: defaultTextContent,
    },
    'abd': {
      id: 'abd',
      type: 'code',
      content: defaultCodeContent,
    }
  },
}

const reducer = produce((
  state: CellsState = initialState, action: Action
  ) => {
    switch(action.type) {
      case ActionTypes.DELETE_CELL:
        // deleting the data for id
        delete state.data[action.payload];

        // deleting the id from id/order list
        state.order = state.order.filter(id => id !== action.payload)
        return state;
      case ActionTypes.MOVE_CELL:
        const { direction } = action.payload;
        const index = state.order.findIndex((id) => id === action.payload.id);
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if(targetIndex < 0 || targetIndex > state.order.length - 1){
          return state;
        }

        state.order[index] = state.order[targetIndex];
        state.order[targetIndex] = action.payload.id

        return state;
      case ActionTypes.UPDATE_CELL:
        const { id, content } = action.payload;

        // updating the state with immer library
        state.data[id].content = content;
        return state;
        // updating the state without immer library
        // return {
        //   ...state,
        //   data: {
        //     ...state.data,
        //     [id]: {
        //       ...state.data[id],
        //       content,
        //     }
        //   }
        // };
      case ActionTypes.INSERT_CELL_AFTER:
        const cell: Cell = {
          id: randomId(),
          type: action.payload.type,
          content: '',
        }

        state.data[cell.id] = cell;

        const foundIndex = state.order.findIndex(id => id === action.payload.id);
        if(foundIndex < 0) {
          state.order.unshift(cell.id);
        } else {
          state.order.splice(foundIndex + 1, 0, cell.id);
        }

        return state;
      default:
        return state;
    }
    // return state;
}, initialState);

const randomId = () => {
  return Math.random().toString(36).substring(2, 5);
}

export default reducer;