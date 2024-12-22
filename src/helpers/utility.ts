export const formatFormKeys = (field_name: string) => {
  return `${field_name.replace(/_/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}`
}
