
import { useEffect, useState, } from "react";
import { useHeader } from "../global/HeaderContext";
import Ranking from "./Ranking";
import AllBets from "./AllBets";
import "./stats.css"
import MyStats from "./MyStats";
import AllSpecialBets from "./AllSpecialBets";
import RankingStats from "./RankingStats";

export default function Stats() {
    const { setHeader } = useHeader();
    const [activeStage, setActiveStage] = useState("Ranking");


    useEffect(() => {
        setHeader({
            title: "Daten & Tabelle",
            values: ["Ranking", "Ranking-Statistik", "Meine Statistik", "Tippvergleich", "Spezialtippvergleich"],
            activeValue: activeStage,
            onValueChange: setActiveStage
        });
    }, [activeStage, setActiveStage, setHeader]);


    switch (activeStage) {
        case "Ranking": return <div><Ranking /></div>
        case "Ranking-Statistik": return <div><RankingStats /></div>
        case "Meine Statistik": return <div><MyStats /></div>
        case "Tippvergleich": return <div><AllBets /></div>
        case "Spezialtippvergleich": return <div><AllSpecialBets /></div>
        default: return <></>
    }
}

