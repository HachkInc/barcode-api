export type Pagination<T> = {
  page: number
  limit: number
  count?: number
  results?: T[]
}
