import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DataType } from "../App";
import { CharacterItem } from "../components/CharacterItem";
import Search from "../components/Search";

type PropTypes = {
    data: DataType | undefined;
};

const CharacterList = ({ data }: PropTypes) => {
    const [query, setQuery] = useState("");

    const filteredCharacters = data?.characters.results.filter((char) => {
        return char.name.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <>
            <div className="flex-wrapper">
                <Link to="/">Logo</Link>
                <Search query={query} setQuery={setQuery} />
            </div>

            <div className="character-list-container">
                {filteredCharacters?.map((character) => {
                    return (
                        <CharacterItem
                            key={character.id}
                            img={character.image}
                            name={character.name}
                            id={character.id}
                        />
                    );
                })}
            </div>
        </>
    );
};

export default CharacterList;
