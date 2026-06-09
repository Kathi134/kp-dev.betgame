function stageToString(stage) {
    switch (stage) {
        case "GROUP_STAGE":
            return "Gruppenphase";
        case "LAST_32":
            return "16tel-Finale";
        case "LAST_16":
            return "8tel-Finale";
        case "QUARTER_FINALS":
            return "4tel-Finale";
        case "SEMI_FINALS":
            return "Halb-Finale";
        case "THIRD_PLACE":
            return "Spiel um Platz 3";
        case "FINAL":
            return "Finale";
        case "SPECIAL":
            return "Spezialwetten";
        default:
            break;
    }
}

const STAGE_ORDER = {
    GROUP_STAGE: 0,
    LAST_32: 1,
    LAST_16: 2,
    QUARTER_FINALS: 3,
    SEMI_FINALS: 4,
    THIRD_PLACE: 5,
    FINAL: 6,
};

const specialBetTypeLabel = {
    GROUP_A_WINNER: "Welches Team gewinnt Gruppe A?",
    GROUP_B_WINNER: "Welches Team gewinnt Gruppe B?",
    GROUP_C_WINNER: "Welches Team gewinnt Gruppe C?",
    GROUP_D_WINNER: "Welches Team gewinnt Gruppe D?",
    GROUP_E_WINNER: "Welches Team gewinnt Gruppe E?",
    GROUP_F_WINNER: "Welches Team gewinnt Gruppe F?",
    GROUP_G_WINNER: "Welches Team gewinnt Gruppe G?",
    GROUP_H_WINNER: "Welches Team gewinnt Gruppe H?",
    GROUP_I_WINNER: "Welches Team gewinnt Gruppe I?",
    GROUP_J_WINNER: "Welches Team gewinnt Gruppe J?",
    GROUP_K_WINNER: "Welches Team gewinnt Gruppe K?",
    GROUP_L_WINNER: "Welches Team gewinnt Gruppe L?",

    PLACE_1: "Welches Team wird Weltmeister?",
    PLACE_2: "Welches Team wird Platz 2?",
    PLACE_3: "Welches Team wird Platz 3?",
    PLACE_4: "Welches Team wird Platz 4?",

    TOP_SCORER_TEAM: "Welches Team stellt den Torschützenkönig?",
    GERMANY_FINAL_STAGE: "Wie weit kommt Deutschland?"
};

const specialBetGroupLabel = {
    GROUP: "Gruppensieger",
    OTHER: "Sonstige",
    PLACE: "Top 4 Platzierungen"
}

const SPECIAL_BET_GROUP_ORDER = {
    GROUP: 0,
    PLACE: 1,
    OTEHR: 2
};

export { stageToString, STAGE_ORDER, specialBetTypeLabel, specialBetGroupLabel, SPECIAL_BET_GROUP_ORDER };