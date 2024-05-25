export interface User {
  id?: number
  firstName?: string
  lastName?: string
  phone?: string
  birthdate?: string
  addressDto?: AddressDto
  role?: string
  email?: string
  password?: string
  confirmPassword?: string
}

interface AddressDto {
  street?: string | undefined
  building?: string | undefined
  numberApartment?: string | undefined
  indexNum?: string | undefined
  country?: string | undefined
  city?: string | undefined
}
