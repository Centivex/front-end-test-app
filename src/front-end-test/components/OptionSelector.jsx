import PropTypes from "prop-types";

export const OptionSelector = ({ label, options, selected, onSelect }) => {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options?.map((option) => (
          <button
            key={option.code}
            onClick={() => onSelect(option.code)}
            className={`px-4 py-2 rounded border text-sm ${
              selected === option.code
                ? "border-blue-600 bg-blue-100"
                : "border-gray-300 bg-white"
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

OptionSelector.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};