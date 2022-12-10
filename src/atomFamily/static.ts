
import atom from "../atom/static";
import { RakunFlowParamsImpl } from "../param/params";
import { RakunFlowAtomFamilyStatic } from "./interface";

const atomfamily: RakunFlowAtomFamilyStatic = (config: any) => {
    return (params) => {
        const paramsBuild = new RakunFlowParamsImpl<typeof params>(config.path, config.params)
        return atom({
            default: config.default(params),
            path: paramsBuild.encode(params)
        });
    }
}
export default atomfamily;