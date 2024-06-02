import {
  addStoreProduct,
  fetchStoreProductById,
  fetchStoreProducts,
  updateStateProduct,
} from "./api"
import type { ProductState } from "./types/Product"
import { createAppSlice } from "../../app/createAppSlice"


const initialState: ProductState = {
  products: [],
  product: null,
  loading: false,
  error: null,
}

interface ThunkArg {
  formData: FormData
}


export const productSlice = createAppSlice({
  name: "storeProducts",

  initialState,
 
  reducers: create => ({
    addNewProduct: create.asyncThunk(
      async ({ formData }: ThunkArg, thunkAPI) => {
        try {
        const response = await addStoreProduct(formData)

        return response
      } catch (error) {
        return thunkAPI.rejectWithValue("Failed to update profile")
      }
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
    getProducts: create.asyncThunk(
      async _ => {
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
    updateProduct: create.asyncThunk(
      async ({ formData }: ThunkArg, thunkAPI) => {
        const response = await updateStateProduct(formData)

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
    getProductById: create.asyncThunk(
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
          state.error = action.payload as string
        },
      },
    ),
  }),

  selectors: {
    selectProducts: state => state.products,
    selectProductById: state => state.product,
  },
})

export const { addNewProduct, getProducts, getProductById, updateProduct } =
  productSlice.actions
export const { selectProducts, selectProductById } = productSlice.selectors
