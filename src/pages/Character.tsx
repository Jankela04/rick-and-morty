import { Link, useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Search from "../components/Search";
import Error from "./Error";
import Loading from "./Loading";

const GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
        character(id: $id) {
            id
            name
            image
            status
            species
            gender
            origin {
                name
            }
            location {
                name
            }
            episode {
                id
                name
                episode
            }
        }
    }
`;
interface Episode {
    id: string;
    name: string;
    episode: string;
}

interface CharacterType {
    character: {
        id: number;
        name: string;
        image: string;
        status: string;
        species: string;
        gender: string;
        origin: {
            name: string;
        };
        location: {
            name: string;
        };
        episode: Episode[];
    };
}

const Character = () => {
    const { id } = useParams();

    const { error, loading } = useQuery(GET_CHARACTER, {
        variables: {
            id,
        },
    });
    const { data } = useQuery<CharacterType>(GET_CHARACTER, {
        variables: {
            id,
        },
    });

    if (error) return <Error error={error} />;

    if (loading) return <Loading />;

    return (
        <>
            <div className="flex-wrapper">
                <Link to="/">Logo</Link>
            </div>
            <div className="flex-center">
                <div className="character-container">
                    <img src={data?.character.image} alt="" />
                    <div className="info">
                        <h1>{data?.character.name}</h1>
                        <div className="status">
                            <div
                                className="status-icon"
                                style={{
                                    backgroundColor:
                                        data?.character.status === "Alive"
                                            ? "green"
                                            : "red",
                                }}
                            />
                            <span>
                                {data?.character.status === "Alive"
                                    ? "Alive"
                                    : "Dead"}
                            </span>
                        </div>
                        <p className="grayed">Gender:</p>
                        <span>{data?.character.gender}</span>

                        <p className="grayed">Origin:</p>
                        <span>{data?.character.origin.name}</span>

                        <p className="grayed">Location:</p>
                        <span>{data?.character.location.name}</span>
                    </div>
                </div>
                <div className="episode-container">
                    <p className="grayed">Episode: </p>
                    {data?.character.episode.map((ep) => {
                        return (
                            <div>
                                <span>{ep.episode}: </span>
                                <Link to={`/episode/${ep.id}`}>{ep.name}</Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Character;
