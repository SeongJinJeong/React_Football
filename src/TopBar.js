import React, { useState } from "react";
import { KEYWORD, setKeyword } from "./store/modules/search";
import { connect } from "react-redux";

const Top = (props) => {
  const [word, setWord] = useState("");
  const _handleSearch = (event) => {
    event.persist();
    setWord(event.target.value);
  };
  return (
    <div>
      <form id="Search">
        <input
          type="text"
          placeholder="Search Team!!"
          onChange={_handleSearch}
          value={word}
        ></input>
      </form>
      <button
        onClick={() => {
          props.setKeyword(word);
          setWord("");
        }}
      >
        Search
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { word: state.Search.word };
};

const mapDispatchToProps = { setKeyword };

export default connect(mapStateToProps, mapDispatchToProps)(Top);
