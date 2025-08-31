import React, { useState, useEffect } from "react";

function AdminDashboard() {
  // Product form states
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  // States
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // API URLs
  const BASE_URL = "http://localhost:8080/CarAccessories";

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/all`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/product/all`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/order/pending`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await fetch(`${BASE_URL}/admin/user/delete/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchUsers();
        alert("User deleted.");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${BASE_URL}/admin/product/delete/${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchProducts();
        alert("Product deleted.");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleAddProduct = async () => {
    if (!file || !name || !brand || !category || !size || !material || !price || !stockQuantity || !description) {
      alert("Fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("size", size);
    formData.append("material", material);
    formData.append("price", parseFloat(price));
    formData.append("stockQuantity", parseInt(stockQuantity));
    formData.append("description", description);

    try {
      const res = await fetch(`${BASE_URL}/product/upload`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Product added!");
        setName("");
        setBrand("");
        setCategory("");
        setSize("");
        setMaterial("");
        setPrice("");
        setStockQuantity("");
        setDescription("");
        setFile(null);
        fetchProducts();
      } else {
        alert("Product upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const styles = {
    container: {
      display: "flex",
      gap: "2rem",
      backgroundColor: "#1e1e1e",
      color: "#fff",
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: "Segoe UI, sans-serif",
    },
    panel: {
      flex: 1,
      backgroundColor: "#2e2e2e",
      padding: "1rem",
      borderRadius: "8px",
      overflowY: "auto",
      maxHeight: "80vh",
    },
    title: {
      color: "#ffd700",
      marginBottom: "1rem",
      fontSize: "1.4rem",
      borderBottom: "2px solid #ffd700",
      paddingBottom: "0.5rem",
    },
    listItem: {
      backgroundColor: "#3a3a3a",
      marginBottom: "0.5rem",
      padding: "0.7rem 1rem",
      borderRadius: "4px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    input: {
      width: "100%",
      marginBottom: "0.5rem",
      padding: "0.5rem",
      borderRadius: "4px",
      backgroundColor: "#444",
      border: "1px solid #555",
      color: "#fff",
    },
    deleteBtn: {
      backgroundColor: "#c62828",
      color: "white",
      border: "none",
      padding: "0.3rem 0.7rem",
      borderRadius: "3px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    addBtn: {
      backgroundColor: "#ffd700",
      color: "#000",
      border: "none",
      padding: "0.6rem",
      width: "100%",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    formContainer: {
      backgroundColor: "#2a2a2a",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "2rem",
      maxWidth: "600px",
      margin: "0 auto",
    },
  };

  return (
    <div style={{ backgroundColor: "#121212", minHeight: "100vh", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", color: "#ffd700" }}>Admin Dashboard</h1>

      {/* Product Form */}
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Add Product</h2>
        <input style={styles.input} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
        <input style={styles.input} placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <input style={styles.input} placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
        <input style={styles.input} placeholder="Material" value={material} onChange={(e) => setMaterial(e.target.value)} />
        <input style={styles.input} type="number" placeholder="Price (ZAR)" value={price} onChange={(e) => setPrice(e.target.value)} />
        <input style={styles.input} type="number" placeholder="Stock Quantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
        <input style={styles.input} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input style={styles.input} type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
        <button style={styles.addBtn} onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Split layout */}
      <div style={styles.container}>
        {/* Users */}
        <div style={styles.panel}>
          <h2 style={styles.title}>Registered Users</h2>
          {users.length === 0 ? <p>No users found.</p> : (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {users.map(user => (
                <li key={user.userId} style={styles.listItem}>
                  <span>{user.email} - {user.name || "No name"}</span>
                  <button style={styles.deleteBtn} onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Products */}
        <div style={styles.panel}>
          <h2 style={styles.title}>Products</h2>
          {products.length === 0 ? <p>No products available.</p> : (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {products.map(product => (
                <li key={product.productId} style={styles.listItem}>
                  <span>{product.name} - {product.brand} - R {product.price.toFixed(2)}</span>
                  <button style={styles.deleteBtn} onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Orders */}
        <div style={styles.panel}>
          <h2 style={styles.title}>Order History</h2>
          {orders.length === 0 ? <p>No pending orders.</p> : (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {orders.map(order => (
                <li key={order.orderId} style={styles.listItem}>
                  <span>Order #{order.orderId} - {order.status} - R {order.totalAmount?.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
