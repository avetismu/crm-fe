import { createBrowserRouter } from "react-router-dom";
import ContactsPage from "../pages/ContactsPage";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <h2>Hellow World</h2>,
    },
    {
        path: "/contacts",
        element: <ContactsPage />
    }
  ]);

  export default Router;