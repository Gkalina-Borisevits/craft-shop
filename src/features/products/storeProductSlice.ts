import { addStoreProduct, fetchStoreProducts } from "./api/storeIndex"
import type { StoreProduct, StoreProductState } from "./types/StoreProduct"
import { createAppSlice } from "../../app/createAppSlice"

const initialState: StoreProductState = {
  products: [],
  loading: false,
  error: null,
}

export const storeProductSlice = createAppSlice({
  name: "products",

  initialState,

  reducers: create => ({
    addProduct: create.asyncThunk(
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
        rejected: state => {
          state.loading = false
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

export const { addProduct, getStoreProducts } = storeProductSlice.actions
export const { selectProduct } = storeProductSlice.selectors

//   export const storeProductsSlice = createAppSlice({
//     name: "storeProducts",
//     initialState,

//     reducers: create => ({
//         addNewStoreProduct: create.asyncThunk(
//         async (formData: StoreProduct) => {
//           const response = await addStoreProduct(formData)
//           return response
//         },
//         {
//           pending: state => {
//             state.loading = true
//             state.error = null
//           },
//           fulfilled: (state, action) => {
//             state.loading = false
//             state.products.push();
//           },
//           rejected: state => {
//             state.loading = false
//           },
//         },
//       ),
//   getStoreProducts: create.asyncThunk(
//     async (formData: StoreProduct) => {
//       const response = await fetchStoreProducts()
//       return response
//     },
//     {
//       pending: state => {
//         state.loading = true
//         state.error = null
//       },
//       fulfilled: (state, action) => {
//         state.loading = false
//         state.products = action.payload
//       },
//       rejected: state => {
//         state.loading = false
//       },
//     },
//   ),
//     }
// )

// selectors: {
//   selectProducts: state => state.products,
// },
//   })

//   export const { addStoreProduct, getStoreProducts } = storeProductsSlice.actions

//   export const { selectProducts } = storeProductsSlice.selectors

//   export const addNewStoreProduct = createAsyncThunk(
//     'storeProducts/addNewStoreProduct',
//     async (formData: StoreProduct) => {
//       const response = await addStoreProduct(formData);
//       return response;
//     }
//   );

//   export const getStoreProducts = createAsyncThunk(
//     'storeProducts/getStoreProducts',
//     async () => {
//       const response = await fetchStoreProducts();
//       return response;
//     }
//   );

//   const storeProductSlice = createSlice({
//     name: 'storeProducts',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//       builder
//         .addCase(addNewStoreProduct.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(addNewStoreProduct.fulfilled, (state, action) => {
//           state.loading = false;
//           state.products.push(action.payload);
//         })
//         .addCase(addNewStoreProduct.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message || 'Failed to add store product';
//         })
//         .addCase(getStoreProducts.pending, (state) => {
//           state.loading = true;
//           state.error = null;
//         })
//         .addCase(getStoreProducts.fulfilled, (state, action) => {
//           state.loading = false;
//           state.products = action.payload;
//         })
//         .addCase(getStoreProducts.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.error.message || 'Failed to fetch store products';
//         });
//     },
//   });

//   export const selectStoreProducts = (state: { storeProducts: StoreProductState }) => state.storeProducts.products;
//   export const selectStoreProductsLoading = (state: { storeProducts: StoreProductState }) => state.storeProducts.loading;
//   export const selectStoreProductsError = (state: { storeProducts: StoreProductState }) => state.storeProducts.error;

//   export default storeProductSlice.reducer;
