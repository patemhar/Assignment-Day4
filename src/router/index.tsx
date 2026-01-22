import { createBrowserRouter } from "react-router-dom";
import { BaseLayout } from "../layouts/BaseLayout";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import Products from "../pages/Products";
import Product from "../pages/Product";
import Customise from "../pages/Customise";
import { productDetailsLoader } from "../pages/Product";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "shop",
        children: [
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "product/:id",
            element: <Product />,
            loader: productDetailsLoader,
            children: [
              {
                path: "customize",
                element: <Customise />,
              },
            ]
          },
          {
            path: "cart",
            element: <Cart />,
          }
        ],
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "*",
        element: <NotFound />
      }
    ],
  },
]);
