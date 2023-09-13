export type Error = {
    message: string
};

export type APIResponse = {
    data?: number[],
    error?: Error
}