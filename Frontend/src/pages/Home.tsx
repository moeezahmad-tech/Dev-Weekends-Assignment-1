import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <section id="menu" className="min-h-[70vh]">
        <Products />
      </section>
      <Footer />
    </>
  );
};

export default Home;
