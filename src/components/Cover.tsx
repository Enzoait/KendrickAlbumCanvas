import Colorful from "@uiw/react-color-colorful";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { color as getColor } from "@uiw/color-convert";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useDebounce } from "../hooks/useDebounce";

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

  const debounced_randomness = useDebounce(randomness, 100);
  const debounced_colors = useDebounce(colors, 100);
  const debounced_dimensions = useDebounce(dimensions, 100);

  const resize = useCallback(
    () =>
      setDimensions(
        Array.from({ length: 40 }, () =>
          Math.floor(
            Math.random() * debounced_randomness - debounced_randomness / 2
          )
        )
      ),
    [debounced_randomness]
  );

  // Calculate butterfly dimensions whenever randomness changes
  useEffect(() => resize(), [resize]);

  const calculateBackgroundColor = useCallback(() => {
    const wingStartColor = getColor(debounced_colors.wingStart).rgba;
    const wingEndColor = getColor(debounced_colors.wingEnd).rgba;
    const bodyColor = getColor(debounced_colors.body).rgba;
    const borderColor = getColor(debounced_colors.border).rgba;

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
    };

    // Calculate the complementary color
    const complementaryColor = {
      r: 255 - avgColor.r,
      g: 255 - avgColor.g,
      b: 255 - avgColor.b,
      a: 1,
    };

    return `rgba(${complementaryColor.r}, ${complementaryColor.g}, ${complementaryColor.b}, ${complementaryColor.a})`;
  }, [debounced_colors]);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Resize the canvas
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Create an offscreen canvas
        const offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height;
        const offscreenContext = offscreenCanvas.getContext("2d");

        function draw() {
          if (offscreenContext && canvas) {
            function background() {
              if (offscreenContext && canvas) {
                offscreenContext.clearRect(0, 0, canvas.width, canvas.height);

                // Set background color
                offscreenContext.fillStyle = calculateBackgroundColor();
                offscreenContext.fillRect(0, 0, canvas.width, canvas.height);
              }
            }

            // Load background image
            const backgroundImage = new Image();
            backgroundImage.src = "./chains.jpg"; // Replace with your image path
            backgroundImage.onload = () => {
              // Draw background image with blending
              background();
              offscreenContext.globalCompositeOperation = "overlay"; // Change blending mode to overlay
              offscreenContext.drawImage(
                backgroundImage,
                0,
                0,
                canvas.width,
                canvas.height
              );
              offscreenContext.globalCompositeOperation = "source-over";
              // Draw the butterfly after the background image
              butterfly();
            };
            backgroundImage.onerror = (e) => {
              console.log("Could not find background image:", e);
              // Draw the butterfly even if the background image is not found
              background();
              butterfly();
            };
          }
        }

        function butterfly() {
          if (!offscreenContext || !canvas || !context) return;

          offscreenContext.save();
          offscreenContext.translate(canvas.width / 2, canvas.height / 2);
          offscreenContext.rotate(-Math.PI / 18); // Rotate 10 degrees to the left

          const wingStartColor = getColor(debounced_colors.wingStart).rgba;
          const wingEndColor = getColor(debounced_colors.wingEnd).rgba;
          const bodyColor = getColor(debounced_colors.body).rgba;
          const borderColor = debounced_colors.border;

          // Draw the wings
          for (let i = 1; i <= 2; i++) {
            offscreenContext.save();
            offscreenContext.scale(i === 1 ? -1 : 1, 1);

            // Create gradient for the wings
            const gradient = offscreenContext.createRadialGradient(
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

            offscreenContext.lineWidth = multiplier * 3;
            offscreenContext.strokeStyle = borderColor;
            offscreenContext.fillStyle = gradient;

            // Upper part of the wing
            offscreenContext.beginPath();
            offscreenContext.moveTo(multiplier * -3, multiplier * 0);
            offscreenContext.bezierCurveTo(
              multiplier * -40 + debounced_dimensions[0 + (i - 1) * 20],
              multiplier * -10 + debounced_dimensions[1 + (i - 1) * 20],
              multiplier * -60 + debounced_dimensions[2 + (i - 1) * 20],
              multiplier * 20 + debounced_dimensions[3 + (i - 1) * 20],
              multiplier * -30 + debounced_dimensions[4 + (i - 1) * 20],
              multiplier * 40 + debounced_dimensions[5 + (i - 1) * 20]
            );
            offscreenContext.bezierCurveTo(
              multiplier * -20 + debounced_dimensions[6 + (i - 1) * 20],
              multiplier * 50 + debounced_dimensions[7 + (i - 1) * 20],
              multiplier * -10 + debounced_dimensions[8 + (i - 1) * 20],
              multiplier * 50 + debounced_dimensions[9 + (i - 1) * 20],
              multiplier * -3,
              multiplier * -5
            );
            offscreenContext.closePath();
            offscreenContext.fill();
            offscreenContext.stroke();

            // Lower part of the wing
            offscreenContext.beginPath();
            offscreenContext.moveTo(multiplier * -3, multiplier * -5);
            offscreenContext.bezierCurveTo(
              multiplier * -25 + debounced_dimensions[10 + (i - 1) * 20],
              multiplier * -60 + debounced_dimensions[11 + (i - 1) * 20],
              multiplier * -75 + debounced_dimensions[12 + (i - 1) * 20],
              multiplier * -55 + debounced_dimensions[13 + (i - 1) * 20],
              multiplier * -65 + debounced_dimensions[14 + (i - 1) * 20],
              multiplier * -35 + debounced_dimensions[15 + (i - 1) * 20]
            );
            offscreenContext.bezierCurveTo(
              multiplier * -55 + debounced_dimensions[16 + (i - 1) * 20],
              multiplier * -10 + debounced_dimensions[17 + (i - 1) * 20],
              multiplier * -65 + debounced_dimensions[18 + (i - 1) * 20],
              multiplier * 5 + debounced_dimensions[19 + (i - 1) * 20],
              multiplier * -3,
              multiplier * 0
            );
            offscreenContext.closePath();
            offscreenContext.fill();
            offscreenContext.stroke();

            offscreenContext.restore();
          }

          // Draw the antennas first
          offscreenContext.save();
          offscreenContext.strokeStyle = `rgba(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b}, ${bodyColor.a})`;
          offscreenContext.beginPath();
          offscreenContext.moveTo(multiplier * -1, multiplier * -10);
          offscreenContext.quadraticCurveTo(
            multiplier * -5,
            multiplier * -20,
            multiplier * -10,
            multiplier * -15
          );
          offscreenContext.moveTo(multiplier * 1, multiplier * -10);
          offscreenContext.quadraticCurveTo(
            multiplier * 5,
            multiplier * -20,
            multiplier * 10,
            multiplier * -15
          );
          offscreenContext.stroke();
          offscreenContext.restore();

          // Body of the butterfly
          offscreenContext.save();
          offscreenContext.fillStyle = `rgba(${bodyColor.r}, ${bodyColor.g}, ${bodyColor.b}, ${bodyColor.a})`;
          offscreenContext.beginPath();
          offscreenContext.moveTo(multiplier * 0, multiplier * -10);
          offscreenContext.arc(
            multiplier * 0,
            multiplier * -10,
            multiplier * 3,
            0,
            Math.PI * 2,
            false
          );
          offscreenContext.fill();

          offscreenContext.beginPath();
          offscreenContext.moveTo(multiplier * 3, multiplier * -10);
          offscreenContext.arc(
            multiplier * 0,
            multiplier * -10,
            multiplier * 3,
            0,
            Math.PI,
            false
          );
          offscreenContext.arcTo(
            multiplier * 0,
            multiplier * 60,
            multiplier * 3,
            multiplier * -10,
            multiplier * 2
          );
          offscreenContext.fill();
          offscreenContext.restore();
          offscreenContext.restore();

          // Draw text
          drawText();

          // Copy the offscreen canvas to the main canvas
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(offscreenCanvas, 0, 0);
        }

        function drawText() {
          if (!offscreenContext || !canvas) return;

          offscreenContext.save();
          offscreenContext.font = "30px StreetBomber"; // Change font here
          offscreenContext.fillStyle = "black";
          offscreenContext.textAlign = "center";
          offscreenContext.textBaseline = "bottom";
          offscreenContext.letterSpacing = "4px"; // Add letter spacing

          // Draw "Kendrick Lamar" horizontally at the bottom
          offscreenContext.fillText(
            "Butterfly",
            canvas.width / 2,
            canvas.height - 10
          );
          offscreenContext.restore();
        }

        draw();
      }
    }
  }, [
    multiplier,
    debounced_colors,
    debounced_dimensions,
    calculateBackgroundColor,
  ]);

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
  const { ref, colors, setColors, randomness, setRandomness, resize } =
    useButterfly(3, 20);
  const [selectedColor, setSelectedColor] = useState<ColorKey>("wingStart");
  const [charity, setCharity] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center text-white min-h-screen p-10 gap-10">
      <div className="flex flex-col md:flex-row gap-8 w-full md:w-2/3">
        <canvas ref={ref} className="canvas aspect-square w-full md:w-1/2" />
        <div className="flex flex-col space-y-6 w-full md:w-1/2">
          <div className="flex flex-col gap-4">
            <Label>Couleur a modifier</Label>
            <Select onValueChange={(v) => setSelectedColor(v as ColorKey)}>
              <SelectTrigger className="w-full md:w-1/2">
                <SelectValue placeholder="Couleur à modifier" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Emplacements de couleur</SelectLabel>
                  <SelectItem value="wingStart">Début des ailes</SelectItem>
                  <SelectItem value="wingEnd">Fin des ailes</SelectItem>
                  <SelectItem value="body">Corps du papillon</SelectItem>
                  <SelectItem value="border">Bord des ailes</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Colorful
              className="!w-full"
              color={colors[selectedColor]}
              onChange={(color) => {
                setColors((prevColors) => ({
                  ...prevColors,
                  [selectedColor]: color.hexa,
                }));
              }}
            />
          </div>
          <div className="flex flex-col space-y-6">
            <Label htmlFor="terms">Seuil d'aléatoire</Label>
            <Slider
              value={[randomness]}
              min={1}
              max={100}
              onValueChange={(v) => setRandomness(v[0] || 1)}
            />
          </div>
          <Button onClick={resize}>Change dimensions</Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-full md:w-2/3 items-center justify-between">
        <div className="space-y-8 w-full md:w-1/2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="charity"
              checked={charity}
              onCheckedChange={(v: boolean) => setCharity(v)}
            />
            <Label htmlFor="charity">
              Add €1 to support the "My Brother's Keeper" initiative
            </Label>
          </div>
          <Button variant="success">Order now !</Button>
        </div>
        <div>
          <p className="text-2xl mt-2">
            <strong>Total :</strong>{" "}
            <span className="text-8xl">{charity ? 20.99 : 19.99}</span>€
          </p>
        </div>
      </div>
    </div>
  );
};
