import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import News from "./components/News";
import Article from "./components/Article";
import Topic from "./components/Topic";
import Error from "./components/Error";

function App() {
  const [error, setError] = useState(null);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<News error={error} setError={setError} />} />
        <Route
          path="/article/:article_id"
          element={<Article error={error} setError={setError} />}
        />
        <Route
          path="/articles"
          element={<Topic error={error} setError={setError} />}
        />
        <Route path="*" element={<Error error={error} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
