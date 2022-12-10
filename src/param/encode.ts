import { Fields, FormatField } from "./interface";
export const encode = (fields: Fields<any>, fieldNameArray: string[], defualtValue: string): ((v: any) => string) => {
    const [fieldName, ...fieldNameArrayRest] = fieldNameArray
    if (fieldName) {
        if ('encode' in fields) {
            return (fields as FormatField<any>).encode;
        } else {
            const field = Object.keys(fields).filter(_fieldName => _fieldName == fieldName)[0]
            return encode(fields[field], fieldNameArrayRest, defualtValue)
        }
    }
    return () => defualtValue;
}

