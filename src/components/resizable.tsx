import React, { useEffect, useState } from "react";
import './resizable.css';
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.65);
  let resizableBoxProps: ResizableBoxProps;
  console.log('height: ', innerHeight);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if(window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 100)
    }

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    }
  }, [width]);

  if(direction === 'horizontal') {
    resizableBoxProps = {
      className: 'resize-horizontal',
      width,
      height: Infinity,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        // console.log(data);
        setWidth(data.size.width);
      }
    }
  } else {
    resizableBoxProps = {
      width: Infinity,
      height: 350,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 34],
    }
  }
  return (
    <ResizableBox {...resizableBoxProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;