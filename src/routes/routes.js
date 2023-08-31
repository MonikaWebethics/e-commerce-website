import { component } from "./component";

export const routes = [
  {
    path: "/login",
    Component: component.Login,
    isProtected: false,
  },
  {
    path: "/",
    Component: component.ProductList,
  },
  {
    path: "/product/:id",
    Component: component.Product,
  },
  {
    path: "/cartlist",
    Component: component.CartList,
    isProtected: true,
  },
];
