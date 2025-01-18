import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
import {MashPage} from "./pages/MashPage.tsx";
import {LeaderboardPage} from "./pages/LeaderboardPage.tsx";
import {Navbar} from "./components/navbar/Navbar.tsx";

function App() {

    return (
        <BrowserRouter>
            <Navbar/>
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
