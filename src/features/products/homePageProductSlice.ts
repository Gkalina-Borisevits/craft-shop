import type {
  HomePageProduct,
  HomePageProductState,
} from "./types/HomePageProduct"
import { addHomePageProduct, fetchHomePageProducts } from "./api"
import { createAppSlice } from "../../app/createAppSlice"

const initialState: HomePageProductState = {
  products: [],
  loading: false,
  error: null,
}

export const homePageProductSlice = createAppSlice({
  name: "homePageProducts",

  initialState,

  reducers: create => ({
    addProduct: create.asyncThunk(
      async (formData: HomePageProduct) => {
        const response = await addHomePageProduct(formData)

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
        rejected: state => {
          state.loading = false
        },
      },
    ),
    getStoreProducts: create.asyncThunk(
      async _ => {
        const response = await fetchHomePageProducts()
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
        rejected: state => {
          state.loading = false
        },
      },
    ),
  }),

  selectors: {
    selectProduct: state => state.products,
  },
})

export const { addProduct, getStoreProducts } = homePageProductSlice.actions
export const { selectProduct } = homePageProductSlice.selectors
