export function isServiceStateLabel({ name }: { name: string }) {
    return name === "operational" || name === "major outage" || name === "partial outage" || name === "performence issues" || name === "maintenance";
}

export function isNotOperational({ name }: { name: string }) {
    return name !== "operational";
}

export function getStateColor(name: "operational" | "major outage" | "partial outage" | "performence issues" | "maintenance" | "resolved") {
    switch (name) {
        case "operational":
            return "state-operational";
        case "major outage":
            return "state-majorOutage";
        case "partial outage":
            return "state-partialOutage";
        case "performence issues":
            return "state-performenceIssues";
        case "maintenance":
            return "state-maintenance";
        case "resolved":
            return "state-operational";
    }
}

export function getPingColor(name: "operational" | "major outage" | "partial outage" | "performence issues" | "maintenance" | "resolved") {
    switch (name) {
        case "operational":
            return "ping-operational";
        case "major outage":
            return "ping-majorOutage";
        case "partial outage":
            return "ping-majorOutage";
        case "performence issues":
            return "ping-majorOutage";
        case "maintenance":
            return "ping-majorOutage";
        case "resolved":
            return "ping-operational";
    }
}

export function isIncident({ name }: { name: string }): boolean {
    return name === "incident";
}