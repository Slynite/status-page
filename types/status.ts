import { Incident } from "./incident";

export interface Status {
    status: string;
    message?: string;
    servicesUp: number;
    servicesDown: number;
    services: Service[];
    incidents: Incident[];
    categories: Category[];
}

export interface Service {
    name: string;
    status: Label;
    category: string;
}


export interface Label {
    name: "operational" | "major outage" | "partial outage" | "performence issues" | "maintenance" | "resolved",
    description: string,
}

export interface Category {
    name: string,
    services?: Service[],
}