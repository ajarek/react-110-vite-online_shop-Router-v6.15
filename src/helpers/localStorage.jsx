export const saveStorage = (newData, name) => {
  const localStorageData = localStorage.getItem(name)
  let data
  localStorageData === null
    ? (data = [])
    : (data = JSON.parse(localStorageData))
  data.push(newData)
  localStorage.setItem(name, JSON.stringify(data))
}
export const saveStorageSingle = (newData, name) => {
  localStorage.setItem(name, JSON.stringify(newData))
}
export const fetchStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
export const deleteStorage = (key) => {
  return localStorage.removeItem(key)
}
