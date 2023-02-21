type Address = {
  id: string
  name: string
  surname: string
  city: string
  district: string
  address: string
  phone: string
}

type SiteState = {
  darkMode: boolean
  status: boolean | null
  address: Address[]
}
