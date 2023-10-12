import { Incident } from "./incident";
import { Status } from "./status";

export interface ApiResponse{
    status: 'success' | 'error';
    message?: string;
    data?: Incident | Status;
}