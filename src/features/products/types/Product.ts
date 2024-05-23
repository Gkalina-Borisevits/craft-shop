export interface Product {
  id: string
  imageFiles: File[]
  title: string
  description: string
  size: string
  dimensions: string
  material: string
  price: string
  count?: string
}

export interface ProductState {
  products: Product[]
  product: Product | undefined
  loading: boolean
  error: string | null
}
