import Header from "./components/Header.tsx";
import Body from "./components/Body.tsx";
import Footer from "./components/Footer.tsx";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Body />
      </div>
      <Footer />
    </>
  );
}

export default App;
