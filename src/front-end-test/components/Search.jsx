import PropTypes from "prop-types";

export const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by brand or model..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

Search.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};
