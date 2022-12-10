
import { RakunFlowSelectorStatic } from "../interface";
import { RakunFlowSelectorStateImpl } from "./state";
import { RakunFlowSelectorValueImpl } from "./value";

export const createSelector: RakunFlowSelectorStatic = (config) => {

    if ("set" in config) {
        return new RakunFlowSelectorStateImpl(config, new RakunFlowSelectorValueImpl(config)) as any;
    } else {

        return new RakunFlowSelectorValueImpl(config) as any;
    }

}