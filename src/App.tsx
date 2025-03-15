import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "./routes";
import tempoRoutes from "tempo-routes";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          {useRoutes(routes)}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(tempoRoutes)}
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
