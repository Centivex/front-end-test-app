import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ProductDetailList = ({ detail }) => {
  const {
    brand,
    model,
    price,
    cpu,
    ram,
    os,
    displayResolution,
    battery,
    primaryCamera,
    secondaryCmera,
    dimentions,
    weight,
  } = detail;

  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const [height, setHeight] = useState('0px'); 

  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      if (scrollHeight > 300) {
        setNeedsExpansion(true);
        setHeight("300px");
      } else {
        setNeedsExpansion(false);
        setHeight("auto");
      }
    }
  }, [detail]);

  useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("300px");
    }
  }, [isExpanded]);

  const renderCamera = (camData) => {
    if (!camData) return null;

    if (Array.isArray(camData)) {
      const validCams = camData.filter((cam) => cam.trim() !== "");
      if (validCams.length === 0) return null;
      return validCams.map((cam, index) => <li key={index}>{cam}</li>);
    }

    if (typeof camData === "string" && camData.trim() !== "") {
      return <li>{camData}</li>;
    }

    return null;
  };

  const renderedPrimaryCamera = renderCamera(primaryCamera);
  const renderedSecondaryCamera = renderCamera(secondaryCmera);

  return (
    <div className="relative">
      <ul
        ref={contentRef}
        style={{
          height: height,
          overflow: "hidden",
          transition: "height 0.5s ease",
        }}
        className="list-disc list-inside space-y-2 text-gray-800 text-lg"
      >
        {brand && <li><strong>Marca:</strong> {brand}</li>}
        {model && <li><strong>Modelo:</strong> {model}</li>}
        {price && <li><strong>Precio:</strong> {`${price} €`}</li>}
        {cpu && <li><strong>CPU:</strong> {cpu}</li>}
        {ram && <li><strong>RAM:</strong> {ram}</li>}
        {os && <li><strong>Sistema Operativo:</strong> {os}</li>}
        {displayResolution && <li><strong>Resolución de pantalla:</strong> {displayResolution}</li>}
        {battery && <li><strong>Batería:</strong> {battery}</li>}
        {renderedPrimaryCamera && (
          <li>
            <strong>Cámara Principal:</strong>
            <ul className="list-disc list-inside ml-6 mt-1">{renderedPrimaryCamera}</ul>
          </li>
        )}
        {renderedSecondaryCamera && (
          <li>
            <strong>Cámara Frontal:</strong>
            <ul className="list-disc list-inside ml-6 mt-1">{renderedSecondaryCamera}</ul>
          </li>
        )}
        <li>
          <strong>Dimensiones:</strong>{" "}
          {dimentions?.trim() && dimentions !== "-" ? dimentions : "Sin información"}
        </li>
        <li>
          <strong>Peso:</strong>{" "}
          {weight?.trim() && weight !== "-" ? weight : "Sin información"}
        </li>
      </ul>

      {!isExpanded && needsExpansion && (
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}
      {needsExpansion && (
        <div className="relative z-10 mt-4 pb-4 bg-white text-center">
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-blue-600 hover:underline font-semibold text-base"
            aria-expanded={isExpanded}
          >
            {isExpanded ? "Ver menos" : "Ver más"}
          </button>
        </div>
      )}
    </div>
  );
};

ProductDetailList.propTypes = {
  detail: PropTypes.object.isRequired,
};
