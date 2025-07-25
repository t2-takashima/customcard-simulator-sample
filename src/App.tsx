const getCanvasSize = () => {
  const rawBaseWidth = window.innerWidth * 0.9;
  const clampedWidth = Math.min(Math.max(rawBaseWidth, 200), 450);
  return { width: clampedWidth, height: clampedWidth };
};
import React, { useRef, useState, useEffect } from "react";
const canvasContainerStyle: React.CSSProperties = {
  backgroundColor: "#f3f4f6",
  position: "relative" as const,
  overflow: "hidden",
  marginBottom: 16,
  touchAction: "none",
  width: (typeof window !== "undefined" ? getCanvasSize().width : 320) + "px",
  height: (typeof window !== "undefined" ? getCanvasSize().height : 320) + "px",
};
import { brands as categories } from "./config/categories";
// スタイル定義
const styles: Record<string, React.CSSProperties> = {
  button: {
    padding: "8px 16px",
    backgroundColor: "#6b7280",
    color: "white",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
  labelButton: {
    padding: "8px 16px",
    backgroundColor: "#6b7280",
    color: "white",
    borderRadius: "4px",
    display: "inline-block",
    fontSize: "14px",
  },
  container: {
    padding: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  controls: {
    display: "flex",
    gap: 16,
    marginBottom: 16,
    justifyContent: "center",
  },
  rangeGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
};
const CARD_SCALE = 0.9;
const BASE_CARD_SIZE = {
  portrait: { width: 336, height: 534 }, // standard credit card size ratio
  landscape: { width: 534, height: 336 },
};
const getCardSize = (orientation: "portrait" | "landscape", canvasSize: { width: number, height: number }) => {
  const base = BASE_CARD_SIZE[orientation];

  let width = canvasSize.width * CARD_SCALE;
  let height = width * (base.height / base.width);

  if (height > canvasSize.height * CARD_SCALE) {
    height = canvasSize.height * CARD_SCALE;
    width = height * (base.width / base.height);
  }

  return { width, height };
};
const BASE_HEIGHT_MM = 10.5;

const url = new URL(window.location.href);
const queryCategory = url.searchParams.get("category");

const pathSegments = url.pathname.split("/").filter(Boolean);
const pathCategory = pathSegments.length > 1 ? pathSegments[1] : null;

const categoryKey = queryCategory || pathCategory || "sample";
const config = categories[categoryKey] ?? categories["sample"];
const availableOrientations = config.availableOrientations ?? ["portrait"];
const frameImages = config.frameImages;
const backgroundImageUrls = config.backgroundImageUrls;

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
  });
import chipImageLandscape from "./assets/chip_landscape.svg";
import chipImagePortrait from "./assets/chip_portrait.svg";

// シンプルなスタイル付きボタン
const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    style={styles.button}
  />
);

