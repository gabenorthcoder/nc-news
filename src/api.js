import axios from "axios";

export const getAllArticles = async () => {
  const response = await axios.get(
    "https://project-x8zn.onrender.com/api/articles"
  );

  return response.data;
};
