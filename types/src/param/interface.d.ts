export type FormatField<T> = {
    encode(value: T): string;
    decode(str: string): T;
};
export type Fields<T> = FormatField<T> | {
    [P in keyof T]: Fields<T[P]>;
};
export interface RakunFlowParamsBuild<P> {
    encode(params: P): string;
}
