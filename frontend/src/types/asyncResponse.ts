/**
 * @example
 * const myCall = async () => ({ test: 10 });
 * type MyCallResponse = InferAsyncResponse<typeof myCall>;
 */
export type InferAsyncResponse<T> = T extends Promise<infer R> ? R : unknown;
