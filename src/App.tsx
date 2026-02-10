import { Navigate, useLocation, useRoutes } from "react-router-dom";
import FooterPage from "./views/components/FooterPage";
import HeaderPage from "./views/components/HeaderPage";
import MainPage from "./views/pages/MainPage";
import NotFoundPage from "./views/pages/NotFoundPage";
import { useLayoutEffect, type ReactNode } from "react";

const Wrapper = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

const Routes = () => {
  const element = useRoutes([
    { path: "/", element: <MainPage /> },
    { path: "/404", element: <NotFoundPage /> },
    { path: "/:category", element: <MainPage /> },
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
