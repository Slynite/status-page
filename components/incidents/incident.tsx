import { Incident as itype } from "@/types/status";
import Link from "next/link";

export default function Incident({ incident }: { incident: itype }) {
    return (
    <Link href={incident.link} target="_blank">
        <div className='bg-zinc-800 rounded-2xl p-6 text-base mt-4 transition ease-in-out duration-200 hover:scale-105'>
        <div className=' mb-2'>
            <p className='font-semibold'>{incident.name}</p>

            {incident.state === "resolved" ? (
                <span className={`text-green-600 bg-green-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-1`}>
                    {incident.resolvedDate !== undefined ? "Resolved" : ""}
                </span>
            ) : (
                <>
                    <span className={`text-green-600 bg-green-900 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded mr-1`}>
                        {incident.resolvedDate !== undefined ? "Resolved" : ""}
                    </span>
                    <span 
                    className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded`}
                    style={{color: '#' + incident.color, backgroundColor: '#BF' + incident.color}} >
                        {incident.state}
                    </span>
                </>
            )}
        </div>
        <div className='text-sm text-zinc-400'>
            <p className="mb-2">{incident.description}</p>
            <div className='flex font-light'>
                <p>Created: {incident.date}</p>
                <svg aria-hidden="true" className="w-2 h-2 ml-1 mr-1 place-self-center" fill="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="45" cy="45" r="45" /></svg>
                <p>Resolved: {incident.resolvedDate}</p>
            </div>
        </div>
        </div>
    </Link>
)}