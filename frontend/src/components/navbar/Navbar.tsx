import {useNavigate} from "react-router-dom";

export const Navbar = () => {
    const navigate = useNavigate()
    return <>
        <div className="w-full bg-yellow-300 h-8 text-2xl">
            <span className="ml-4" onClick={() => navigate("/")}>BRICKMASH</span>
            <span className="float-right mr-4" onClick={() => navigate("/leaderboard")}>LEADERBOARD</span>
        </div>
    </>
}