import { STAGE_ORDER, SPECIAL_BET_GROUP_ORDER } from "./enums";

function groupByStage(matches) {
    const grouped = matches.reduce((acc, match) => {
        const key = match.stage ?? "UNKNOWN";
        if (!acc[key]) acc[key] = [];
        acc[key].push(match);
        return acc;
    }, {});

    return Object.fromEntries(
        Object.keys(grouped)
            .sort((a, b) => (STAGE_ORDER[a] ?? Number.POSITIVE_INFINITY) - (STAGE_ORDER[b] ?? Number.POSITIVE_INFINITY))
            .map(key => [key, grouped[key]])
    );
}

function groupByGroup(matches) {
    const grouped = matches.reduce((acc, match) => {
        const key = match.group ?? "UNKNOWN";
        if (!acc[key]) acc[key] = [];
        acc[key].push(match);
        return acc;
    }, {});
    const sortedKeys = Object.keys(grouped).sort((a, b) => a.localeCompare(b));
    const sortedGrouped = Object.fromEntries(sortedKeys.map((key) => [key, grouped[key]]));
    return sortedGrouped;
}

function groupByDate(matches) {
    const grouped = matches.reduce((acc, match) => {
        const key = match.deadline.split("T")[0];
        if (!acc[key]) acc[key] = [];
        acc[key].push(match);
        return acc;
    }, {});
    const sortedKeys = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));
    const sortedGrouped = Object.fromEntries(sortedKeys.map((key) => [key, grouped[key]]));
    return sortedGrouped;
}

function groupBySpecialBetGroup(definitions) {
    const grouped = definitions.reduce((acc, def) => {
        const groupType = def.type.includes("GROUP") ? "GROUP" : (def.type.includes("PLACE") ? "PLACE" : "OTHER")
        acc[groupType] = acc[groupType] || [];
        acc[groupType].push(def);
        return acc;
    }, {});
    return Object.fromEntries(
        Object.keys(grouped)
            .sort((a, b) => (SPECIAL_BET_GROUP_ORDER[a] ?? Number.POSITIVE_INFINITY) - (SPECIAL_BET_GROUP_ORDER[b] ?? Number.POSITIVE_INFINITY))
            .map(key => [key, grouped[key]])
    );
}

export { groupByGroup, groupByStage, groupBySpecialBetGroup, groupByDate };