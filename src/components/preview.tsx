import { useEffect, useRef } from "react";
import './preview.css';

interface PreviewProps {
  code: string;
  isErrorInBundling: string;
};

const html = `
    <html>
      <head>
        <style> html { background-color: white }</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
            throw err
          }

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error)
          })

          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch(err) {
              handleError(err);
            }
          }, false)
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, isErrorInBundling }) => {
  const iframe = useRef<any>();
  // console.log('preview..', code);
  
  // console.log(isErrorInBundling);
  
  useEffect(() => {
    // resetting the iframe before bundling & transpiling new code
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*')
    }, 50)
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe} 
        sandbox='allow-scripts' 
        srcDoc={html} 
        title="preview_window" 
      />
      {isErrorInBundling && <div className="preview-error">{isErrorInBundling}</div>}
    </div>
  );
}

export default Preview;