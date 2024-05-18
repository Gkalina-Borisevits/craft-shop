import { addStoreProduct, fetchStoreProductById, fetchStoreProducts } from "./api/storeIndex"
import type { StoreProduct, StoreProductState } from "./types/StoreProduct"
import { createAppSlice } from "../../app/createAppSlice"

const initialState: StoreProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
}

export const storeProductSlice = createAppSlice({
  name: "storeProducts",

  initialState,

  reducers: create => ({
    addNewStoreProduct: create.asyncThunk(
      async (formData: StoreProduct) => {
        const response = await addStoreProduct(formData)

        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.products.push(action.payload)
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = action.payload as string
        },
      },
    ),
    getStoreProducts: create.asyncThunk(
      async (_) => {
        const response = await fetchStoreProducts()
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.products = action.payload
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = action.payload as string
        },
      },
    ),
    getStoreProductById: create.asyncThunk(
      async (id: string) => {
        const response = await fetchStoreProductById(id)
        return response
      },
      {
        pending: state => {
          state.loading = true
          state.error = null
        },
        fulfilled: (state, action) => {
          state.loading = false
          state.product = action.payload
        },
        rejected: (state, action) => {
          state.loading = false
          state.error = action.payload as string;
        },
      },
    ),
  }),

  selectors: {
    selectProducts: state => state.products,
    selectProductById: state => state.product
  },
})

export const { addNewStoreProduct, getStoreProducts, getStoreProductById } = storeProductSlice.actions
export const { selectProducts, selectProductById } = storeProductSlice.selectors
