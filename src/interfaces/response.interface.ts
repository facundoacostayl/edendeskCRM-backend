interface Response {
    responseType: string,
    statusCode: number,
    message?: string,
    data?: []
}

export {Response as ResponseType};