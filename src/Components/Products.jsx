import React, { useEffect, useMemo, useState } from "react";
import "./Products.css";

const ProductItem = ({ item }) => {
  return (
    <div className="product-card">
      <img src={item.image} alt={item.title} className="product-image" />
      <h3 className="product-title">{item.title}</h3>
      <p className="product-price">₹{item.price}</p>
      <div className="product-rating">⭐ {item.rating}</div>
      <p className="product-description">{item.description}</p>
      <div className="product-info">
        <button className="buy-btn">Buy</button>
        <button className="Add-btn">Add</button>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.category && set.add(p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    if (minPrice !== "") {
      const n = Number(minPrice || 0);
      list = list.filter((p) => Number(p.price) >= n);
    }

    if (maxPrice !== "") {
      const n = Number(maxPrice || 0);
      list = list.filter((p) => Number(p.price) <= n);
    }

    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sortBy === "rating-desc") list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, search, category, minPrice, maxPrice, sortBy]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("");
  };

  return (
    <div className="products-container">
      <h2 className="section-heading">iFluids</h2>

      <div className="filters-section">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search products"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option value={c} key={c}>
              {c === "all" ? "All Categories" : c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          min="0"
        />
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          min="0"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort: None</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
        <button onClick={clearFilters} className="clear-btn">
          Clear
        </button>
      </div>

      <div className="products-grid">
        {filtered.length === 0 ? (
          <div className="no-results">No products match your filters.</div>
        ) : (
          filtered.map((p) => <ProductItem key={p.id} item={p} />)
        )}
      </div>
    </div>
  );
};

export default Products;
