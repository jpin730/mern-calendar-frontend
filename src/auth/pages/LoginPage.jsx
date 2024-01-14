import { useEffect } from "react";
import Swal from "sweetalert2";

import { useAuthStore, useForm } from "../../hooks";

const loginFormFields = {
  loginEmail: "user@email.com",
  loginPassword: "123456",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPasswordConfirm: "",
};

export const LoginPage = () => {
  const { errorMessage, startLogin, startRegister } = useAuthStore();

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordConfirm,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  useEffect(() => {
    if (errorMessage) {
      Swal.fire("Authentication error", errorMessage, "error");
    }
  }, [errorMessage]);

  const onLoginSubmit = (event) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  };

  const onRegisterSubmit = (event) => {
    event.preventDefault();
    if (
      !(
        registerName &&
        registerEmail &&
        registerPassword &&
        registerPasswordConfirm
      )
    ) {
      Swal.fire("Register error", "All fields are required", "error");
      return;
    }

    if (registerPassword !== registerPasswordConfirm) {
      Swal.fire("Register error", "Passwords do not match", "error");
      return;
    }
    startRegister({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });
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
                  name="loginEmail"
                  value={loginEmail}
                  onChange={onLoginInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="loginPassword"
                  value={loginPassword}
                  onChange={onLoginInputChange}
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
                  name="registerName"
                  value={registerName}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="registerEmail"
                  value={registerEmail}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="registerPassword"
                  value={registerPassword}
                  onChange={onRegisterInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm password"
                  name="registerPasswordConfirm"
                  value={registerPasswordConfirm}
                  onChange={onRegisterInputChange}
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
