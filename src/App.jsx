import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import News from "./components/News";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <News />
      <Footer />
    </>
  );
}

export default App;
