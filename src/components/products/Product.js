import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "helpers/useAxios";
import { useDispatch } from "react-redux";
import { addtoCart } from "redux/cartSlice";
import { toast } from "react-toastify";

export function Product() {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await useAxios.get(`/products/${id}`);
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddtoCart = (item) => {
    dispatch(addtoCart({ item, qty }));
    toast.success("Item Added to Cart");
  };
  return (
    <>
      {loading ? (
        <div className="loading-container text-center py-5">
          <h4 style={{ fontSize: "24px", color: "#333" }}>Loading...</h4>
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        <div className="container py-5">
          <div className="row pt-5">
            <div className="col-md-6 mb-4">
              <img
                className="img-fluid rounded"
                src={data.image}
                alt="Product"
                style={{ maxHeight: "400px" }}
              />
            </div>
            <div className="col-md-6">
              <h2 className="mb-3">{data.title}</h2>
              <p className="mb-4">{data.description}</p>
              <p className="h5 mb-3">Price: ${data.price}</p>
              <p className="h5 mb-3">Category: {data.category}</p>
              <p className="h5 mb-3">Rating: {data.rating.rate}</p>
              <button
                onClick={() => handleAddtoCart(data)}
                className="btn btn-primary btn-lg mb-3"
              >
                Add to Cart
              </button>
              <div className="input-group">
                <span className="input-group-text">Qty:</span>
                <input
                  type="number"
                  className="form-control"
                  defaultValue={1}
                  min={1}
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
