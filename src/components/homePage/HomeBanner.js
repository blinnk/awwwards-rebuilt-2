import React, { useEffect, useRef } from 'react';

import { Banner, Video, Canvas, BannerTitle, Headline } from '../../styles/homeStyles';

//Context
import { useGlobalStateContext } from '../../context/globalContext';

//Custom Hook
import useWindowSize from '../../hooks/useWindowSize';

const HomeBanner = ({ onCursor }) => {
  const size = useWindowSize();
  let canvas = useRef(null);
  const { currentTheme } = useGlobalStateContext();

  useEffect(() => {
    let renderingElement = canvas.current;
    let drawingElement = renderingElement.cloneNode();

    let drawingCtx = drawingElement.getContext('2d');
    let renderingCtx = renderingElement.getContext('2d');

    let lastX;
    let lastY;

    let moving = false;

    renderingCtx.globalCompositeOperation = 'source-over';
    renderingCtx.fillStyle = currentTheme === 'dark' ? '#000000' : '#ffffff';
    renderingCtx.fillRect(0, 0, size.width, size.height);

    renderingElement.addEventListener('mouseover', e => {
      moving = true;
      lastX = e.pageX - renderingElement.offsetLeft;
      lastY = e.pageY - renderingElement.offsetTop;
    });

    renderingElement.addEventListener('mouseup', e => {
      moving = false;
      lastX = e.pageX - renderingElement.offsetLeft;
      lastY = e.pageY - renderingElement.offsetTop;
    });

    renderingElement.addEventListener('mousemove', e => {
      if (moving) {
        drawingCtx.globalCompositeOperation = 'source-over';
        renderingCtx.globalCompositeOperation = 'destination-out';
        let currentX = e.pageX - renderingElement.offsetLeft;
        let currentY = e.pageY - renderingElement.offsetTop;
        drawingCtx.lineJoin = 'round';
        drawingCtx.moveTo(lastX, lastY);
        drawingCtx.lineTo(currentX, currentY);
        drawingCtx.closePath();
        drawingCtx.lineWidth = 100;
        drawingCtx.stroke();
        lastX = currentX;
        lastY = currentY;
        renderingCtx.drawImage(drawingElement, 0, 0);
      }
    });
  }, [currentTheme]);

  const container = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        staggerChildren: .2,
      },
    },
  };

  const item = {
    initial: { y: 800 },
    animate: {
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  return (
    <Banner>
      <Video>
        <video
          height='100%'
          width='100%'
          loop
          autoPlay
          muted
          src={require('../../assets/video/video.mp4')}
        />
      </Video>
      <Canvas
        height={size.height}
        width={size.width}
        ref={canvas}
        onMouseEnter={() => onCursor('hovered')}
        onMouseLeave={onCursor}
      />
      <BannerTitle variants={container} initial='initial' animate='animate'>
        <Headline variants={item}>DIG</Headline>
        <Headline variants={item}>DEEP</Headline>
      </BannerTitle>
    </Banner>
  );
};

export default HomeBanner;
