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

export function calculateTimeLeft(iso) {
    const now = new Date();
    const target = new Date(iso);

    let diffMs = target - now;

    if (diffMs <= 0)
        return "0 Minuten";

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays > 1)
        return `${diffDays} Tage`;

    if (diffHours >= 1)
        return `${diffHours} Stunden`;

    return `${diffMinutes} Minuten`;
}