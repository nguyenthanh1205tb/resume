export const getParams = (search: string) => {
  return new URLSearchParams(search)
}

export const wait = (time: number) => {
  return new Promise<boolean>(resolve => setTimeout(() => resolve(true), time))
}
