export interface HomePageProduct {
  id: string
  url: string
  description: string
}

export interface HomePageProductState {
  products: HomePageProduct[]
  loading: boolean
  error: string | null
}
