
import { useEffect, useState, } from "react";
import { useHeader } from "../global/HeaderContext";
import Ranking from "./Ranking";
import AllBets from "./AllBets";
import MyStats from "./MyStats";
import "./stats.css"

export default function Stats() {
    const { setHeader } = useHeader();
    const [activeStage, setActiveStage] = useState("Ranking");


    useEffect(() => {
        setHeader({
            title: "Statistik",
            values: ["Ranking", "Meine Statistik", "Tippvergleich"],
            activeValue: activeStage,
            onValueChange: setActiveStage
        });
    }, [activeStage, setActiveStage, setHeader]);


    return (
        <div>
            {activeStage === "Ranking"
                ? <Ranking />
                : (activeStage === "Tippvergleich"
                    ? <AllBets />
                    : <MyStats />
                )
            }
        </div>
    );
}

