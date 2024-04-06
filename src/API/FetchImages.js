import axios from "axios";

const AXESS_KEY = "glJef-KbvzpdGwZa6Lggb4INWKEQntpkI4EC8GOXqu8";

const FetchImages = async (serchedWord, newPage) => {
  const data = await axios.get(
    "https://api.unsplash.com/search/photos?page=" +
      newPage +
      "&query=" +
      serchedWord +
      "&per_page=16&client_id=" +
      AXESS_KEY
  );

  return data;
};

export default FetchImages;
