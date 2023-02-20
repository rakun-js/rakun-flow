import { Fields, RakunFlowParamsBuild } from "./interface";
export declare class RakunFlowParamsImpl<P> implements RakunFlowParamsBuild<P> {
    private path;
    private fields;
    constructor(path: string, fields: Fields<P>);
    encode(params: P): string;
}
