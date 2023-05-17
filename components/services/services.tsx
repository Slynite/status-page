import { Category, Service as stype } from "@/types/status";
import Status from "./status";
import ServiceCategory from "./serviceCategory";

export default function Services({ services, categories, servicesDown }: { services: stype[], categories: Category[], servicesDown: number }) {

    let filteredServices: Category[] = []

    categories.forEach((category) => {
        filteredServices.push({
            name: category.name,
            services: []
        })
    })

    filteredServices.forEach((category) => {
        services.forEach((service) => {
            if (service.category == category.name) {
                category.services?.push(service)
            }
        })
    })
    
    return(
        <div className='bg-zinc-800 w-full rounded-2xl p-6 text-base mt-10 mb-10'>
            <Status servicesDown={servicesDown} />

            <div className="space-y-6">
                { filteredServices.map((category) => (
                    <ServiceCategory key={category.name} categoryWithServices={category} />
                ))}
            </div>
        </div>
    )
}