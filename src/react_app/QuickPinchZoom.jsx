import React, { useCallback, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


export default function (props) {
    const imgRef = useRef();
    const onUpdate = useCallback(({ x, y, scale }) => {
      const { current: img } = imgRef;
  
      if (img) {
        const value = make3dTransformValue({ x, y, scale });
  
        img.style.setProperty("transform", value);
      }
    }, []);
  
    return (
      <TransformWrapper
        centerOnInit={true}  
      >
        <TransformComponent 
        wrapperStyle={{height: 'calc(100vh - 56px)'}}>
          <img ref={imgRef} src={props.url} />
        </TransformComponent>
      </TransformWrapper>
    );
  }