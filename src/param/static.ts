import { FormatField } from "./interface"

const paramString: FormatField<string> = {
    encode: (v) => v,
    decode: (v) => v
}

export const param = { string: paramString }