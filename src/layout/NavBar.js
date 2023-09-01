import logo from "assets/images/logo.png";
import { useNavigate, NavLink } from "react-router-dom";
import { clearToken } from "redux/authSlice";
import { useSelector, useDispatch } from "react-redux";
export function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const cartItem = useSelector((state) => state.cart);

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
          <NavLink className="nav-item nav-link  pe-3" to="/">
            Home
          </NavLink>
          {token && (
            <NavLink className="nav-item nav-link" to="/cartlist">
              <div className="d-flex align-items-center">
                <div className="position-relative me-2">
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItem.cart.reduce(
                      (totalQty, item) => totalQty + item.qty,
                      0
                    )}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-cart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                  </svg>
                </div>
                <span className="pt-2">Cart</span>
              </div>
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
