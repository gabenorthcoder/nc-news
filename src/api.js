import axios from "axios";

export const getAllArticles = async () => {
  const response = await axios.get(
    "https://project-x8zn.onrender.com/api/articles"
  );

  return response.data;
};

export const getArticle = async (article_id) => {
  const response = await axios.get(
    `https://project-x8zn.onrender.com/api/articles/${article_id}`
  );
  console.log(response.data);
  return response.data;
};
