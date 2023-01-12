import { Repo } from "./repo";

export interface Job {
    id: number,
    assigned_runner: string,
    triggered_by: string,
    start: string,
    end: string,
    status: number,
    repo: Repo | null
}
