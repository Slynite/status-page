import { Label } from "./status";

export interface Incident {
    html_url: string,
    title: string,
    state: Label | null,
    created_at: string,
    closed_at: string | null,
    body: string,
    updates: IncidentUpdates[] | undefined,
}

export interface IncidentUpdates {
    html_url?: string,
    created_at: string,
    body?: string,
    type: "created" | "update" | "resolved",
}
