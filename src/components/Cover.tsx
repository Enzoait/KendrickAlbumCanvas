import Colorful from "@uiw/react-color-colorful";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { color as getColor } from "@uiw/color-convert";

type ColorKey = "wingStart" | "wingEnd" | "body" | "border";

const useButterfly = (
  multiplier: number = 1,
  initial_randomness: number = 10
) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  const [colorRandomness, setColorRandomness] = useState<boolean>(false);
  const [randomness, setRandomness] = useState<number>(initial_randomness);
  const [colors, setColors] = useState<Record<ColorKey, string>>({
    wingStart: "#ffe900ff",
    wingEnd: "#00ff8881",
    body: "#2c2c2cff",
    border: "#00ff612d",
  });
  const [dimensions, setDimensions] = useState<number[]>([]);

  const resize = useCallback(
    () =>
      setDimensions(
        Array.from({ length: 40 }, () =>
          Math.floor(Math.random() * randomness - randomness / 2)
        )
      ),
    [randomness]
  );

  // Calculate butterfly dimensions whenever randomness changes
  useEffect(() => resize(), [resize]);

  const calculateBackgroundColor = useCallback(() => {
    const wingStartColor = getColor(colors.wingStart).rgba;
    const wingEndColor = getColor(colors.wingEnd).rgba;
    const bodyColor = getColor(colors.body).rgba;
    const borderColor = getColor(colors.border).rgba;

    const avgColor = {
      r: Math.round(
        (wingStartColor.r + wingEndColor.r + bodyColor.r + borderColor.r) / 4
      ),
      g: Math.round(
        (wingStartColor.g + wingEndColor.g + bodyColor.g + borderColor.g) / 4
      ),
      b: Math.round(
        (wingStartColor.b + wingEndColor.b + bodyColor.b + borderColor.b) / 4
      ),
      a: Math.round(
        (wingStartColor.a + wingEndColor.a + bodyColor.a + borderColor.a) / 4
      ),
    };

    // Calculate the complementary color
    const complementaryColor = {
      r: 255 - avgColor.r,
      g: 255 - avgColor.g,
      b: 255 - avgColor.b,
      a: avgColor.a,
    };

    return `rgba(${complementaryColor.r}, ${complementaryColor.g}, ${complementaryColor.b}, ${complementaryColor.a})`;
  }, [colors]);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Resize the canvas
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Function to draw a butterfly
        function drawButterfly() {
          if (context && canvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();
            context.translate(canvas.width / 2, canvas.height / 2);

            const wingStartColor = getColor(colors.wingStart).rgba;
            const wingEndColor = getColor(colors.wingEnd).rgba;
            const bodyColor = getColor(colors.body).rgba;
            const borderColor = colors.border;

            // Set background color
            context.fillStyle = calculateBackgroundColor();
            context.fillRect(
              -canvas.width / 2,
              -canvas.height / 2,
              canvas.width,
              canvas.height
            );

            // Draw the wings
            for (let i = 1; i <= 2; i++) {
              context.save();
              context.scale(i === 1 ? -1 : 1, 1);

              // Create gradient for the wings
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
                `rgba(${wingStartColor.r}, ${wingStartColor.g}, ${wingStartColor.b}, ${wingStartColor.a})`
              );
              gradient.addColorStop(
                1,
                `rgba(${wingEndColor.r}, ${wingEndColor.g}, ${wingEndColor.b}, ${wingEndColor.a})`
              );

              context.lineWidth = multiplier * 3;
              context.strokeStyle = borderColor;
              context.fillStyle = gradient;

              // Upper part of the wing
              context.beginPath();
              context.moveTo(multiplier * -3, multiplier * 0);
              context.bezierCurveTo(
                multiplier * -40 + dimensions[0 + (i - 1) * 20],
                multiplier * -10 + dimensions[1 + (i - 1) * 20],
                multiplier * -60 + dimensions[2 + (i - 1) * 20],
                multiplier * 20 + dimensions[3 + (i - 1) * 20],
                multiplier * -30 + dimensions[4 + (i - 1) * 20],
                multiplier * 40 + dimensions[5 + (i - 1) * 20]
              );
              context.bezierCurveTo(
                multiplier * -20 + dimensions[6 + (i - 1) * 20],
                multiplier * 50 + dimensions[7 + (i - 1) * 20],
                multiplier * -10 + dimensions[8 + (i - 1) * 20],
                multiplier * 50 + dimensions[9 + (i - 1) * 20],
                multiplier * -3,
                multiplier * -5
              );
              context.closePath();
              context.fill();
              context.stroke();

              // Lower part of the wing
              context.beginPath();
              context.moveTo(multiplier * -3, multiplier * -5);
              context.bezierCurveTo(
                multiplier * -25 + dimensions[10 + (i - 1) * 20],
                multiplier * -60 + dimensions[11 + (i - 1) * 20],
                multiplier * -75 + dimensions[12 + (i - 1) * 20],
                multiplier * -55 + dimensions[13 + (i - 1) * 20],
                multiplier * -65 + dimensions[14 + (i - 1) * 20],
                multiplier * -35 + dimensions[15 + (i - 1) * 20]
              );
              context.bezierCurveTo(
                multiplier * -55 + dimensions[16 + (i - 1) * 20],
                multiplier * -10 + dimensions[17 + (i - 1) * 20],
                multiplier * -65 + dimensions[18 + (i - 1) * 20],
                multiplier * 5 + dimensions[19 + (i - 1) * 20],
                multiplier * -3,
                multiplier * 0
              );
              context.closePath();
              context.fill();
              context.stroke();

              context.restore();
            }

            // Draw the antennas first
            context.save();
            context.strokeStyle = `rgba(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b}, ${bodyColor.a})`;
            context.beginPath();
            context.moveTo(multiplier * -1, multiplier * -10);
            context.quadraticCurveTo(
              multiplier * -5,
              multiplier * -20,
              multiplier * -10,
              multiplier * -15
            );
            context.moveTo(multiplier * 1, multiplier * -10);
            context.quadraticCurveTo(
              multiplier * 5,
              multiplier * -20,
              multiplier * 10,
              multiplier * -15
            );
            context.stroke();
            context.restore();

            // Body of the butterfly
            context.save();
            context.fillStyle = `rgba(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b}, ${bodyColor.a})`;
            context.beginPath();
            context.moveTo(multiplier * 0, multiplier * -10);
            context.arc(
              multiplier * 0,
              multiplier * -10,
              multiplier * 3,
              0,
              Math.PI * 2,
              false
            );
            context.fill();

            context.beginPath();
            context.moveTo(multiplier * 3, multiplier * -10);
            context.arc(
              multiplier * 0,
              multiplier * -10,
              multiplier * 3,
              0,
              Math.PI,
              false
            );
            context.arcTo(
              multiplier * 0,
              multiplier * 60,
              multiplier * 3,
              multiplier * -10,
              multiplier * 2
            );
            context.fill();
            context.restore();
            context.restore();
          }
        }

        // Draw the butterfly on the canvas
        drawButterfly();
      }
    }
  }, [multiplier, colors, dimensions, calculateBackgroundColor]);

  return {
    ref,
    colors,
    setColors,
    randomness,
    setRandomness,
    resize,
    colorRandomness,
    setColorRandomness,
  };
};
export const Cover: React.FC = () => {
  const {
    ref,
    colors,
    setColors,
    randomness,
    setRandomness,
    resize,
    colorRandomness,
    setColorRandomness,
  } = useButterfly(3, 20);
  const [selectedColor, setSelectedColor] = useState<ColorKey>("wingStart");
  const [charity, setCharity] = useState<boolean>(false);

  const logColors = () => {
    console.log("Current Colors:", colors);
  };

  return (
    <div className="flex flex-col items-center bg-black text-white min-h-screen p-4">
      <div className="flex w-full max-w-4xl">
        <canvas ref={ref} className="canvas w-1/2 bg-gray-800" />
        <div className="w-1/2 pl-4">
          <div className="mt-4">
            <label className="block mb-2">Randomize Colors:</label>
            <input
              type="checkbox"
              checked={colorRandomness}
              onChange={(e) => setColorRandomness(e.target.checked)}
              className="form-checkbox text-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Select Color to Modify:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value as ColorKey)}
              className="mb-4 p-2 border rounded w-full bg-gray-800 text-white"
            >
              <option value="wingStart">Wing Start</option>
              <option value="wingEnd">Wing End</option>
              <option value="body">Body</option>
              <option value="border">Border</option>
            </select>
            <Colorful
              color={colors[selectedColor]}
              onChange={(color) => {
                setColors((prevColors) => ({
                  ...prevColors,
                  [selectedColor]: color.hexa,
                }));
              }}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2">Randomness:</label>
            <input
              type="range"
              min="1"
              max="100"
              value={randomness}
              onChange={(e) => setRandomness(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            onClick={resize}
            className="mt-4 p-2 bg-blue-500 text-white rounded w-full"
          >
            Change Dimensions
          </button>
          <button
            onClick={logColors}
            className="mt-4 p-2 bg-gray-500 text-white rounded w-full"
          >
            Log Colors
          </button>
        </div>
      </div>
      <div className="mt-4 w-full max-w-4xl">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={charity}
            onChange={(e) => setCharity(e.target.checked)}
            className="form-checkbox text-blue-500"
          />
          <span className="ml-2">
            Participate in financing a charitable offer
          </span>
        </label>
      </div>
      <button className="mt-4 p-2 bg-green-500 text-white rounded">
        Buy Now
      </button>
    </div>
  );
};
