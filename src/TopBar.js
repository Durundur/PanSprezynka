import React, { useState } from "react";
import searchIcon from "./icons8-search.svg";
import "./TopBar.css";

function TopBar(props) {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };
  const submitSearch = () => {
    props.onSearchSubmit(searchInput);
    setSearchInput("");
  };
  const handelEnter = (e) => {
    console.log(props)
    if (e.key === "Enter") submitSearch();
  };
  return (
    <div className="top-bar">
      <span className="top-bar__input">
        <input
          className="search-input"
          onKeyDown={handelEnter}
          type={"text"}
          list={"streamers"}
          placeholder="Wyszukaj"
          value={searchInput}
          onChange={handleInputChange}
        ></input>
        <img
          className="search-icon"
          alt="wyszukaj"
          onClick={submitSearch}
          src={searchIcon}
        ></img>
      </span>
      <span className="top-bar__sort"></span>
    </div>
  );
}

export default TopBar;
