import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <Banner />
      <Features />
      <Footer />
    </>
  );
};

export default HomePage;
