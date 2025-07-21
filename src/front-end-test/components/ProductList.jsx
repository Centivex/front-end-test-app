import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { useFetchProducts } from "../hooks/useFetchProducts";
import { Search } from "./Search";
import { ErrorScreen } from "./ErrorScreen";
import { SkeletonCard } from "./SkeletonCard";

export const ProductList = () => {
  const { products, isLoading, error } = useFetchProducts();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTermFromUrl = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);

  useEffect(() => {
    setSearchTerm(searchTermFromUrl);
  }, [searchTermFromUrl]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (term) {
      setSearchParams({ search: term });
    } else {
      setSearchParams({});
    }
  };

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase().trim();
    return (
      product.brand.toLowerCase().trim().includes(term) ||
      product.model.toLowerCase().trim().includes(term)
    );
  });

  if (isLoading)
    return (
      <div className="w-full max-w-screen-xl mx-auto p-6">
        <div className="flex justify-end mb-6">
          <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <ErrorScreen
        message={error}
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <div className="w-full max-w-screen-xl mx-auto p-6">
      <div className="flex justify-end mb-6">
        <Search searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-700 py-10 text-lg font-semibold">
          No se han encontrado marcas o modelos con estas características
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};
