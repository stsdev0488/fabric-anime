import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import anime from 'animejs';
import './App.css';

const letter = 'Great Thinkers';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvasObj = new fabric.Canvas(canvasRef.current);
    const textCoordinates = letter.split('').map((str, index) => {
      const subStr = letter.slice(0, index);
      const subStrText = new fabric.Text(subStr, {
        top: 100,
        left: 100,
      });
      return subStrText.getCoords();
    });
    textCoordinates.shift();
    const texts = letter.split('').map((str, index) =>
      new fabric.Text(str, {
        top: index === 0 ? 100 : textCoordinates[index - 1][1].y,
        left: index === 0 ? 100 : textCoordinates[index - 1][1].x,
        fill: '#FFFFFF',
        opacity: 0,
      })
    );
    
    const rect = new fabric.Group(texts);
    canvasObj.add(rect);
    const opacity1 = letter.split('').map((item, index) => ({
      opacity: 0,
      index,
    }));
    let opacity2 = {
      opacity: 1,
    };
    anime.timeline({ loop: true })
      .add({
        targets: opacity1,
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: 2250,
        delay: function(el, i, l) {
          return i * 150;
        },
        update: function() {
          texts.forEach((item, index) => {
            item.set({
              opacity: opacity1[index].opacity,
            });
          });
          canvasObj.renderAll();
        }
      })
      .add({
        targets: opacity2,
        opacity: 0,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 1000,
        update: function() {
          rect.set({
            opacity: opacity2.opacity,
          });
          canvasObj.renderAll();
        }
      });
  }, [])
  return (
    <div className="App">
      <div className="main">
        <canvas ref={canvasRef} width={500} height={400} />
      </div>
    </div>
  );
}

export default App;
