import { createBrowserRouter } from "react-router-dom";
import ContactsPage from "../pages/Contacts/ContactsPage";
import CompaniesPage from "../pages/Companies/CompaniesPage";

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