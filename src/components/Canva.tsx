import React, { useEffect, useRef } from 'react';

const useButterfly = (width: number, height: number) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // Redimensionner le canevas
        canvas.width = width;
        canvas.height = height;

        // Fonction pour dessiner un papillon
        function drawButterfly() {
          if (context && canvas) {
            context.save();
            context.translate(canvas.width / 2, canvas.height / 2);

            // Dessin de l'aile droite
            for (let i = -1; i <= 1; i += 2) {
              context.save();
              context.scale(i, 1);

              const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 80);
              gradient.addColorStop(0, 'hsl(220, 80%, 40%)');
              gradient.addColorStop(0.3, 'hsl(220, 80%, ' + (40 + 10) + '%)');
              gradient.addColorStop(0.5, 'hsl(220, 80%, ' + (40 + 20) + '%)');
              gradient.addColorStop(1, 'hsl(220, 80%, ' + (40 + 30) + '%)');
              context.lineWidth = 3;
              context.strokeStyle = 'hsl(220, 80%, 80%)';
              context.fillStyle = gradient;

              // Partie supérieure de l'aile droite
              context.beginPath();
              context.moveTo(-3, 0);
              context.bezierCurveTo(-40, -10, -60, 20, -30, 40);
              context.bezierCurveTo(-20, 50, -10, 50, -3, -5);
              context.closePath();
              context.fill();
              context.stroke();

              // Partie inférieure de l'aile droite
              context.beginPath();
              context.moveTo(-3, -5);
              context.bezierCurveTo(-25, -60, -75, -55, -65, -35);
              context.bezierCurveTo(-55, -10, -65, 5, -3, 0);
              context.closePath();
              context.fill();
              context.stroke();

              context.restore();
            }

            // Corps du papillon
            context.save();
            const gradient = context.createLinearGradient(-3, 0, 3, 0);
            gradient.addColorStop(0, 'hsl(220, 80%, 40%)');
            gradient.addColorStop(0.5, 'hsl(220, 80%, 60%)');
            gradient.addColorStop(1, 'hsl(220, 80%, 40%)');
            context.fillStyle = gradient;
            context.beginPath();
            context.moveTo(0, -10);
            context.arc(0, -10, 3, 0, Math.PI * 2, false);
            context.fill();

            context.beginPath();
            context.moveTo(3, -8);
            context.arc(0, -8, 3, 0, Math.PI, false);
            context.stroke();
            context.arcTo(0, 60, 3, -8, 2);
            context.fill();
            context.restore();
            context.restore();
          }
          
        }

        // Dessiner le papillon sur le canevas
        drawButterfly();
      }
    }
  }, [width, height]);

  return canvasRef;
};

const ButterflyCanvas: React.FC<{ width?: number; height?: number }> = ({ width = 800, height = 600 }) => {
  const canvasRef = useButterfly(width, height);

  return <canvas ref={canvasRef} />;
};

export default ButterflyCanvas;
