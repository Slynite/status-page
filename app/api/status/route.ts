import { isNotOperational, isServiceStateLabel } from "@/helper/stateHelper";
import { Service, Status, Incident, Label, Category } from "@/types/status";
import { NextResponse } from "next/server";
import { remark } from 'remark';
import html from 'remark-html';

export async function GET(request: Request) {
    let services: Service[] = [];
    let incidents: Incident[] = [];
    let categories: Category[] = [];
    let serviceWithProblems: number = 0;

    try{
        const servicesApiResponse: any = await fetch('https://api.github.com/repos/slynite/status-page/issues?state=all&labels=component', {
            method: 'get',
            cache: 'no-cache',
        }).then((res) => res.json());
    
        const incidentsApiResponse: any = await fetch('https://api.github.com/repos/slynite/status-page/issues?state=all&labels=incident', {
            method: 'get',
            cache: 'no-cache',
        }).then((res) => res.json());
    
        for(const service of servicesApiResponse) {
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
                    status: state.description,
                    category: category.description,
                    color: state.color
                } as Service);
            }
        }
    
        for(const incident of incidentsApiResponse) {
            let title: string = incident.title;
            let description: string = incident.body;
            let labels: Label[] = incident.labels;
            let state: Label = labels.find((label: Label) => isServiceStateLabel({ name: label.name })) as Label;
    
            if (state === undefined) {
                state = { name: "resolved", description: "Resolved", color: "16A349" };
            }

            const processedContent = await remark().use(html).process(description);
            const descriptionHtml = processedContent.toString();
            
            incidents.push({
                name: title,
                state: state.description,
                description: descriptionHtml,
                date: incident.created_at,
                resolvedDate: incident.closed_at,
                link: incident.html_url,
                color: state.color,
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
  