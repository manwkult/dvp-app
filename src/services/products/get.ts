import { Product } from '@/interfaces/products.interface'
import axios from '@/config/axios'

export default async (): Promise<Product[] | undefined> => {
  return await axios.get('/products', {})
    .then(response => {
      if (response.status === 200) {
        return response.data.data as Product[]
      }
    }).catch(error => {
      console.error(error)
      return undefined
    })
}
