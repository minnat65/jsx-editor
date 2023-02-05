import './text-editor.css';
import { useEffect, useRef, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useActions } from '../hooks/use-action';
import { Cell } from '../state';

interface TextEditorProps {
  cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const { updateCell } = useActions();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        // console.log('Elemnet clicked on is inside MD Editor');
        return;
      }
      setIsEditing(false) 
    };

    window.addEventListener('click', listener, { capture: true });

    return () => {
      window.removeEventListener('click', listener, { capture: true });
    }
  })

  if(isEditing) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor value={cell.content} onChange={(v) => updateCell(cell.id, v || '')}/>
      </div>
    )
  }

  return (
    <div onClick={() => setIsEditing(true)} className='text-editor card'>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to Edit'} />
      </div>
    </div>
  )
};

export default TextEditor;