import { useNavigate } from "react-router-dom";

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
      <h2 className="text-lg font-semibold text-gray-800">{price}</h2>
    </button>
  );
};
