export interface Product {
  id: number
  files: File[] 
  title: string
  description: string
  size: string
  dimensions: string
  material: string
  price: number
  count: number
  pagesUrl?: string[] | undefined;
}

export interface ProductState {
  products: Product[]
  product: Product | undefined
  loading: boolean
  error: string | null
}
