import { useRoutes } from "react-router-dom";
import FooterPage from "./views/components/FooterPage";
import HeaderPage from "./views/components/HeaderPage";
import MainPage from "./views/pages/MainPage";

const Routes = () => {
  const element = useRoutes([
    { path: "/", element: <MainPage /> },
    { path: "/terbaru", element: <MainPage /> },
    { path: "/nasional", element: <MainPage /> },
    { path: "/internasional", element: <MainPage /> },
    { path: "/ekonomi", element: <MainPage /> },
    { path: "/olahraga", element: <MainPage /> },
    { path: "/teknologi", element: <MainPage /> },
    { path: "/hiburan", element: <MainPage /> },
    { path: "/gaya-hidup", element: <MainPage /> },
  ]);

  return element;
};

const App = () => {
  return (
    <>
      <HeaderPage />
      <main className="min-h-screen mt-8">
        <Routes />
      </main>

      <FooterPage />
    </>
  );
};

export default App;
