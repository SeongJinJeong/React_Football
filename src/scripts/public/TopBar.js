import React, { useState } from "react";
import { setKeyword } from "../../store/modules/search";
import { connect } from "react-redux";

const Top = (props) => {
  const [word, setWord] = useState("");
  const _handleSearch = (event) => {
    event.persist();
    setWord(event.target.value);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Search Team!!"
        onChange={_handleSearch}
        value={word}
      ></input>
      <button
        onClick={() => {
          if (word.length <= 3) {
            alert("Team name should be over 3 Spells!");
          } else {
            props.setKeyword(word);
            setWord("");
          }
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
