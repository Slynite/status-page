import Link from "next/link";
import IncidentState from "./incidentState";
import { Incident as IncidentType } from "@/types/incident";
import { getFormattedDate } from "@/helper/incidentHelper";

export default function Incident({ incident }: { incident: IncidentType }) {

    const dateOptions: Intl.DateTimeFormatOptions = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Europe/Berlin', 
        timeZoneName: 'short' 
    };

    return (
    <Link href={`/incident/${incident.html_url.split("/").pop()}`}>
        <div className='bg-zinc-800 rounded-2xl p-6 text-base mt-4 transition ease-in-out duration-200 hover:scale-105'>
        <div className='mb-2'>
            <p className='font-semibold'>{incident.title}</p>
            {incident.closed_at !== null ? <span className={`text-green-600 bg-green-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-1`}>Resolved</span> : <></>}
            {incident.state != null && <IncidentState state={incident.state} />}
        </div>
        <div className='text-sm text-zinc-400'>
            <p className="mb-4" dangerouslySetInnerHTML={{ __html: incident.body }}/>
            <div className='md:flex font-light'>
                <p>Created: {getFormattedDate(incident.created_at)}</p>
                <svg aria-hidden="true" className="w-2 h-2 ml-1 mr-1 place-self-center invisible -m-1 md:visible" fill="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="45" cy="45" r="45" /></svg>
                <p>Resolved: {incident.closed_at !== null ? getFormattedDate(incident.closed_at) : "-"}</p>
            </div>
        </div>
        </div>
    </Link>
)}