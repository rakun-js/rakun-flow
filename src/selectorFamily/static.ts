
import { RakunFlowParamsImpl } from "../param/params";
import selector from "../selector";
import { RakunFlowSelectorFamilyStatic } from "./interface";

const selectorFamily: RakunFlowSelectorFamilyStatic = (config: any) => {
    return (params) => {
        const paramsBuild = new RakunFlowParamsImpl<typeof params>(config.path, config.params)
        if ("set" in config) {
            return selector({
                get: config.get(params),
                path: paramsBuild.encode(params),
                set: (v: any) => config.set(params, v)
            }) as any;
        } else {
            return selector({
                get: config.get(params),
                path: paramsBuild.encode(params)
            }) as any;
        }
    }
}
export default selectorFamily;