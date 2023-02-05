import React from 'react';
import './action-bar.css';
import { useActions } from '../hooks/use-action';

interface ActionBarsProps {
  id: string
}

const ActionBars: React.FC<ActionBarsProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className='action-bar'>
      <button
        onClick={() => moveCell(id, 'up')}
        className='button is-primary is-small'
      >
        <span className='icon'>
          <i className='fas fa-arrow-up'/>
        </span>
      </button>
      <button
        onClick={() => moveCell(id, 'down')}
        className='button is-primary is-small'
      >
      <span className='icon'>
          <i className='fas fa-arrow-down'/>
        </span>
      </button>
      <button 
        onClick={() => deleteCell(id)}
        className='button is-primary is-small'
      >
      <span className='icon'>
          <i className='fas fa-times'/>
        </span>
      </button>
    </div>
  )
};

export default ActionBars;