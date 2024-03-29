import { createBrowserRouter } from "react-router-dom";
import ContactsPage from "../pages/Contact/ContactPage";
import ProductPage from "../pages/Product/ProductPage";
import CompanyPage from "../pages/Company/CompanyPage";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <h2>Hellow World</h2>,
    },
    {
        path: "/contacts",
        element: <ContactsPage />,
        children: [
          {
            path: "/contacts/:uuid"
          }         
        ]
    },
    {
        path: "/companies",
        element: <CompanyPage />,
        children: [
          {
            path: "/companies/:uuid"
          }         
        ]
    },
    {
      path: "/products",
        element: <ProductPage />,
        children: [
          {
            path: "/products/:uuid"
          }         
        ]
    }

  ]);

  export default Router;