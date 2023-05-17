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
    status: string;
    category: string;
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
    description: string,
    color: string,
}

export interface Category {
    name: string,
    services?: Service[],
}