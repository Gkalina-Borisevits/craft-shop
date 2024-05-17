export interface StoreProduct {
  id: string
  imageFiles: (File | null)[]
  title: string
  description: string
  size: string
  dimensions: string
  material: string
  price: string
}

export interface StoreProductState {
  products: StoreProduct[]
  loading: boolean
  error: string | null
}
