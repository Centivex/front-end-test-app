import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ProductCard = ({ id, brand, model, price, imgUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/list/${id}`, { state: { model } });
  };

  return (
    <button
      className="bg-white shadow rounded p-6 text-center w-full text-left cursor-pointer hover:shadow-lg transition"
      onClick={handleClick}
    >
      <img src={imgUrl} alt={imgUrl} />
      <h2 className="text-lg font-semibold text-gray-800">{brand}</h2>
      <h2 className="text-lg font-semibold text-gray-800">{model}</h2>
      <h2 className="text-lg font-semibold text-gray-800">{price? price+'€':'No disponible'}</h2>
    </button>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  imgUrl: PropTypes.string.isRequired,
};