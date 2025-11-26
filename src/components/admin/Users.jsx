import { useState, useEffect } from "react";
import userService from "../../services/userService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [search, setSearch] = useState("");

  // State Modal Form
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);

  // State Form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "user",
    isActive: true,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // State Delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  //   fetch users
  const fetchUsers = async (page = 1, searchQuery = "") => {
    try {
      setLoading(true);
      setError(null);
      const response = await userService.getAll({
        page: page,
        limit: pagination.limit,
        search: searchQuery,
      });

      if (response.success) {
        setUsers(response.data);
        setPagination(response.pagination);
      }
    } catch (err) {
      setError(err.message || "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handler Search & Pagination
  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(1, search);
  };

  const handlePageChange = (newPage) => {
    fetchUsers(newPage, search);
  };

  // Handler Modal Form
  const handleAdd = () => {
    setModalMode("add");
    setSelectedUser(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      fullName: "",
      role: "user",
      isActive: true,
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalMode("edit");
    setSelectedUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      fullName: user.fullName || "",
      role: user.role,
      isActive: user.isActive,
    });
    setFormError(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setFormLoading(true);
      setFormError(null);

      if (modalMode === "add") {
        if (!formData.username || !formData.email || !formData.password) {
          setFormError("Username, email, dan password wajib diisi");
          return;
        }
        await userService.create(formData);
      } else {
        if (!formData.username || !formData.email) {
          setFormError("Username dan email wajib diisi");
          return;
        }
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }
        await userService.update(selectedUser.id, updateData);
      }

      handleCloseModal();
      fetchUsers(modalMode === "add" ? 1 : pagination.page, search);
    } catch (err) {
      setFormError(err.message || "Gagal menyimpan data");
    } finally {
      setFormLoading(false);
    }
  };

  // Handler Delete
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleteLoading(true);
      await userService.delete(userToDelete.id);
      handleCloseDeleteModal();
      fetchUsers(pagination.page, search);
    } catch (err) {
      alert(err.message || "Gagal menghapus user");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>Users Management</h1>
      </div>
      &nbsp;
      <div>
        <p>Proses Loading : {loading ? "Ya" : "Tidak"}</p>
        <p>Error Load Data : {error ? error : "Tidak ada error"}</p>
        <p>
          <strong>Jumlah User Yang di Tampilkan</strong> : {users.length}
        </p>
      </div>
      <div>
        {/* Header */}
        {/* Page Header */}
        <div className="mb-4 d-flex justify-content-between align-items-center">
          <button className="btn btn-primary" onClick={handleAdd}>
            <i className="bi bi-plus-lg me-2"></i>
            Tambah User
          </button>
        </div>
        {/* Search Form */}
        <div className="mb-4">
          <form onSubmit={handleSearch} className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Cari username atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "300px" }}
            />
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-search me-2"></i>
              Cari
            </button>
          </form>
        </div>
        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        {/* Loading atau Tabel */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Memuat data...</p>
          </div>
        ) : (
          <div className="card">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Nama Lengkap</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th style={{ width: "120px" }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        Tidak ada data users
                      </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.fullName || "-"}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === "admin"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              user.isActive ? "bg-success" : "bg-warning"
                            }`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            title="Edit"
                            onClick={() => handleEdit(user)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            title="Hapus"
                            onClick={() => handleDeleteClick(user)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div>
        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              {/* Tombol Previous */}
              <li
                className={`page-item ${
                  !pagination.hasPrevPage ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage}
                >
                  <i className="bi bi-chevron-left"></i>
                </button>
              </li>

              {/* Nomor Halaman */}
              {[...Array(pagination.totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    pagination.page === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              {/* Tombol Next */}
              <li
                className={`page-item ${
                  !pagination.hasNextPage ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                >
                  <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        )}
        {/* Info Total */}
        <p className="text-left text-muted mt-2">
          Menampilkan {users.length} dari {pagination.total} users
        </p>

        {/* Modal Tambah/Edit User */}
        {showModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {modalMode === "add"
                      ? "Tambah User"
                      : `Edit User: ${selectedUser?.username}`}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {formError && (
                    <div className="alert alert-danger py-2">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      {formError}
                    </div>
                  )}

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Masukkan username"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Masukkan email"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password{" "}
                      {modalMode === "add" && (
                        <span className="text-danger">*</span>
                      )}
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder={
                        modalMode === "edit"
                          ? "Kosongkan jika tidak diubah"
                          : "Masukkan password"
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isActive"
                        name="isActive"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="isActive">
                        Aktif
                      </label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                    disabled={formLoading}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={formLoading}
                  >
                    {formLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Menyimpan...
                      </>
                    ) : modalMode === "add" ? (
                      "Simpan"
                    ) : (
                      "Update"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Hapus */}
        {showDeleteModal && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Konfirmasi Hapus</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseDeleteModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="mb-0">
                    Apakah Anda yakin ingin menghapus user{" "}
                    <strong>{userToDelete?.username}</strong>?
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseDeleteModal}
                    disabled={deleteLoading}
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDeleteConfirm}
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Menghapus...
                      </>
                    ) : (
                      "Hapus"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Users;
