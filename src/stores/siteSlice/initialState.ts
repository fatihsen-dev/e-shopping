export const initialState: SiteState = {
  darkMode: localStorage.getItem("theme") ? JSON.parse(`${localStorage.getItem("theme")}`) : false,
  status: null,
  address: localStorage.getItem("address") ? JSON.parse(`${localStorage.getItem("address")}`) : [],
}
