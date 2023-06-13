export const LoginPage = () => {
  const onLoginSubmit = (event) => {
    event.preventDefault();
  };

  const onRegisterSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container">
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="row w-100 border rounded shadow bg-white py-5 px-3 g-5">
          <div className="col-lg-6 m-0">
            <h3>Login</h3>
            <hr />
            <form onSubmit={onLoginSubmit}>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="form-group mb-3 text-end">
                <input
                  type="submit"
                  className="btn btn-primary px-5"
                  value="Login"
                />
              </div>
            </form>
          </div>
          <div className="col-lg-6 m-0">
            <h3>Create an account</h3>
            <hr />
            <form onSubmit={onRegisterSubmit}>
              <div className="form-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                />
              </div>
              <div className="form-group mb-3 text-end">
                <input
                  type="submit"
                  className="btn btn-primary px-5"
                  value="Register"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
