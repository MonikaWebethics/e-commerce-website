import logo from "assets/images/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import { clearToken } from "redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
export function NavBar() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearToken());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand ps-2" to="/">
        <img src={logo} height="28" alt="CoolBrand" />
        <span className="ps-3">E-Commerce</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/">
            Home
          </NavLink>
          {token && (
            <NavLink className="nav-item nav-link" to="/cartlist">
              Cart
            </NavLink>
          )}
          {!token && (
            <NavLink className="nav-item nav-link" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
      <div className="navbar-nav ms-auto pe-2">
        {token && (
          <button
            className="nav-item nav-link text-dark text-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
