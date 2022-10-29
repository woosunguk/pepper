import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useCreatePosts() {
  return useMutation({ mutationFn: () => axios.post('/api/posts') })
}
