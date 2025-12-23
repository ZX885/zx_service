import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";


export default function Games(){
    const [games, setGames] = useState([]);

    useEffect(()=>{
        api.get("games/")
            .then(res =>setGames(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Игры</h2>
            {games.map(game =>(
                <div key={game.id}>
                    <Link to={`/category/${game.id}`}>
                        {game.title}
                    </Link>
                </div>    
            ))}
        </div>
    )
}