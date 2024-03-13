
type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';

interface TypeMethod<T> {
  (): T;
}

type CustomizeType<T> = T | Promise<T> | TypeMethod<T> | TypeMethod<Promise<T>>;

interface Header {
    [arg:string] : any;
    "Content-Type"?:CustomizeType<"application/json" | "text/html; charset=utf-8" | "application/x-www-form-urlencoded">;
    "Authorization"?:CustomizeType<string>;
}

interface Api {
    header?:Header,
    request?:Object,
    response?:Object
}

type RQType<A extends Api> = A['request']; 

type HeaderstType<A extends Api> = CustomizeType<A['header']>; 

type RPType<A extends Api> = A['response']; 

type AllCustomizeType<A> = A extends object

? CustomizeType<{
    [key in keyof A]: A[key] extends object ? AllCustomizeType<A[key]> : CustomizeType<A[key]>;
}>
: A;

type Data<A extends Api> = {
  [key in keyof Omit<A, "response">]: (key extends "header"
    ? AllCustomizeType<A[key]>
    : A[key]
  );
};

type Args0<T extends Data<Api>> = [data?:T['request'],header?:T['header']]

type Args1<T extends Data<Api>> = [data:T['request'],header?:T['header']]

type Args2<T extends Data<Api>> = [data:T['request'] | null,header:T['header']]

type Args3<T extends Data<Api>> = [data:T['request'],header:T['header']]

type DataOrHeader<T extends Data<Api>> = (T extends { request: any } ? true : false) | (T extends { header: any } ? true : false) extends false ? 
Args0<T> : (T extends { request: any } ? false : true) | (T extends { header: any } ? false : true) extends false ? Args3<T> :
(T extends { request: any } ? false : true) extends false ? Args1<T> : Args2<T>;

interface ResponseData<A extends Api> {
    success:boolean,
    message:string,
    code:number,
    data:RPType<A>
}