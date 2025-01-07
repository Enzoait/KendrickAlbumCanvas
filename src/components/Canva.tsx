import React, { useEffect, useRef, useState } from 'react';
import { Pane } from 'tweakpane';
import 'destyle.css';

const GridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gridSize, setGridSize] = useState(10);

  // Fonction pour dessiner la grille
  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number, gridSize: number) => {
    ctx.fillStyle = 'rgb(169, 68, 21)';
    ctx.clearRect(0, 0, width, height);
    ctx.fillRect(0, 0, width, height);

    const rectWidth = Math.floor((width / gridSize) * 1.5);
    const rectHeight = Math.floor(height / gridSize);

    const totalWidth = rectWidth * gridSize;
    const totalHeight = rectHeight * gridSize;

    const offsetX = (width - totalWidth) / 2;
    const offsetY = (height - totalHeight) / 2;

    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const x = Math.floor(offsetX + i * rectWidth);
        const y = Math.floor(offsetY + j * rectHeight);
        drawRectangle(ctx, x, y, rectWidth, rectHeight);
      }
    }
  };

  // Fonction pour dessiner un rectangle
  const drawRectangle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const gradient = ctx.createLinearGradient(x, y, x, y + height / 2);
    gradient.addColorStop(0, 'rgba(117, 33, 7, 0.6)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = 'rgb(227, 78, 28)';
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = gradient;
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.clientWidth * 2;
    const height = canvas.clientHeight * 2;

    canvas.width = width;
    canvas.height = height;

    if (ctx) {
      drawGrid(ctx, width, height, gridSize);
    }

    // Initializing Tweakpane
    const pane = new Pane();
    pane.addBinding({ GRID_SIZE: gridSize }, 'GRID_SIZE', {
      min: 6,
      max: 10,
      step: 1,
    }).on('change', (ev) => setGridSize(ev.value));
  }, [gridSize]);

  return (
    <div className="grid-canvas-container">
      <canvas ref={canvasRef} id="canvas" className="canvas" />
    </div>
  );
};

export default GridCanvas;