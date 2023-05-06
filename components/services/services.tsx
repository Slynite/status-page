import { Service as stype } from "@/types/status";
import Service from "./service";
import Status from "./status";

export default function Services({ services, servicesDown }: { services: stype[], servicesDown: number }) {
return(
    <div className='bg-zinc-800 w-full rounded-2xl p-6 text-base mt-10 mb-10'>
        <Status servicesDown={servicesDown} />

        <div className="space-y-3">
            { services.map((service) => (
                <Service key={service.name} service={service} />
            ))}
        </div>
      </div>
)}