import { Routes, Route } from "react-router-dom";
import ChatList from "./ChatList"
import ChatDetail from "./Detail";

export default function ChatPage(){
    return(
        <div>
            <ChatList />
            <div>
                <Routes>
                    <Route path=":chatId" element={ChatDetail} />
                    <Route 
                    path=""
                    element={<p style={{padding:20}}>Выберите чат</p>}/>
                </Routes>
            </div>
        </div>
    )
}