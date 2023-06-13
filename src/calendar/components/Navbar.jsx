export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <div className="container">
        <span className="navbar-brand">
          <i className="fas fa-calendar-alt me-2"></i>
          MERN Calendar
        </span>
        <button className="btn btn-outline-danger">
          <i className="fas fa-sign-out-alt me-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
