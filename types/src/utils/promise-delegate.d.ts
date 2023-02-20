export type Deferred<R> = {
    promise: Promise<R>;
    resolve: (value: R | PromiseLike<R>) => void;
    reject: (reason?: any) => void;
};
declare const defer: <R>() => Deferred<R>;
export default defer;
