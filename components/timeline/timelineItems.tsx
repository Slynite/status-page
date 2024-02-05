import { getFormattedDate } from "@/helper/incidentHelper";
import { ArrowPathIcon, CheckIcon, FireIcon } from "@heroicons/react/24/outline";

export default function TimelineItems({type, timestamp, info, latest}: {type: 'created' | 'update' | 'resolved', timestamp: string, info?: string, latest?: boolean}) {
    let icon: JSX.Element;
    let color: string;
    let title: string;
    switch(type) {
        case 'created':
            icon = <FireIcon className="w-3 h-3 text-red-300" />
            color = "created"
            title = "Incident created"
            break;
        case 'update':
            icon = <ArrowPathIcon className="w-3 h-3 text-gray-300" />
            color = "updated"
            title = "Update"
            break;
        case 'resolved':
            icon = <CheckIcon className="w-3 h-3 text-green-300" />
            color = "resolved"
            title = "Incident resolved"
            break;
    }

    return(
        <li className="mb-10 ml-6">            
            <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 dark:ring-black ${color}`}>
                {icon}
            </span>
            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
            <time className="block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">On {getFormattedDate(timestamp)}</time>
            {info ? <p className="text-base font-normal text-gray-500 dark:text-gray-400">{info}</p> : ""}
        </li>
    )
}
