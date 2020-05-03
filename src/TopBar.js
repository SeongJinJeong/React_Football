import React, { useState } from "react";
import { KEYWORD, setKeyword } from "./store/modules/search";
import { connect } from "react-redux";

const Top = (props) => {
  const [word, setWord] = useState("");
  const _handleSearch = (event) => {
    event.persist();
    setWord(event.target.value);
  };
  console.log(props);
  return (
    <div>
      <form id="Search">
        <input
          type="text"
          placeholder="Search team"
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

const mapStateToProps = ({ word }) => ({
  word,
});

const mapDispatchToProps = { setKeyword };

export default connect(mapStateToProps, mapDispatchToProps)(Top);
