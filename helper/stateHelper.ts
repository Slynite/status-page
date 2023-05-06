export function isServiceStateLabel({ name }: { name: string }) {
    return name === "operational" || name === "major outage" || name === "partial outage" || name === "performence issues" || name === "maintenance";
}

export function isNotOperational({ name }: { name: string }) {
    return name !== "operational";
}