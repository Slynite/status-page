import { isNotOperational, isServiceStateLabel } from "@/helper/stateHelper";
import { Service, Status, Incident, Label } from "@/types/status";
import { NextResponse } from "next/server";

export async function getStatus() {

    let services: Service[] = [];
    let incidents: Incident[] = [];
    let serviceWithProblems: number = 0;

    try{
        const servicesApiResponse: any = await fetch('https://api.github.com/repos/slynite/status-page/issues?state=all&labels=component', {
            method: 'get',
        }).then((res) => res.json());
    
        const incidentsApiResponse: any = await fetch('https://api.github.com/repos/slynite/status-page/issues?state=all&labels=incident', {
            method: 'get',
            next: { revalidate: 120 },
        }).then((res) => res.json());
    
        for(const service of servicesApiResponse) {
            let title: string = service.title;
            let labels: Label[] = service.labels;
            let state: Label = labels.find((label: Label) => (isServiceStateLabel({ name: label.name }))) as Label;
    
            if (isNotOperational({ name: state.name })) {
                serviceWithProblems++;
            }
    
            services.push({
                name: title,
                status: state.name,
                color: state.color
            } as Service);
        }
    
        for(const incident of incidentsApiResponse) {
            let title: string = incident.title;
            let description: string = incident.body;
            let labels: Label[] = incident.labels;
            let state: Label = labels.find((label: Label) => isServiceStateLabel({ name: label.name })) as Label;
    
            if (state === undefined) {
                state = { name: "resolved", color: "00ff00" };
            }
            
            incidents.push({
                name: title,
                state: state.name,
                description: description,
                date: incident.created_at,
                resolvedDate: incident.closed_at,
                link: incident.html_url,
                color: state.color,
            } as Incident);
        }
    } catch(e) {
        return NextResponse.json(
            {
                status: "error",
                message: e,
                servicesUp: 0,
                servicesDown: 0,
                services: [],
                incidents: [],
            } as Status
        );
    }

    return NextResponse.json(
        {
            status: "success",
            servicesUp: services.length - serviceWithProblems,
            servicesDown: serviceWithProblems,
            services: services,
            incidents: incidents,
        } as Status );
}
  