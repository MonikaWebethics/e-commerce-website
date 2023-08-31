import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeFromCart } from "redux/cartSlice";
import { toast } from "react-toastify";

export function CartList() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  const deleteItem = (id) => {
    dispatch(removeFromCart(id));
    toast.info("Item Removed from Cart");
  };
  return (
    <>
      <div className="container py-5">
        <h2 className="text-center pb-5">Shopping Cart</h2>
        {cartItem.cart.length === 0 ? (
          <h3 className="alert alert-info text-center">
            Your cart is currently empty
          </h3>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col">Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItem.cart.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item.item.image}
                        alt={item.item.title}
                        className="img-fluid me-2"
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                      {item.item.title}
                    </div>
                  </td>
                  <td>${item.item.price}</td>
                  <td>{item.qty}</td>
                  <td>${(item.item.price * item.qty).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => deleteItem(item.item.id)}
                      style={{ border: "none", background: "none" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="red"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
