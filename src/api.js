import axios from "axios";
const apiUri = "https://project-x8zn.onrender.com/api/";

export const getAllArticles = async () => {
  const response = await axios.get(`${apiUri}articles`);
  return response.data;
};

export const getArticle = async (article_id) => {
  const response = await axios.get(`${apiUri}articles/${article_id}`);
  return response.data;
};

export const getComments = async (article_id) => {
  const response = await axios.get(`${apiUri}articles/${article_id}/comments`);
  return response.data;
};
