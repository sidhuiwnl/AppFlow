import Main from "@/components/Main.tsx";
import {Route, Routes} from "react-router";
import Chat from "@/components/Chat.tsx";

function App() {



  return (
    <Routes>
        <Route path={"/"} element={<Main/>} />
        <Route path={"/chat"} element={<Chat/>} />
    </Routes>

  )
}

export default App
