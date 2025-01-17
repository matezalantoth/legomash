import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import {MashPage} from "./pages/MashPage.tsx";
import {LeaderboardPage} from "./pages/LeaderboardPage.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"
                       element={<MashPage/>}/>
                <Route path="/leaderboard"
                       element={<LeaderboardPage/>}/>

            </Routes>
        </BrowserRouter>
    )
}

export default App
