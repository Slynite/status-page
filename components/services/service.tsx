import { Service as stype } from "@/types/status";

export default function Service({ service }: { service: stype}) {
    return(
        <div className='bg-zinc-700 rounded-lg p-3 grid grid-cols-2'>
            <p>{ service.name }</p>
            <span className={`text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded justify-self-end`}
            style={{color: '#' + service.color}} >
                <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`}
                    style={{backgroundColor: '#' + service.color}} />
                    <span className={`relative inline-flex rounded-full h-3 w-3`}
                    style={{backgroundColor: '#' + service.color}} />
                </span>
                <p className="ml-1">
                    { service.status }
                </p>
            </span>
          </div>
    )
}