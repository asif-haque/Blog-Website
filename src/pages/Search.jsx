import React from "react";
import { useSearchParams } from "react-router-dom";
import AllPosts from "./AllPosts";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q");

  return (
    <div>
      <AllPosts searchTerm={searchTerm} />
    </div>
  );
};

export default Search;
