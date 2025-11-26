import api from "./api";

const authService = {
  //login
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);

      const { token, user } = response.data.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return { token, user };
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  //logout
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  //   isAuthenticated
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  //getCurrentUser
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);

      const { token, user } = response.data.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      return { token, user };
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};

export default authService;
