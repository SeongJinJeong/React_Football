export const KEYWORD = "search/KEYWORD";

const inintalState = {
  word: "livepool",
};

export const setKeyword = (word) => {
  return { type: KEYWORD, word };
};

const Search = (state = inintalState, action) => {
  switch (action.type) {
    case KEYWORD:
      return { ...state, word: action.word };

    default:
      return { ...state };
  }
};

export default Search;
