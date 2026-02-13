import "./chatpage.scss"
import { Routes, Route } from "react-router-dom";
import ChatList from "./ChatList"
import ChatDetail from "./Detail";

export default function ChatPage() {
    return (
        <div>
            <div className="chat-page">
                <div className="chat-page-list">
                    <ChatList />
                </div>
                <div>
                    <Routes>
                        <Route path=":chatId" element={ChatDetail} />
                        <Route
                            path=""
                            element={<p style={{ padding: 20 }}>Выберите чат</p>} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}