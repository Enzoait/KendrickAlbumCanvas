import React, { useEffect, useRef } from "react";

const useButterfly = (multiplier: number = 1) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Redimensionner le canevas
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Fonction pour dessiner un papillon
        function drawButterfly() {
          if (context && canvas) {
            context.save();
            context.translate(canvas.width / 2, canvas.height / 2);

            // Dessin de l'aile droite
            for (let i = -1; i <= 1; i += 2) {
              context.save();
              context.scale(i, 1);

              const gradient = context.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                multiplier * 80
              );
              gradient.addColorStop(0, "hsl(220, 80%, 40%)");
              gradient.addColorStop(0.3, "hsl(220, 80%, " + (40 + 10) + "%)");
              gradient.addColorStop(0.5, "hsl(220, 80%, " + (40 + 20) + "%)");
              gradient.addColorStop(1, "hsl(220, 80%, " + (40 + 30) + "%)");
              context.lineWidth = multiplier * 3;
              context.strokeStyle = "hsl(220, 80%, 80%)";
              context.fillStyle = gradient;

              // Partie supérieure de l'aile droite
              context.beginPath();
              context.moveTo(multiplier * -3, multiplier * 0);
              context.bezierCurveTo(
                multiplier * -40,
                multiplier * -10,
                multiplier * -60,
                multiplier * 20,
                multiplier * -30,
                multiplier * 40
              );
              context.bezierCurveTo(
                multiplier * -20,
                multiplier * 50,
                multiplier * -10,
                multiplier * 50,
                multiplier * -3,
                multiplier * -5
              );
              context.closePath();
              context.fill();
              context.stroke();

              // Partie inférieure de l'aile droite
              context.beginPath();
              context.moveTo(multiplier * -3, multiplier * -5);
              context.bezierCurveTo(
                multiplier * -25,
                multiplier * -60,
                multiplier * -75,
                multiplier * -55,
                multiplier * -65,
                multiplier * -35
              );
              context.bezierCurveTo(
                multiplier * -55,
                multiplier * -10,
                multiplier * -65,
                multiplier * 5,
                multiplier * -3,
                multiplier * 0
              );
              context.closePath();
              context.fill();
              context.stroke();

              context.restore();
            }

            // Corps du papillon
            context.save();
            const gradient = context.createLinearGradient(-3, 0, 3, 0);
            gradient.addColorStop(0, "hsl(220, 80%, 40%)");
            gradient.addColorStop(0.5, "hsl(220, 80%, 60%)");
            gradient.addColorStop(1, "hsl(220, 80%, 40%)");
            context.fillStyle = gradient;
            context.beginPath();
            context.moveTo(multiplier * 0, multiplier * -10);
            context.arc(
              multiplier * 0,
              multiplier * -10,
              multiplier * 3,
              multiplier * 0,
              Math.PI * 2,
              false
            );
            context.fill();

            context.beginPath();
            context.moveTo(multiplier * 3, multiplier * -8);
            context.arc(
              multiplier * 0,
              multiplier * -8,
              multiplier * 3,
              multiplier * 0,
              Math.PI,
              false
            );
            context.stroke();
            context.arcTo(
              multiplier * 0,
              multiplier * 60,
              multiplier * 3,
              multiplier * -8,
              multiplier * 2
            );
            context.fill();
            context.restore();
            context.restore();
          }
        }

        // Dessiner le papillon sur le canevas
        drawButterfly();
      }
    }
  }, [multiplier]);

  return canvasRef;
};

const ButterflyCanvas: React.FC = () => {
  const canvasRef = useButterfly(3);

  return <canvas ref={canvasRef} className="canvas" />;
};

export default ButterflyCanvas;
