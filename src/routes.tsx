import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import Templates from "./pages/templates";
import MyAgents from "./pages/my-agents";
import Metrics from "./pages/metrics";
import CreateAgent from "./pages/create-agent";
import EditAgent from "./pages/edit-agent";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "templates", element: <Templates /> },
      { path: "my-agents", element: <MyAgents /> },
      { path: "metrics", element: <Metrics /> },
      { path: "metrics/:id", element: <Metrics /> },
      { path: "create", element: <CreateAgent /> },
      { path: "edit/:id", element: <EditAgent /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];

export default routes;
