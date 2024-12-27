import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://project-x8zn.onrender.com/api/",
});
const apiUri = "https://project-x8zn.onrender.com/api/";

export const getAllArticles = async () => {
  const response = await ncNews.get("articles");
  return response;
};
export const getTopics = async () => {
  const response = await ncNews.get("topics");
  return response;
};
export const getArticlesByQuery = async (topic) => {
  const response = await ncNews.get(`articles?topic=${topic}`);

  return response;
};

export const getArticle = async (article_id) => {
  const response = await ncNews.get(`articles/${article_id}`);
  return response;
};

export const getComments = async (article_id) => {
  const response = await ncNews.get(`articles/${article_id}/comments`);
  return response;
};

export const updateVotes = async (article_id, vote) => {
  const response = await ncNews.patch(`articles/${article_id}`, {
    inc_votes: vote,
  });
  return response;
};

export const postComment = async (article_id, username, comment) => {
  const response = await ncNews.post(`articles/${article_id}/comments`, {
    username: username,
    body: comment,
  });
  return response;
};

export const deleteComment = async (comment_id) => {
  const response = await ncNews.delete(`comments/${comment_id}`);
  return response;
};
