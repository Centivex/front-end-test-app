import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { Search } from "./Search";

export const ProductList = () => {
  const { products, isLoading } = useFetchProducts();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      product.brand.toLowerCase().trim().includes(term) ||
      product.model.toLowerCase().trim().includes(term)
    );
  });

  if (isLoading)
    return <p className="text-center py-10">Loading products...</p>;

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6">
      <div className="flex justify-end mb-6">
        <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};
