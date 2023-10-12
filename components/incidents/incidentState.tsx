import { getStateColor } from "@/helper/stateHelper";
import { Label } from "@/types/status";

export default function IncidentState({ state }: { state: Label }) {
    const color = getStateColor(state.name);
    return(
        <span 
            className={`text-xs font-medium px-2.5 py-0.5 rounded capitalize ${color}`}>
            {state.name}
        </span>
    )
}