type Request = <T>(url: string, params: Record<string, any>, config: Record<string, any>) => Promise<T | any>

export interface Http {
    get: Request;
    post: Request;
    put: Request;
    delete: Request;
}
