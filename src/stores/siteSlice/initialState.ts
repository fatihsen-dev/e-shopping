export const initialState: SiteState = {
  darkMode: localStorage.getItem("theme") ? JSON.parse(`${localStorage.getItem("theme")}`) : false,
  status: null,
}
