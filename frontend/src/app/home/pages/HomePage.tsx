import React from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { SessionService } from "../../../shared/services/SessionService";
import MenuPage from "./MenuPage";

const HomePage: React.FC = () => {
  const sessionManager = new SessionService();

  const isLoggedIn = () => {
    if (sessionManager.getUser()) return true;

    return false;
  }

  return (
    <>
      {isLoggedIn() ? <MenuPage /> : <Header />}
      <Banner />
      <Features />
      <Footer />
    </>
  );
};

export default HomePage;
