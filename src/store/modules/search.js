export const KEYWORD = "search/KEYWORD";

const inintalState = {
  word: "liverpool",
};

export const setKeyword = (word) => {
  return { type: KEYWORD, word };
};

const Search = (state = "liverpool", action) => {
  switch (action.type) {
    case KEYWORD:
      return { word: action.word };

    default:
      return { word: false };
  }
};

export default Search;
