import { Category } from "@/types/status";
import Service from "./service";

export default function ServiceCategory({ categoryWithServices } : { categoryWithServices : Category }) {
    return(
        <div className='border border-zinc-700 rounded-lg p-3'>
            <p>{ categoryWithServices.name }</p>
            <div className="mt-2 space-y-2">
                { categoryWithServices.services?.map((service) => (
                    <Service key={service.name} service={service} />
                ))}
            </div>
          </div>
    )
}
