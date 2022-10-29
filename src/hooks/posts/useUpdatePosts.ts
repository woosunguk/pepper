import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export function useUpdatePosts() {
  return useMutation({
    mutationFn: (queryData: any) =>
      axios.put(`/api/posts/${queryData.id}`, {
        title: queryData.title,
        posts: {
          lexical: queryData.lexical,
        },
      }),
  })
}
