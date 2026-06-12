
import { useEffect, useState, } from "react";
import { useHeader } from "../global/HeaderContext";
import Ranking from "./Ranking";
import AllBets from "./AllBets";
import "./stats.css"
import AllStats from "./AllStats";
import AllSpecialBets from "./AllSpecialBets";

export default function Stats() {
    const { setHeader } = useHeader();
    const [activeStage, setActiveStage] = useState("Ranking");


    useEffect(() => {
        setHeader({
            title: "Daten & Tabelle",
            values: ["Ranking", "Statistik", "Tippvergleich", "Vergleich Spezialwetten"],
            activeValue: activeStage,
            onValueChange: setActiveStage
        });
    }, [activeStage, setActiveStage, setHeader]);


    switch (activeStage) {
        case "Ranking": return <div><Ranking /></div>
        case "Statistik": return <div><AllStats /></div>
        case "Tippvergleich": return <div><AllBets /></div>
        case "Vergleich Spezialwetten": return <div><AllSpecialBets /></div>
        default: return <></>
    }
}

