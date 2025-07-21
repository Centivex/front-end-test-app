import React from "react";
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
    <ul className="list-disc list-inside space-y-2 text-gray-800 text-lg">
      {brand && (
        <li>
          <strong>Marca:</strong> {brand}
        </li>
      )}
      {model && (
        <li>
          <strong>Modelo:</strong> {model}
        </li>
      )}
      {price && (
        <li>
          <strong>Precio:</strong> {`${price} €`}
        </li>
      )}
      {cpu && (
        <li>
          <strong>CPU:</strong> {cpu}
        </li>
      )}
      {ram && (
        <li>
          <strong>RAM:</strong> {ram}
        </li>
      )}
      {os && (
        <li>
          <strong>Sistema Operativo:</strong> {os}
        </li>
      )}
      {displayResolution && (
        <li>
          <strong>Resolución de pantalla:</strong> {displayResolution}
        </li>
      )}
      {battery && (
        <li>
          <strong>Batería:</strong> {battery}
        </li>
      )}

      {renderedPrimaryCamera && (
        <li>
          <strong>Cámara Principal:</strong>
          <ul className="list-disc list-inside ml-6 mt-1">
            {renderedPrimaryCamera}
          </ul>
        </li>
      )}
      {renderedSecondaryCamera && (
        <li>
          <strong>Cámara Frontal:</strong>
          <ul className="list-disc list-inside ml-6 mt-1">
            {renderedSecondaryCamera}
          </ul>
        </li>
      )}
      {dimentions && (
        <li>
          <strong>Dimensiones:</strong> {dimentions}
        </li>
      )}
      {weight && (
        <li>
          <strong>Peso:</strong> {weight}
        </li>
      )}
    </ul>
  );
};

ProductDetailList.propTypes = {
  detail: PropTypes.object.isRequired,
};
