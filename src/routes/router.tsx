import { createBrowserRouter } from "react-router-dom";
import ContactsPage from "../pages/Contact/ContactPage";
import CompaniesPage from "../pages/Company/CompanyPage";

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
        element: <CompaniesPage />,
        children: [
          {
            path: "/companies/:uuid"
          }         
        ]
    }

  ]);

  export default Router;