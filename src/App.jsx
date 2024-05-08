import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import News from "./components/News";
import Article from "./components/Article";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/article" element={<Article />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

// <Switch>
//      <Route path="/myElements/:elementId/properties" component={PropertiesPage}/>
// </Switch>

//
