import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import News from "./components/News";
import Article from "./components/Article";
import Topic from "./components/Topic";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/articles" element={<Topic />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
