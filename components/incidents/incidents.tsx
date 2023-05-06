'use client';

import { Incident as itype } from "@/types/status";
import Incident from "./incident";
import { useState } from "react";

export default function Incidents({ incidents }: { incidents: itype[]}) {
    const [showAll, setShowAll] = useState(false);
    const lastincidents = incidents.slice(0, 3);

    return(
    <div className='mb-4 w-full'>
        <p className='text-xl font-semibold'>Incidents</p>

        {showAll ? (
            <>
            {incidents.map((incident) => (
                <Incident key={incident.link} incident={incident} />
            ))}
            </>
        ) : (
            <>
            {lastincidents.map((incident) => (
                <Incident key={incident.link} incident={incident} />
            ))}
            </>
        )}

        {incidents.length > 3 ? (
            <div className="text-center">
                <button className='bg-black text-white border border-white hover:text-black hover:bg-white rounded-md px-4 py-2 mt-5 align-middle place-self-center' onClick={() => setShowAll(!showAll)}>
                    {showAll ? "Show less" : "Show all"}
                </button>
            </div>
        ) : (
            <></>
        )}
    </div>
    )
}