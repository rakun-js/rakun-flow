import { Fields, RakunFlowParamsBuild } from "./interface";
import { encode } from "./encode";

export class RakunFlowParamsImpl<P> implements RakunFlowParamsBuild<P> {
    constructor(private path: string, private fields: Fields<P>) {

    }
    encode(params: P): string {
        return this.path.replace(/(:\w+)/g, param => {
            const fieldNameArray = param.substring(1).split(".")
            return encode(this.fields, fieldNameArray, param)(params);
        })
    }
}

