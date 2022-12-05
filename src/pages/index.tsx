const posts = [
  {
    title: 'Pepper',
    href: '/recipes',
    category: { name: '', href: '#' },
    description: '여러 가지 레시피를 다양한 검색 필터로 검색할 수 있다.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Sunguk Woo',
      href: 'https://github.com/woosunguk',
      imageUrl: 'https://lh3.googleusercontent.com/a/ALm5wu1UVJqBYA5Qw7jty_5Q0sZKr76Xa9yzliLz_O6DEw=s96-c',
    },
  },
  {
    title: '32 Doors',
    href: '/32doors',
    category: { name: 'Components', href: '#' },
    description: '32가지 MUI 커스텀 컴포넌트 구경하기',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '4 min',
    author: {
      name: 'Sunguk Woo',
      href: 'https://github.com/woosunguk',
      imageUrl: 'https://lh3.googleusercontent.com/a/ALm5wu1UVJqBYA5Qw7jty_5Q0sZKr76Xa9yzliLz_O6DEw=s96-c',
    },
  },
  {
    title: 'Seoul UI',
    href: '/buttons/use-imperative-handle',
    category: { name: 'Button', href: '#' },
    description: `라이브러리 없이 컴포넌트를 구현해보자! - 일단 Button`,
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl: 'https://media.timeout.com/images/105240244/750/422/image.jpg',
    readingTime: '4 min',
    author: {
      name: 'Sunguk Woo',
      href: 'https://github.com/woosunguk/seoului',
      imageUrl: 'https://lh3.googleusercontent.com/a/ALm5wu1UVJqBYA5Qw7jty_5Q0sZKr76Xa9yzliLz_O6DEw=s96-c',
    },
  },
]

export default function Example() {
  return (
    <div className="relative px-4 pt-16 pb-20 bg-gray-50 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Pepper</h2>
          <p className="max-w-2xl mx-auto mt-3 text-xs text-gray-500 sm:mt-4">요리 레시피 검색 사이트</p>
        </div>
        <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="flex-shrink-0">
                <img className="object-cover w-full h-48" src={post.imageUrl} alt="" />
              </div>
              <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                <div className="flex-1">
                  <p className="text-xs font-medium text-cyan-800">
                    <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p>
                  <a href={post.href} className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    <p className="mt-3 text-xs text-gray-500">{post.description}</p>
                  </a>
                </div>
                <div className="flex items-center mt-6">
                  <div className="flex-shrink-0">
                    <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <img className="w-10 h-10 rounded-full" src={post.author.imageUrl} alt="" />
                    </a>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      <a href={post.author.href} className="hover:underline">
                        {post.author.name}
                      </a>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readingTime} read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
