import { useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const loginPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          resolve(data); // login successful
        } else {
          reject(new Error(data.message || "Invalid credentials"));
        }
      } catch (err) {
        reject(err); // network or server error
      }
    });
  
    toast.promise(loginPromise, {
      loading: 'Logging in...',
      success: <b>Login successful!</b>,
      error: (err) => <b>{err.message || "Login failed."}</b>,
    });
  
    try {
      const userData = await loginPromise;
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (err) {
      // No need to handle error again, toast.promise already did
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f7f7" }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 32, borderRadius: 12, boxShadow: "0 2px 16px rgba(0,0,0,0.07)", minWidth: 320 }}>
        <h2 style={{ marginBottom: 24, fontWeight: 600, fontSize: 24, textAlign: "center" }}>Login</h2>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd", fontSize: 16 }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid #ddd", fontSize: 16 }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 12, borderRadius: 6, border: "none", background: "#22223b", color: "#fff", fontWeight: 500, fontSize: 16, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
