// src/routers.js
import { createBrowserRouter } from "react-router-dom";
import Layout from "./featured/layout";
import JobGrid from "./pages/JobGrid";
import JobList from "./pages/JobList";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "job-grid",
        element: <JobGrid />,  
      },
      {
        path: "job-list",
        element: <JobList />,
      },
    ],
  },
]);

export default routes;
