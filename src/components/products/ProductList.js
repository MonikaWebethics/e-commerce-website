import { useEffect, useState } from "react";
import { useAxios } from "helpers/useAxios";
import { Link } from "react-router-dom";
import { slice } from "lodash";
import { useDispatch } from "react-redux";
import { addtoCart } from "redux/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ProductList() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(6);
  const [filterData, setFilterData] = useState({
    category: "default",
    priceRange: "default",
  });
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await useAxios.get("/products");
        setData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchCategory = async () => {
      try {
        const res = await useAxios.get("products/categories");
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
    fetchCategory();
  }, []);

  const handleCategoryChange = async (e) => {
    setFilterData({ ...filterData, category: e.target.value });
  };
  const handlePriceRangeChange = async (e) => {
    setFilterData({ ...filterData, priceRange: e.target.value });
  };
  const calculateFilteredData = () => {
    const filteredData = data.filter((item) => {
      const categoryMatch =
        filterData.category === "default" ||
        item.category === filterData.category;

      return categoryMatch;
    });

    let sortedData = [...filteredData];

    if (filterData.priceRange === "Low") {
      sortedData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filterData.priceRange === "High") {
      sortedData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    return sortedData;
  };
  const filteredData = calculateFilteredData();
  const initialData = slice(filteredData, 0, index);
  const hasMoreData = initialData.length < filteredData.length;
  const loadMore = () => {
    setIndex(index + 6);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

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
          <ToastContainer />
          <div className="row pb-5">
            <div className="col-3">
              <select
                onChange={handleCategoryChange}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="default">Select Category</option>
                {category.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-3">
              <select
                onChange={handlePriceRangeChange}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="default">Price range</option>
                <option value="High">High to Low</option>
                <option value="Low">Low to High</option>
              </select>
            </div>
          </div>

          <div className="row">
            {initialData.map((item, index) => (
              <div className="col-4 py-3" key={index}>
                <div className="card h-100" style={{ width: "18rem" }}>
                  <Link
                    to={`/product/${item.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <img
                      className="card-img-top"
                      src={item.image}
                      alt="Product"
                      style={{
                        objectFit: "contain",
                        height: "200px",
                        width: "100%",
                      }}
                    />

                    <div className="card-body">
                      <h5>{item.title.slice(0, 20)}</h5>
                      <p className="card-text">
                        {truncateDescription(item.description, 100)}
                      </p>
                    </div>
                  </Link>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      ${item.price.toFixed(2)}
                    </li>
                    <li className="list-group-item">
                      Category: {item.category}
                    </li>
                    <li className="list-group-item">
                      Rating: {item.rating.rate}
                    </li>
                  </ul>
                  <div className="card-body d-flex flex-column">
                    <button
                      className="btn btn-primary mb-2"
                      onClick={() => handleAddtoCart(item)}
                    >
                      Add to Cart
                    </button>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Qty:</span>
                      <input
                        type="number"
                        className="form-control"
                        min={1}
                        defaultValue={1}
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row d-grid mt-3 mb-5">
            {hasMoreData && (
              <div className="col-12 text-center">
                <button
                  onClick={loadMore}
                  type="button"
                  className="btn btn-lg btn-dark"
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
