import axios, { type AxiosResponse } from 'axios'
import { userStore, type User } from './user'

export default class ajax {
  user: User
  headers: Record<string, string> = {}
  APP_API_URL: string = import.meta.env.VITE_API_URL

  constructor() {
    this.setHeader('Accept', 'application/json')
    const userStoreObj = userStore()
    this.user = userStoreObj.getUser()
    if (this.user.authToken) {
      this.setHeader('Authorization', this.getAuthBearerHeader())
    }
  }

  setHeader(key: string, value: string): void {
    this.headers[key] = value
  }

  getAuthBearerHeader(): string {
    return `Bearer ${this.user.authToken}`
  }

  async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    const response = await axios.get(this.APP_API_URL + endpoint, { headers: this.headers })
    return response
  }

  async post<T>(endpoint: string, data: T): Promise<AxiosResponse> {
    const response = await axios.post(this.APP_API_URL + endpoint, data, { headers: this.headers })
    return response
  }

  async put<T>(endpoint: string, data: T): Promise<AxiosResponse> {
    const response = await axios.put(this.APP_API_URL + endpoint, data, { headers: this.headers })
    return response
  }

  async delete<T>(endpoint: string, data?: T): Promise<AxiosResponse> {
    const response = await axios.delete(this.APP_API_URL + endpoint, {
      headers: this.headers,
      data,
    })
    return response
  }
}
