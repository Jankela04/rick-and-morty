import { useQuery, gql } from "@apollo/client";
import Error from "./pages/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./pages/Loading";
import "./styles/styles.css";
import ErrorSite from "./pages/ErrorSite";
import CharacterList from "./pages/CharacterList";
import Character from "./pages/Character";
import Episode from "./pages/Episode";

const GET_CHARACTERS = gql`
    query GetCharacters {
        characters {
            results {
                id
                name
                image
            }
        }
    }
`;
interface CharacterTypes {
    id: number;
    name: string;
    image: string;
}

export interface DataType {
    characters: {
        results: CharacterTypes[];
    };
}

function App() {
    const { error, loading } = useQuery(GET_CHARACTERS);

    const { data } = useQuery<DataType>(GET_CHARACTERS);

    const router = createBrowserRouter([
        {
            path: "/",
            element: <CharacterList data={data} />,
        },
        {
            path: "/character/:id",
            element: <Character />,
        },
        {
            path: "/episode/:id",
            element: <Episode />,
        },
        {
            path: "*",
            element: <ErrorSite />,
        },
    ]);

    if (loading) return <Loading />;

    if (error) return <Error error={error} />;

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
