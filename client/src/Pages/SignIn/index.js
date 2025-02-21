import { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <section className="section">
      <div className="container">
        <div className="site-login">
          <div className="site-login-container">
            <div className="site-login-overflow">
              {/* Tabs */}
              <ul className="login-page-tab d-flex align-items-center justify-content-center">
                <li
                  className={activeForm === "login" ? "active" : ""}
                  onClick={() => setActiveForm("login")}
                >
                  Đăng nhập
                </li>
                <li
                  className={activeForm === "signup" ? "active" : ""}
                  style={{ marginLeft: "2.5rem" }}
                  onClick={() => setActiveForm("signup")}
                >
                  Đăng ký
                </li>
              </ul>

              {/* Form Container */}
              <div className="login-form-container">
                {/* Đăng nhập */}
                {activeForm === "login" && (
                  <div className="login-form">
                    <form>
                      <p>
                        <label>Email &nbsp; *</label>
                        <input className="d-flex" type="text" />
                      </p>
                      <p>
                        <label>Mật khẩu &nbsp; *</label>
                        <input className="d-flex" type="password" />
                      </p>
                      <p className="form-row">
                        <input type="checkbox" className="rememberMe" />
                        <label>Nhớ tài khoản</label>
                      </p>
                      <Button className="btn-blue">Đăng nhập</Button>
                      <p>
                        <Link className="forgot-pass">
                          <span>Quên mật khẩu?</span>
                        </Link>
                      </p>
                      <p className="d-flex align-items-center justify-content-center or">
                        <div className="OSn4Cu"></div>
                        <div className="eNWshb">Hoặc</div>
                        <div className="OSn4Cu"></div>
                      </p>
                      <div className="withGG">
                        <Button >
                            <FcGoogle/>&nbsp; Đăng nhập bằng Google
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Đăng ký */}
                {activeForm === "signup" && (
                  <div className="login-form">
                    <form>
                      <p>
                        <label>Tên người dùng &nbsp; *</label>
                        <input className="d-flex" type="text" />
                      </p>
                      <p>
                        <label>Email &nbsp; *</label>
                        <input className="d-flex" type="text" />
                      </p>
                      <p>
                        <label>Mật khẩu &nbsp; *</label>
                        <input className="d-flex" type="password" />
                      </p>
                      <Button className="btn-blue">Đăng ký</Button>
                      <p className="d-flex align-items-center justify-content-center or">
                        <div className="OSn4Cu"></div>
                        <div className="eNWshb">Hoặc</div>
                        <div className="OSn4Cu"></div>
                      </p>
                      <div className="withGG">
                        <Button >
                            <FcGoogle/>&nbsp; Đăng nhập bằng Google
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
