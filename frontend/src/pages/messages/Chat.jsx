import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Chats() {
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/chats/")
            .then(res => setChats(res.data))
            .catch(err => console.error(err));
    }, [])

    if (!chats.length) {
        return <p>Чатов пока нет</p>
    }
    console.log(chats);


    return (
        <div>
            <h2>Сообщение</h2>

            {chats.map(chat => (
                <Link
                    key={chat.id}
                    to={`/chats/${chat.id}/*`}
                    className="chat-id"
                >
                    <b>{chat.buyer}</b>

                    <div>
                        {chat.order_id || ""}

                        {chat.last_message || "Новое сообщение"}
                    </div>
                </Link>
            ))}
        </div>
    )

}