export const getParams = (search: string) => {
  return new URLSearchParams(search)
}

export const wait = (time: number) => {
  return new Promise(resolve => setTimeout(() => resolve(true), time))
}
