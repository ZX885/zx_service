
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../api/axios";
import ChatList from "./ChatList";

export default function ChatDetail() {
    const { chatId } = useParams();
    const [chat, setChat] = useState(null);
    const [text, setText] = useState("");
    const bottomRef = useRef(null);

    useEffect(() => {
        api.get(`/chats/${chatId}/`)
            .then(res => setChat(res.data))
            .catch(err => console.error(err));
    }, [chatId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const sendMessage = async e => {
        e.preventDefault();
        if (!text.trim()) return;

        const res = await api.post(`/chats/${chatId}/send/`, { text });
        setChat(prev => ({
            ...prev,
            messages: [...prev.messages, res.data]
        }));
        setText("");
    };

    if (!chat) return <p>Загрузка...</p>;

    return (
        <div style={{ display: "flex", height: "100%" }}>
            <div style={{width:"500px", borderRight:"1px solid grey", margin:"20px"}}>
                <ChatList/>
            </div>

            <div>

                {/* header */}
                <div style={{ padding: 10, borderBottom: "1px solid #00960a" }}>
                    <b>Заказ #{chat.order_id}</b>
                </div>

                {/* messages */}
                <div style={{ flex: 1,height:"380px", padding: 10, overflowY: "auto" }}>
                    <div>
                        Диалог с {chat.with_user}
                    </div>
                    {chat.messages.map(msg => {
                        const isMine = msg.sender === chat.with_user || msg.sender === chat.with_user;

                        return (
                            <div
                                key={msg.id}
                                style={{
                                    display: "flex",
                                    width: "600px",
                                    justifyContent: isMine ? "flex-start" : "flex-end",
                                    marginBottom: 8
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: "60%",
                                        padding: "8px 12px",
                                        borderRadius: 12,
                                        background: isMine ? "#008b25" : "#0f7ce9",
                                        overflowWrap:"break-word",
                                    }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>

                {/* input */}
                <form
                    onSubmit={sendMessage}
                    style={{ display: "flex", padding: 10, borderTop: "1px solid #ddd" }}
                >
                    <input
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Сообщение..."
                        style={{ flex: 1, padding: 8 }}
                    />
                    <button type="submit">➤</button>
                </form>
            </div>
        </div>
        
    );
}
