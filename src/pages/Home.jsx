import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const filterByCategory = (category) => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const result = products.filter(p => p.category === category);
      setFilteredProducts(result);
    }
  };

  const goToCartPage = () => {
    navigate('/cart', { state: { cart } });
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Navbar 
        cartCount={cart.length} 
        onCartClick={goToCartPage} 
        onFilterChange={filterByCategory}
      />

      <div className="home-container">
        <div className="category-filters">
          <button className="category-btn" onClick={() => filterByCategory('all')}>All</button>
          <button className="category-btn" onClick={() => filterByCategory("men's clothing")}>Men's Clothing</button>
          <button className="category-btn" onClick={() => filterByCategory("women's clothing")}>Women's Clothing</button>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.title} className="product-image" />
                <div className="product-info">
                  <h4 className="product-title">{product.title}</h4>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-description">{product.description.slice(0, 60)}...</p>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">No products found in this category</div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;