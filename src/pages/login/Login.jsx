import { useRef } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const Login = () => {
  const { login } = useAuth();
  const authRef = useRef({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    {
      loading && toast.loading("Logging in...");
    }

    const { email, password } = authRef.current;
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      // console.log("checking data from api ", res.data)

      const data = res.data.data;

      login(data.admin, data.token); // store in context

      toast.success("Login successful!");

      navigate("/admin/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f7f7",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
          minWidth: 320,
        }}
      >
        <h2
          style={{
            marginBottom: 24,
            fontWeight: 600,
            fontSize: 24,
            textAlign: "center",
          }}
        >
          Login
        </h2>
        <div style={{ marginBottom: 16 }}>
          <input
            type="email"
            placeholder="Email"
            // ref={authRef.current.email}
            required
            onChange={(e) => (authRef.current.email = e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <input
            type="password"
            placeholder="Password"
            // value={password}

            onChange={(e) => (authRef.current.password = e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 6,
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 6,
            border: "none",
            background: "#22223b",
            color: "#fff",
            fontWeight: 500,
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
