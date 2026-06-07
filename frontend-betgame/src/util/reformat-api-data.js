function groupByStage(matches) {
    return matches.reduce((acc, match) => {
        const key = match.stage ?? "UNKNOWN";
        if (!acc[key]) acc[key] = [];
        acc[key].push(match);
        return acc;
    }, {});
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