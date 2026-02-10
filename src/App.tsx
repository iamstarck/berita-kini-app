import FooterPage from "./views/components/FooterPage";
import HeaderPage from "./views/components/HeaderPage";
import HomePage from "./views/pages/HomePage";

const App = () => {
  return (
    <>
      <HeaderPage />
      <main className="min-h-screen mt-8">
        <HomePage />
      </main>

      <FooterPage />
    </>
  );
};

export default App;
