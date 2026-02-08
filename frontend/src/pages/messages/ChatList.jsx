import "./chatlist.scss"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

export default function ChatList() {
    const { chatId } = useParams();
    const [chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/chats")
            .then(res => setChats(res.data))
            .catch(err => console.error(err))
    }, []);

    return (
        <div className="chat-lists">
            <h3>Чаты</h3>

            {chats.map(chat => (
                <div key={chat.id}
                    className="chat-lists-ch"
                    onClick={() => navigate(`/chats/${chat.id}/`)}
                    style={{
                        background: String(chat.id) === chatId ? "#313131" : "grey"
                    }}>
                    <div><b>{chat.buyer} - {chat.seller}</b></div>
                    <small>Заказ #{chat.order_id}</small>
                </div>
            ))}
        </div>
    )

}