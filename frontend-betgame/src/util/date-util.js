export function formatDate(iso) {
    return new Date(iso).toLocaleString("de-DE", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}