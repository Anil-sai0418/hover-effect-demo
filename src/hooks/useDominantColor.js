import { useEffect, useState } from "react";

export function useDominantColor(imageUrl) {
  const [color, setColor] = useState("rgb(60,60,60)");

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const width = (canvas.width = 20);
      const height = (canvas.height = 20);

      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;

      let r = 0, g = 0, b = 0, count = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      setColor(
        `rgb(${Math.floor(r / count)}, ${Math.floor(
          g / count
        )}, ${Math.floor(b / count)})`
      );
    };
  }, [imageUrl]);

  return color;
}