import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { counterSlice } from "../features/counter/counterSlice"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import { userSlice } from "../features/auth/userSlice"
import { productSlice } from "../features/products/productSlice"
import { profileSlice } from "../pages/home/profileSlice"
import { cartSlice } from "../components/cart/cartSlice"
import { careerSlice } from "../components/form/slice/careersSlise"
import { projectSlice } from "../components/form/slice/projectsSlice"
import { whoWeAreSlice } from "../components/form/slice/whoWeAreSlice"
import { contactInfoSlice } from "../components/contactForm/slice/contactInfoSlice"
import { questionSlice } from "../components/contactForm/slice/questionSlice"

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
const rootReducer = combineSlices(
  counterSlice,
  quotesApiSlice,
  userSlice,
  productSlice,
  profileSlice,
  cartSlice,
  careerSlice,
  projectSlice,
  whoWeAreSlice,
  contactInfoSlice,
  questionSlice
)
// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>

// The store setup is wrapped in `makeStore` to allow reuse
// when setting up tests that need the same store config
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(quotesApiSlice.middleware)
    },
    preloadedState,
  })
  // configure listeners using the provided defaults
  // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
