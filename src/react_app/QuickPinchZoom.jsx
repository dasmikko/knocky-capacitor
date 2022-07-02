import React, { useCallback, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


export default function (props) {
    const imgRef = useRef();

    function onZoomEvent (data) {
      console.log(data)
    };

    console.log('FUCK')
  
    return (
      <TransformWrapper
        centerOnInit={true}
        maxScale={4}
        panning={{
          disabled: false
        }}
        onPinchEnd={(data) => onZoomEvent()}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (

          <TransformComponent 
          wrapperStyle={{height: 'calc(100vh - 56px)'}}>
            <img ref={imgRef} src={props.url} />
          </TransformComponent>
        )}
      </TransformWrapper>
    );
  }