import { toast, type ToastOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const formatFormKeys = (field_name: string) => {
  return `${field_name
    .replace(/_/g, ' ')
    .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())}`
}

export const handleServerValidationErrors = (formKeys: Array<any>, errors: any) => {
  for (const key of formKeys) {
    if (key in errors) {
      toast.error(errors?.[key][0])
      break
    }
  }
}
