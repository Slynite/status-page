import { convertStringToHtml } from "@/helper/incidentHelper";
import { isIncident, isServiceStateLabel } from "@/helper/stateHelper";
import { ApiResponse } from "@/types/api";
import { Incident, IncidentUpdates } from "@/types/incident";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const incidentId = params.id;

    try {
        const incident = await fetch(`https://api.github.com/repos/slynite/status-page/issues/${incidentId}`, {
            method: 'get',
        }).then((res) => res.json());

        const incidentComments = await fetch(`https://api.github.com/repos/slynite/status-page/issues/${incidentId}/comments`, {
            method: 'get',
        }).then((res) => res.json());

        const incidentData: Incident = {
            html_url: incident.html_url,
            title: incident.title,
            state: null,
            created_at: incident.created_at,
            closed_at: incident.closed_at,
            body: await convertStringToHtml(incident.body),
            updates: undefined,
        };

        let isIncidentIssue: boolean = false;

        for(const label of incident.labels) {
            if(isServiceStateLabel({ name: label.name })) {
                // @ts-ignore
                incidentData.state = { name: label.name, description: label.description };
            }

            if (isIncident({name: label.name})) {
                isIncidentIssue = true;
            }
        }

        if (!isIncidentIssue) {
            return new Response(JSON.stringify({error: "Incident id not found."}), { status: 400 });
        }

        let incidentUpdates: IncidentUpdates[] = [];

        incidentUpdates.push({
            created_at: incidentData.created_at,
            type: "created",
        })

        for (const comment of incidentComments) {
            incidentUpdates.push({
                html_url: comment.html_url,
                created_at: comment.created_at,
                type: "update",
                body: comment.body,
            });
        }

        if (incidentData.closed_at != null) {
            incidentUpdates.push({
                created_at: incident.closed_at,
                type: "resolved",
            });
        }

        incidentData.updates = incidentUpdates;

        return NextResponse.json({ status: "success", data: incidentData } as ApiResponse, { status: 200 });
    } catch(ex : any) {
      return NextResponse.json({ status: "error", message: ex.message } as ApiResponse, { status: 400 });
    }
}