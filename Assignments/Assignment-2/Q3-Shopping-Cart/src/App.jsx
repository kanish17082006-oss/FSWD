
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  function addToCart(p) {
    setCart(old => {
      const item = old.find(i => i.id === p.id);

      return item
        ? old.map(i =>
            i.id === p.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...old, { ...p, qty: 1 }];
    });
  }

  function changeQty(id, amount) {
    setCart(old =>
      old
        .map(i => i.id === id ? { ...i, qty: i.qty + amount } : i)
        .filter(i => i.qty > 0)
    );
  }

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty, 0
  );

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Shopping Cart</h1>

      <h2>Products</h2>
      {products.map(p => (
        <div key={p.id} style={{ marginBottom: "12px" }}>
          <b>{p.title}</b> - ${p.price.toFixed(2)}{" "}
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}

      <hr />
      <h2>My Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map(i => (
        <div key={i.id} style={{ marginBottom: "12px" }}>
          {i.title} - ${(i.price * i.qty).toFixed(2)}{" "}
          <button onClick={() => changeQty(i.id, -1)}>-</button>{" "}
          {i.qty}{" "}
          <button onClick={() => changeQty(i.id, 1)}>+</button>{" "}
          <button onClick={() =>
            setCart(old => old.filter(x => x.id !== i.id))
          }>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>
    </div>
  );
}
