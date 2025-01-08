import Colorful from "@uiw/react-color-colorful";
import React, { useEffect, useRef, useState } from "react";
import { color as getColor } from "@uiw/color-convert";

const useButterfly = (multiplier: number = 1, randomness: number = 10) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [color, setColor] = useState<string>("#000000");

  useEffect(() => {
    console.log("rerender useButterfly");
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
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();
            context.translate(canvas.width / 2, canvas.height / 2);

            const { rgba } = getColor(color);

            // Dessin de l'aile droite
            for (let i = -1; i <= 1; i += 2) {
              context.save();
              context.scale(i, 1);

              // Créer un masque pour les ailes
              context.beginPath();
              context.moveTo(multiplier * -3, multiplier * 0);
              context.bezierCurveTo(
                multiplier * -40 + Math.random() * randomness - randomness / 2,
                multiplier * -10 + Math.random() * randomness - randomness / 2,
                multiplier * -60 + Math.random() * randomness - randomness / 2,
                multiplier * 20 + Math.random() * randomness - randomness / 2,
                multiplier * -30 + Math.random() * randomness - randomness / 2,
                multiplier * 40 + Math.random() * randomness - randomness / 2
              );
              context.bezierCurveTo(
                multiplier * -20 + Math.random() * randomness - randomness / 2,
                multiplier * 50 + Math.random() * randomness - randomness / 2,
                multiplier * -10 + Math.random() * randomness - randomness / 2,
                multiplier * 50 + Math.random() * randomness - randomness / 2,
                multiplier * -3,
                multiplier * -5
              );
              context.closePath();
              context.clip();

              // Appliquer le motif à l'intérieur du masque
              const patternCanvas = document.createElement("canvas");
              const patternContext = patternCanvas.getContext("2d");
              if (patternContext) {
                patternCanvas.width = 20;
                patternCanvas.height = 20;

                // Dessiner un motif simple (par exemple, des cercles)
                patternContext.fillStyle = "rgba(255, 255, 255, 0.5)";
                patternContext.beginPath();
                patternContext.arc(10, 10, 5, 0, Math.PI * 2, false);
                patternContext.fill();

                const pattern = context.createPattern(patternCanvas, "repeat");
                if (pattern) {
                  context.fillStyle = pattern;
                  context.fill();
                }
              }

              context.restore();
              context.save();
              context.scale(i, 1);

              // Ajouter une ombre interne noire
              context.shadowColor = "rgba(0, 0, 0, 0.5)";
              context.shadowBlur = 10;
              context.shadowOffsetX = 0;
              context.shadowOffsetY = 0;

              const gradient = context.createRadialGradient(
                0,
                0,
                0,
                0,
                0,
                multiplier * 80
              );
              gradient.addColorStop(
                0,
                `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
              );
              gradient.addColorStop(
                0.3,
                `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a * 0.7})`
              );
              gradient.addColorStop(
                0.5,
                `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a * 0.5})`
              );
              gradient.addColorStop(
                1,
                `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a * 0.3})`
              );
              context.lineWidth = multiplier * 3;
              context.strokeStyle = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${
                rgba.a * 0.8
              })`;
              context.fillStyle = gradient;

              // Partie supérieure de l'aile droite
              context.beginPath();
              context.moveTo(multiplier * -3, multiplier * 0);
              context.bezierCurveTo(
                multiplier * -40 + Math.random() * randomness - randomness / 2,
                multiplier * -10 + Math.random() * randomness - randomness / 2,
                multiplier * -60 + Math.random() * randomness - randomness / 2,
                multiplier * 20 + Math.random() * randomness - randomness / 2,
                multiplier * -30 + Math.random() * randomness - randomness / 2,
                multiplier * 40 + Math.random() * randomness - randomness / 2
              );
              context.bezierCurveTo(
                multiplier * -20 + Math.random() * randomness - randomness / 2,
                multiplier * 50 + Math.random() * randomness - randomness / 2,
                multiplier * -10 + Math.random() * randomness - randomness / 2,
                multiplier * 50 + Math.random() * randomness - randomness / 2,
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
                multiplier * -25 + Math.random() * randomness - randomness / 2,
                multiplier * -60 + Math.random() * randomness - randomness / 2,
                multiplier * -75 + Math.random() * randomness - randomness / 2,
                multiplier * -55 + Math.random() * randomness - randomness / 2,
                multiplier * -65 + Math.random() * randomness - randomness / 2,
                multiplier * -35 + Math.random() * randomness - randomness / 2
              );
              context.bezierCurveTo(
                multiplier * -55 + Math.random() * randomness - randomness / 2,
                multiplier * -10 + Math.random() * randomness - randomness / 2,
                multiplier * -65 + Math.random() * randomness - randomness / 2,
                multiplier * 5 + Math.random() * randomness - randomness / 2,
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
            context.fillStyle = "black";
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
  }, [multiplier, color, randomness]);

  return { canvasRef, color, setColor };
};

export const Cover: React.FC = () => {
  const { canvasRef, color, setColor } = useButterfly(3, 20);

  return (
    <>
      <canvas ref={canvasRef} className="canvas" />
      <Colorful
        color={color}
        onChange={(color) => {
          setColor(color.hexa);
        }}
      />
    </>
  );
};
