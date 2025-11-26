import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  //   tambahkan fungsi error validasi
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.message || "Failed to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="mb-4 text-center col-md-4">
          <main className="m-auto form-signin w-100">
            <form onSubmit={handleSubmit}>
              <h1 className="mb-3 h3 fw-normal">Please sign in</h1>
              {error && (
                <div
                  className="alert alert-danger alert-dismissible fade show"
                  role="alert"
                >
                  <strong>{error}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="my-3 form-check text-start">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="remember-me"
                  id="checkDefault"
                />
                <label className="form-check-label" htmlFor="checkDefault">
                  Remember me
                </label>
              </div>
              <button
                className="py-2 btn btn-primary w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
              <p className="mt-5 mb-3 text-body-secondary">&copy; 2017–2025</p>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}

export default Login;
