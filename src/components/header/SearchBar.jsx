import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

const SearchBar = ({ handleSearch, search, setSearch, inputRef }) => {
  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <input
          className="bg-neutral-100 dark:bg-neutral-700 rounded-full h-[35px] w-[150px] md:w-full outline-none px-9"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          ref={inputRef}
        />
      </form>
      <CiSearch className="text-lg absolute left-3 top-1/2 -translate-y-1/2" />
      {search && (
        <IoIosClose
          className="text-3xl absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 cursor-pointer"
          onClick={() => {
            setSearch("");
            inputRef.current.focus();
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;
