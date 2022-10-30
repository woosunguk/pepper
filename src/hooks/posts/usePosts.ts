import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchPosts = async (params) => {
  const { data } = await axios.get('/api/posts', {
    params,
  })

  return data
}

const usePosts = (params) => {
  return useQuery(['posts'], () => fetchPosts(params.filters), {
    enabled: false,
  })
}

export { usePosts, fetchPosts }
