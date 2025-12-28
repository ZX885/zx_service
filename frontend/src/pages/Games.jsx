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
            <h2>Категории</h2>
            {games.map(game =>(
                <div className="card" key={game.id}>
                    <Link to={`/games/${game.id}/categories`}>
                        <h1>{game.title}</h1>
                        {/* <p>{game.slug}</p> */}
                        {/* <img src={game.image} alt="" /> */}
                    </Link>
                </div>    
            ))}
        </div>
    )
}