export type ActionCreator<T = any> = (...args: any) => ({type: any, payload?: T})
export type Action = ReturnType<ActionCreator>