export function formatDate(iso) {
    return new Date(iso).toLocaleString("de-DE", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

export function formatDateWithoutTime(iso) {
    return new Date(iso).toLocaleString("de-DE", {
        dateStyle: "medium",
    });
}

export function formatDateForTimeOnly(iso) {
    return new Date(iso).toLocaleString("de-DE", {
        timeStyle: "short",
    });
}