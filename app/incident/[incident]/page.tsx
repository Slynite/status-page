"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, CheckCircleIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import IncidentState from "@/components/incidents/incidentState";
import TimelineItems from "@/components/timeline/timelineItems";
import useSWR from "swr";
import { getFormattedDate } from "@/helper/incidentHelper";
import { ApiResponse } from "@/types/api";
import { Incident as IncidentType } from "@/types/incident";
import { LoadingIncident } from "@/components/loading/loadingIncident";

const fetcher = (url: string | URL) => fetch(url).then(r => r.json())

export default function Incident({ params }: { params: { incident: string } }) {
    const { data, error, isLoading } = useSWR<ApiResponse, Error>(`/api/incident/${params.incident}`, fetcher, {
        refreshInterval: 120000,
        revalidateOnFocus: false,
      }
    )

    if (isLoading) {
       return(<LoadingIncident />)
    }

    if (error || data != undefined && data.status != 'success') {
        return (
            <>
                <h1>There was an error fetching the data... Please contact <Link className={'underline'} href="mailto:support@slynite.com">support@slynite.com</Link> and try again later.</h1>
                <p>Error: {error?.message}</p>
            </>
        )
    }

    if (data) {
        const information: IncidentType = data.data as IncidentType;
        return (
            <div className="self-start">
                <div className="mb-10">
                    <div className="flex items-center mb-2">
                        <Image src="/logo512.png" alt="Slynite status Logo" width={45} height={45} />
                        <h1 className="text-xl ml-3">Slynite status</h1>
                    </div>
                    <Link href="/">
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium inline-flex items-center px-3 py-1.5 rounded">
                            <ArrowLeftIcon className="mr-2 w-4 h-4" /> Go to overview
                        </button>
                    </Link>
                </div>
                {information.state != null && <IncidentState state={information.state} />}
                <h1 className="text-2xl md:text-4xl mb-2 mt-2">{information.title}</h1>
                <div className="mt-1 mb-1">
                    <p className="mb-1">Created at {getFormattedDate(information.created_at)}</p>
                    {information.closed_at ? 
                        <span className={`text-green-600 bg-green-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-1 mb-1 md:mb-0`}><CheckCircleIcon className="mr-2 w-4 h-4" /> Resolved {getFormattedDate(information.closed_at.toLocaleString())}</span> 
                        :
                        <span className={`text-blue-400 bg-blue-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-1`}><InformationCircleIcon className="mr-2 w-4 h-4" /> We investigating the issue</span> 
                    }
                </div>
                <div className="mt-6">
                    <h2 className="text-xl">Description</h2>
                    <p className="mt-2 text-zinc-400" dangerouslySetInnerHTML={{ __html: information.body }} />
                </div>
    
                <div className="mt-6 mb-10">
                    <h2 className="text-xl">Update Timeline</h2>
                    
                    <ol className="mt-3 ml-2 relative border-l border-gray-200 dark:border-gray-700">                  
                        {information.updates?.map((update) => (
                            <TimelineItems key={update.html_url} type={update.type} timestamp={update.created_at} info={update.body} />
                        ))}
                    </ol>
    
                </div>
            </div>
        )
    }
}