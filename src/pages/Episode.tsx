import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { deflateRawSync } from "zlib";
import { CharacterItem } from "../components/CharacterItem";
import Error from "./Error";
import Loading from "./Loading";

const GET_EPISODE = gql`
    query GetEpisode($id: ID!) {
        episode(id: $id) {
            id
            name
            episode
            air_date
            characters {
                id
                name
                image
            }
        }
    }
`;

type EpisodeType = {
    episode: {
        id: number;
        name: string;
        episode: string;
        air_date: string;
        characters: {
            id: number;
            name: string;
            image: string;
        }[];
    };
};

const Episode = () => {
    const { id } = useParams();

    const { error, loading } = useQuery(GET_EPISODE, {
        variables: {
            id,
        },
    });

    const { data } = useQuery<EpisodeType>(GET_EPISODE, {
        variables: {
            id,
        },
    });

    if (loading) return <Loading />;

    if (error) return <Error error={error} />;

    return (
        <div className="episode">
            <div className="flex-wrapper">
                <Link to="/">Logo</Link>
            </div>
            <div className="container">
                <div className="episode-name">
                    <h2>{data?.episode.name} </h2>
                    <span>{data?.episode.episode}</span>
                </div>
                <p className="grayed">Air Time:</p>
                <span className="info">{data?.episode.air_date}</span>

                <h3>Characters:</h3>
            </div>

            <div className="character-list-container">
                {data?.episode.characters.map((char) => {
                    return (
                        <CharacterItem
                            img={char.image}
                            name={char.name}
                            id={char.id}
                            key={char.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Episode;
