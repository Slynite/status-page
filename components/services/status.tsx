import Link from "next/link";

export default function Status({ servicesDown } : { servicesDown: number}) {

    if (servicesDown > 0 && servicesDown < 3) {
        return(
            <div className='bg-blue-500 rounded-lg p-3 mb-6'>
                <p>Some systems are experiencing issues.</p>
            </div>
        )
    } else if (servicesDown > 2) {
        return(
            <div className='bg-red-500 rounded-lg p-3 mb-6'>
                <p>Some systems are experiencing a major outage.</p>
            </div>
        )
    } else {
        return(
            <div className='bg-green-600 rounded-lg p-3 mb-6'>
                <p>All Systems operational.</p>
            </div>
        )
    }
}