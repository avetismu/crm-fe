import { createBrowserRouter } from "react-router-dom";
import ContactsPage from "../pages/Contacts/ContactsPage";
import CompaniesPage from "../pages/Companies/ContactsPage";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <h2>Hellow World</h2>,
    },
    {
        path: "/contacts",
        element: <ContactsPage />
    },
    {
        path: "/companies",
        element: <CompaniesPage />
    }
  ]);

  export default Router;