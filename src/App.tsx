import { useLayoutEffect, type ReactNode } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import HomePage from "./views/pages/HomePage";
import NotFoundPage from "./views/pages/NotFoundPage";
import HeaderPage from "./views/components/HeaderPage";
import FooterPage from "./views/components/FooterPage";
import CategoryPage from "./views/pages/CategoryPage";

const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

const Routes = () => {
  const element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/404", element: <NotFoundPage /> },
    { path: "/:category", element: <CategoryPage key={location.pathname} /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);

  return element;
};

const App = () => {
  return (
    <Wrapper>
      <HeaderPage />
      <main className="min-h-screen mt-8">
        <Routes />
      </main>
      <FooterPage />
    </Wrapper>
  );
};

export default App;