export default function CardSimulator() {
  const [canvasSize, setCanvasSize] = useState(getCanvasSize());
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    availableOrientations.includes("portrait") ? "portrait" : "landscape"
  );
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialDisplaySize, setInitialDisplaySize] = useState({ width: 0, height: 0 });
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);
  const [rotation, setRotation] = useState(0);

  const [backgroundImage, setBackgroundImage] = useState<HTMLImageElement | null>(null);

  const [chipImgLandscape, setChipImgLandscape] = useState<HTMLImageElement | null>(null);
  const [chipImgPortrait, setChipImgPortrait] = useState<HTMLImageElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const pinchDistance = useRef<number | null>(null);
  const initialAngle = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getCanvasSize());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardSize = getCardSize(orientation, canvasSize);
  // Center the card area in the canvas
  const offset = {
    x: (canvasSize.width - cardSize.width) / 2,
    y: (canvasSize.height - cardSize.height) / 2,
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const initialScale = Math.min(
          cardSize.width / img.width,
          cardSize.height / img.height
        ) * 1.1;

        const displayedWidth = img.width * initialScale;
        const displayedHeight = img.height * initialScale;

        setInitialDisplaySize({ width: displayedWidth, height: displayedHeight });
        setScale(1);

        // Center the image within the fixed CANVAS_SIZE canvas
        const centerX = (canvasSize.width - displayedWidth) / 2;
        const centerY = (canvasSize.height - displayedHeight) / 2;
        setPosition({ x: centerX, y: centerY });
        setRotation(0);

        setImage(img);
      };
      if (typeof event.target?.result === "string") {
        img.src = event.target.result;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragStart.current = { x: e.clientX, y: e.clientY };
    setPosition((pos) => ({ x: pos.x + dx, y: pos.y + dy }));
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  // --- Touch event handlers ---
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      pinchDistance.current = Math.hypot(dx, dy);
      initialAngle.current = Math.atan2(dy, dx);
    } else if (e.touches.length === 1) {
      const touch = e.touches[0];
      dragging.current = true;
      dragStart.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchDistance.current !== null && initialAngle.current !== null) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      const newDistance = Math.hypot(dx, dy);
      const newAngle = Math.atan2(dy, dx);

      // スケーリング
      const scaleChange = newDistance / pinchDistance.current;
      const newScale = Math.min(Math.max(scale * scaleChange, 0.5), 3);

      const drawWidth = initialDisplaySize.width * scale;
      const drawHeight = initialDisplaySize.height * scale;
      const newDrawWidth = initialDisplaySize.width * newScale;
      const newDrawHeight = initialDisplaySize.height * newScale;

      const centerX = position.x + drawWidth / 2;
      const centerY = position.y + drawHeight / 2;
      const newX = centerX - newDrawWidth / 2;
      const newY = centerY - newDrawHeight / 2;

      setPosition({ x: newX, y: newY });
      setScale(newScale);
      pinchDistance.current = newDistance;

      // 回転
      const angleChange = newAngle - initialAngle.current;
      setRotation((prev) => prev + angleChange);
      initialAngle.current = newAngle;
    } else if (e.touches.length === 1 && dragging.current) {
      const touch = e.touches[0];
      const dx = touch.clientX - dragStart.current.x;
      const dy = touch.clientY - dragStart.current.y;
      dragStart.current = { x: touch.clientX, y: touch.clientY };
      setPosition((pos) => ({ x: pos.x + dx, y: pos.y + dy }));
    }
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    if (pinchDistance.current !== null) pinchDistance.current = null;
    if (initialAngle.current !== null) initialAngle.current = null;
  };

  const handleScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newScale = parseFloat(e.target.value);
    const prevScale = scale;

    const newWidth = initialDisplaySize.width * newScale;
    const newHeight = initialDisplaySize.height * newScale;
    const oldWidth = initialDisplaySize.width * prevScale;
    const oldHeight = initialDisplaySize.height * prevScale;

    const centerX = position.x + oldWidth / 2;
    const centerY = position.y + oldHeight / 2;

    const newX = centerX - newWidth / 2;
    const newY = centerY - newHeight / 2;

    setPosition({ x: newX, y: newY });
    setScale(newScale);
  };

  const toggleOrientation = () => {
    setOrientation((prev) => {
      const currentIndex = availableOrientations.indexOf(prev);
      const nextIndex = (currentIndex + 1) % availableOrientations.length;
      return availableOrientations[nextIndex];
    });
  };

  // キャンバス描画
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.clip();

    // まず背景色で塗りつぶす
    ctx.fillStyle = "#e5e7eb";
    ctx.fillRect(offset.x, offset.y, cardSize.width, cardSize.height);

    if (backgroundImage && backgroundImage.complete) {
      const aspect = backgroundImage.naturalWidth / backgroundImage.naturalHeight;
      // Always use cardSize.width and cardSize.height to ensure background fits card area
      const targetWidth = cardSize.width;
      const targetHeight = cardSize.height;
      // Compute the maximum size that fits within card area while keeping aspect ratio
      let drawWidth = targetWidth;
      let drawHeight = targetHeight;
      if (targetWidth / aspect < targetHeight) {
        drawHeight = targetWidth / aspect;
        drawWidth = targetWidth;
      } else {
        drawWidth = targetHeight * aspect;
        drawHeight = targetHeight;
      }
      // Align to top-left corner of card area (centered)
      const drawX = offset.x;
      const drawY = offset.y;
      ctx.save();
      ctx.beginPath();
      ctx.rect(offset.x, offset.y, cardSize.width, cardSize.height);
      ctx.clip();
      ctx.drawImage(
        backgroundImage,
        drawX,
        drawY,
        drawWidth,
        drawHeight
      );
      ctx.restore();
    }

    // 画像が正常に読み込まれている場合のみ描画
    if (image && image.complete && image.naturalWidth) {
      const drawWidth = initialDisplaySize.width * scale;
      const drawHeight = initialDisplaySize.height * scale;

      // Draw full image with semi-transparency first
      ctx.save();
      ctx.translate(position.x + drawWidth / 2, position.y + drawHeight / 2);
      ctx.rotate(rotation);
      ctx.globalAlpha = 0.4;
      ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();

      // Draw image clipped to the card area at full opacity
      ctx.save();
      ctx.beginPath();
      ctx.rect(offset.x, offset.y, cardSize.width, cardSize.height);
      ctx.clip();
      ctx.translate(position.x + drawWidth / 2, position.y + drawHeight / 2);
      ctx.rotate(rotation);
      ctx.globalAlpha = 1.0;
      ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
      ctx.restore();
    }

    // フレーム画像を一番上に描画
    if (frameImage) {
      const aspect = frameImage.naturalWidth / frameImage.naturalHeight;
      const targetWidth = cardSize.width;
      const newHeight = targetWidth / aspect;
      const newY = offset.y + cardSize.height - newHeight;
      ctx.drawImage(frameImage, offset.x, newY, targetWidth, newHeight);

      // Draw IC chip (proportional placement) using preloaded images
      const chipImg = orientation === "portrait" ? chipImgPortrait : chipImgLandscape;

      if (chipImg && chipImg.complete) {
        const chipScaleFactor = 2.0;

        const chipNaturalWidth = chipImg.naturalWidth;
        const chipNaturalHeight = chipImg.naturalHeight;
        const aspectRatio = chipNaturalWidth / chipNaturalHeight;

        // Decide chip height based on card height in mm, then use aspect ratio to get width
        const chipHeight = (BASE_HEIGHT_MM / (orientation === "portrait" ? 85.6 : 53.98)) * cardSize.height * chipScaleFactor;
        const chipWidth = chipHeight * aspectRatio;

        const chipX = offset.x + (orientation === "portrait"
          ? ((27 - 6) / 53.98) * cardSize.width
          : ((15 - 8) / 85.6) * cardSize.width);

        const chipY = offset.y + (orientation === "portrait"
          ? ((15 - 8) / 85.6) * cardSize.height
          : ((20 - 7) / 53.98) * cardSize.height);

        ctx.drawImage(chipImg, chipX, chipY, chipWidth, chipHeight);
      }
    }

    ctx.restore();
  }, [orientation, image, scale, position, initialDisplaySize, frameImage, rotation, chipImgLandscape, chipImgPortrait, backgroundImage]);

  // 背景画像プリロード
  // プリロード: フレーム画像と背景画像
  useEffect(() => {
    const load = async () => {
      const frameSrc = frameImages[orientation];
      if (frameSrc) {
        const frame = await loadImage(frameSrc);
        setFrameImage(frame);
      } else {
        setFrameImage(null);
      }

      const bgUrl = backgroundImageUrls[orientation];
      if (bgUrl) {
        const background = await loadImage(bgUrl);
        setBackgroundImage(background);
      } else {
        setBackgroundImage(null);
      }
    };
    load();
  }, [orientation, canvasSize, frameImages, backgroundImageUrls]);

  useEffect(() => {
    loadImage(chipImageLandscape).then(setChipImgLandscape);
    loadImage(chipImagePortrait).then(setChipImgPortrait);
  }, []);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...canvasContainerStyle,
          width: canvasSize.width + "px",
          height: canvasSize.height + "px",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
        <div
          style={{
            position: "absolute",
            top: (canvasSize.height - cardSize.height) / 2,
            left: (canvasSize.width - cardSize.width) / 2,
            width: cardSize.width,
            height: cardSize.height,
            outline: "2px solid red",
            pointerEvents: "none",
          }}
        />
      </div>

      <div style={styles.controls}>
        <label style={{ cursor: "pointer" }}>
          <span style={styles.labelButton}>
            画像を変更
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </label>
        {availableOrientations.length > 1 && (
          <Button onClick={toggleOrientation}>向きを変更</Button>
        )}
      </div>

      <div style={styles.rangeGroup}>
        <div>
          <label>サイズ変更</label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.05"
            value={scale}
            onChange={handleScaleChange}
          />
        </div>
        <div>
          <label>回転</label>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={(rotation * 180) / Math.PI}
            onChange={(e) => {
              const angleDeg = parseFloat(e.target.value);
              setRotation((angleDeg * Math.PI) / 180);
            }}
          />
        </div>
      </div>
    </div>
  );
}