import { Navigate } from "react-router-dom";
import FlowsPage from "./pages/flows";
import AgentBuilderPage from "./pages/agent-builder";
import CreateAgentPage from "./pages/create-agent";

const routes = [
  {
    path: "/",
    element: <FlowsPage />,
  },
  {
    path: "/flows",
    element: <FlowsPage />,
  },
  {
    path: "/create-agent",
    element: <CreateAgentPage />,
  },
  {
    path: "/agent-builder",
    element: <AgentBuilderPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
