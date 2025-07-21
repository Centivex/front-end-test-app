import React from "react";
import PropTypes from "prop-types";

export const ErrorScreen = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] space-y-5 px-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        ¡Vaya! Ocurrió un problema
      </h2>
      <p className="text-gray-600 text-lg max-w-md">
        {message}
      </p>
      {onRetry && (
        <button
          data-testid="retry-button"
          onClick={onRetry}
          className="px-6 py-2 bg-yellow-500 text-black font-medium rounded hover:bg-yellow-600 transition"
        >
          Reintentar
        </button>
      )}
    </div>
  );
};

ErrorScreen.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};

