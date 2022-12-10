import { context } from "rakun";
import { RakunFlowSnapshot } from "./interface";

export const rakunFlowPathParentProvider = context.create<string | null>(null)
export const rakunFlowSnapshotProvider = context.create<RakunFlowSnapshot | null>(null)