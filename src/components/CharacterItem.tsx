import { useNavigate } from "react-router-dom";

type PropTypes = {
    img: string;
    name: string;
    id: number;
};

export const CharacterItem = ({ img, name, id }: PropTypes) => {
    const navigate = useNavigate();

    return (
        <div
            className="card"
            onClick={() => {
                navigate(`/character/${id}`);
            }}
        >
            <span>{name}</span>
            <img src={img} alt="" />
        </div>
    );
};
