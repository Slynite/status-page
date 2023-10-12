import IncidentHeader from "../header/incidentHeader";

export function LoadingIncident() {
    return(
        <>
            <div className="self-start">
                <IncidentHeader />
            </div>
            <div className="animate-pulse w-full">
                <div className="w-8/12 h-8 bg-zinc-700 rounded" />
                <div className="w-5/12 h-4 bg-zinc-700 rounded mt-2" />
                <div className="flex"> 
                    <div className={`bg-zinc-700 h-4 w-3/12 mt-2 rounded`}/>
                    <div className={`bg-zinc-700 h-4 w-2/12 mt-2 rounded ml-2`}/>
                </div>
                <div className="w-5/12 h-6 mt-10 bg-zinc-700 rounded" />
                <div className="w-11/12 h-3 mt-2 bg-zinc-700 rounded" />
                <div className="w-11/12 h-3 mt-2 bg-zinc-700 rounded" />
                <div className="w-11/12 h-3 mt-2 mb-10 bg-zinc-700 rounded" />
            </div>
        </>
    )
}