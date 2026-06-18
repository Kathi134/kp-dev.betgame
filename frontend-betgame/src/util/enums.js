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
        default:
            break;
    }
}

function betGroupKeyToString(key) {
    switch (key) {
        case "URGENT": return "Nächste Spiele"
        case "SPECIAL": return "Spezialtipps"
        case "PAST": return "Vergangene Spiele"
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
    GROUP_A_WINNER: "Wer gewinnt Gruppe A?",
    GROUP_B_WINNER: "Wer gewinnt Gruppe B?",
    GROUP_C_WINNER: "Wer gewinnt Gruppe C?",
    GROUP_D_WINNER: "Wer gewinnt Gruppe D?",
    GROUP_E_WINNER: "Wer gewinnt Gruppe E?",
    GROUP_F_WINNER: "Wer gewinnt Gruppe F?",
    GROUP_G_WINNER: "Wer gewinnt Gruppe G?",
    GROUP_H_WINNER: "Wer gewinnt Gruppe H?",
    GROUP_I_WINNER: "Wer gewinnt Gruppe I?",
    GROUP_J_WINNER: "Wer gewinnt Gruppe J?",
    GROUP_K_WINNER: "Wer gewinnt Gruppe K?",
    GROUP_L_WINNER: "Wer gewinnt Gruppe L?",

    PLACE_1: "Wer wird Weltmeister?",
    PLACE_2: "Wer wird Platz 2?",
    PLACE_3: "Wer wird Platz 3?",
    PLACE_4: "Wer wird Platz 4?",

    TOP_SCORER_TEAM: "Wer stellt den Torschützenkönig?",
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

const result = {
    HOME: 0,
    DRAW: 1,
    AWAY: 2
}

export { stageToString, STAGE_ORDER, specialBetTypeLabel, specialBetGroupLabel, SPECIAL_BET_GROUP_ORDER, betGroupKeyToString, result };