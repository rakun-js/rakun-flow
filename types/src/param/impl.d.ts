import { Fields, ZoldyParamsBuild } from "./interface";
export declare class ZoldyParamsImpl<P> implements ZoldyParamsBuild<P> {
    private path;
    private fields;
    constructor(path: string, fields: Fields<P>);
    encode(params: P): string;
}
