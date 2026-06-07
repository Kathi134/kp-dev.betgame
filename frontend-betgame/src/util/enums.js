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

export { stageToString };