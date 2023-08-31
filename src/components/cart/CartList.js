import { useSelector } from "react-redux";
export function CartList() {
  const cartItem = useSelector((state) => state.cart);

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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
