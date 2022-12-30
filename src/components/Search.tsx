import React from "react";

type PropTypes = {
    query: string;
    setQuery: Function;
};

const Search = ({ query, setQuery }: PropTypes) => {
    return (
        <div className="search">
            <input
                type="text"
                value={query}
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="10" cy="10" r="7" />
                <line x1="21" y1="21" x2="15" y2="15" />
            </svg>
        </div>
    );
};

export default Search;
