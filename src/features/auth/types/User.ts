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
  street?: string
  building?: number | null
  numberApartment?: number | null
  indexNum?: string
  country?: string
  city?: string
}
