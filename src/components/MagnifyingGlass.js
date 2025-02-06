import React, { useRef, useState } from "react";

const MagnifyingGlass = ({ imageUrl }) => {
  const imgRef = useRef(null);
  const glassRef = useRef(null);
  const [glassPosition, setGlassPosition] = useState({ top: 0, left: 0 });
  const [glassVisible, setGlassVisible] = useState(false);

  const handleMouseMove = (e) => {
    if (!imgRef.current || !glassRef.current) return;

    const img = imgRef.current;
    const glass = glassRef.current;

    // Get the position of the image
    const rect = img.getBoundingClientRect();

    // Calculate cursor position relative to the image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if the cursor is outside the image
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      setGlassVisible(false);
      return;
    }

    setGlassVisible(true);

    const glassSize = glass.offsetWidth / 2;

    // Set the magnifying glass position
    setGlassPosition({ top: y - glassSize, left: x - glassSize });

    // Zoom the image
    const zoomLevel = 2; // Adjust the zoom level
    const bgX = -((x * zoomLevel) - glassSize);
    const bgY = -((y * zoomLevel) - glassSize);

    glass.style.backgroundPosition = `${bgX}px ${bgY}px`;
    glass.style.backgroundSize = `${img.width * zoomLevel}px ${img.height * zoomLevel}px`;
  };

  const handleMouseLeave = () => {
    setGlassVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* The Main Image */}
      <img
        src={imageUrl}
        alt="Magnified"
        ref={imgRef}
        className="w-[80%] rounded-lg"
      />

      {/* The Magnifying Glass */}
      {glassVisible && (
        <div
          ref={glassRef}
          className="absolute rounded-full border border-gray-400"
          style={{
            width: "150px",
            height: "150px",
            pointerEvents: "none",
            position: "absolute",
            top: `${glassPosition.top}px`,
            left: `${glassPosition.left}px`,
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "transparent",
          }}
        />
      )}
    </div>
  );
};

export default MagnifyingGlass;
