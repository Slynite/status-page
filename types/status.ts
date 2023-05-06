export interface Status {
    status: string;
    message?: string;
    servicesUp: number;
    servicesDown: number;
    services: Service[];
    incidents: Incident[];
}

export interface Service {
    name: string;
    status: string;
    color: string;
}

export interface Incident {
    name: string;
    state: string;
    description: string;
    date: string;
    resolvedDate: string | null;
    link: string;
    color: string;
}

export interface Label {
    name: string,
    color: string,
}