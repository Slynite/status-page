import { convertStringToHtml } from "@/helper/incidentHelper";
import { isNotOperational, isServiceStateLabel } from "@/helper/stateHelper";
import { Incident } from "@/types/incident";
import { Service, Status, Label, Category } from "@/types/status";
import { NextResponse } from "next/server";
import { remark } from 'remark';
import html from 'remark-html';

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    let services: Service[] = [];
    let incidents: Incident[] = [];
    let categories: Category[] = [];
    let serviceWithProblems: number = 0;

    try{
        const servicesApiResponse: any = fetch('https://api.github.com/repos/slynite/status-page/issues?state=all&labels=component', {
            method: 'get',
        }).then((res) => res.json());
    
        const incidentsApiResponse: any = fetch('https://api.github.com/repos/slynite/status-page/issues?state=all&labels=incident', {
            method: 'get',
        }).then((res) => res.json());

        const [servicesApiData, incidentsApiData] = await Promise.all([servicesApiResponse, incidentsApiResponse]);

        if (servicesApiData.message || incidentsApiData.message) {
            if (servicesApiData.message.startsWith("API rate limit exceeded") || incidentsApiData.message.startsWith("API rate limit exceeded")) {
                throw new Error("Github API rate limit exceeded. Please try again later.");
            }
            throw new Error(servicesApiData.message || incidentsApiData.message);
        }
    
        for(const service of servicesApiData) {
            let title: string = service.title;
            let labels: Label[] = service.labels;
            let state: Label = labels.find((label: Label) => (isServiceStateLabel({ name: label.name }))) as Label;
            let category: Label = labels.find((label: Label) => (label.name.startsWith("category:"))) as Label;

            if (category != undefined) {
                let categoryIndex = categories.findIndex((cat: Category) => cat.name === category.description);
                if (categoryIndex === -1) {
                    categories.push({
                        name: category.description,
                        services: [],
                    } as Category);
                }
            }
    
            if (state != undefined) {
                if (isNotOperational({ name: state.name })) {
                    serviceWithProblems++;
                }
        
                services.push({
                    name: title,
                    status: {name: state.name, description: state.description},
                    category: category.description,
                } as Service);
            }
        }
    
        for(const incident of incidentsApiData) {
            let labels: Label[] = incident.labels;
            let state: Label = labels.find((label: Label) => isServiceStateLabel({ name: label.name })) as Label;
    
            if (state === undefined) {
                state = { name: "resolved", description: "Resolved" };
            }
            
            incidents.push({
                html_url: incident.html_url,
                title: incident.title,
                state: state,
                created_at: incident.created_at,
                closed_at: incident.closed_at,
                body: await convertStringToHtml(incident.body),
                updates: undefined,
            } as Incident);
        }
    } catch(e : any) {
        return NextResponse.json(
            {
                status: "error",
                message: e.message,
                servicesUp: 0,
                servicesDown: 0,
                services: [],
                incidents: [],
                categories: [],
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
            categories: categories,
        } as Status );
}