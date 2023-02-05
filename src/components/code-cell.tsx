import { useEffect } from 'react';
import './code-cell.css';
import CodeEditor from './code-editor';
import Preview from './preview';
// import bundle from '../bundler';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-action';
import { useTypedSelector } from '../hooks/use-typed-selectors';
import { useCumulativeCode } from '../hooks/use-cumulative-code';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const [code, setCode] = useState('');
  // const [err, setErr] = useState('');
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id])

  const cummulativeCode = useCumulativeCode(cell.id);

  useEffect(() => {
    if(!bundle) {
      createBundle(cell.id, cummulativeCode);
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cummulativeCode)
      // const output = await bundle(cell.content);
      // setCode(output.code);
      // setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [cummulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value )}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max={100}>
                Loading
              </progress>
            </div>
            ) : (<Preview code={bundle?.code} isErrorInBundling={bundle?.err} />)
          }
         </div>
        {/* {bundle && <Preview code={bundle?.code} isErrorInBundling={bundle?.err} />} */}
      </div>
  </Resizable>
  );
};

export default CodeCell;
