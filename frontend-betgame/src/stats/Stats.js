
import { useEffect, useState, } from "react";
import { useHeader } from "../global/HeaderContext";


export default function Stats() {
    const { setHeader } = useHeader();
    const [activeStage, setActiveStage] = useState("Ranking");

    useEffect(() => {
        setHeader({
            title: "Statistik",
            values: ["Ranking", "Meine Statistik"],
            activeValue: activeStage,
            onValueChange: setActiveStage
        });
    }, [activeStage, setActiveStage, setHeader]);


    return (
        <div>
            hier gibt es nichts zu sehen...
        </div>
    );
}

