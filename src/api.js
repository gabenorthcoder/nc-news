import axios from "axios";

const Ncnews = axios.create({
  baseURL: "https://project-x8zn.onrender.com/api/",
});
const apiUri = "https://project-x8zn.onrender.com/api/";

export const getAllArticles = async () => {
  const response = await Ncnews.get("articles");
  return response.data;
};

export const getArticle = async (article_id) => {
  const response = await Ncnews.get(`articles/${article_id}`);
  return response.data;
};

export const getComments = async (article_id) => {
  const response = await Ncnews.get(`articles/${article_id}/comments`);
  return response.data;
};

export const updateVotes = async (article_id, vote) => {
  const response = await Ncnews.patch(`articles/${article_id}`, {
    inc_votes: vote,
  });
  return response.data;
};
