import { STAGE_ORDER } from "./enums";

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

export { groupByGroup, groupByStage };