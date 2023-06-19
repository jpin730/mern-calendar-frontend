import { useAuthStore } from "../../hooks";

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <div className="container">
        <span className="navbar-brand">
          <i className="fas fa-calendar-alt me-2"></i>
          MERN Calendar
        </span>

        <div className="text-white">
          <i className="fas fa-circle-user me-2"></i>
          <span className="me-4">{user?.name}</span>
        </div>

        <button className="btn btn-outline-danger" onClick={startLogout}>
          <i className="fas fa-sign-out-alt me-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
