const blogs = [
  {
    id: 1,
    title: "React Basics",
    author: "John Doe",
    url: "https://example.com/react-basics",
    likes: 12,
  },
  {
    id: 2,
    title: "Understanding JavaScript Closures",
    author: "Jane Smith",
    url: "https://example.com/js-closures",
    likes: 25,
  },
  {
    id: 3,
    title: "Getting Started with Node.js",
    author: "Alex Johnson",
    url: "https://example.com/nodejs",
    likes: 18,
  },
  {
    id: 4,
    title: "Introduction to TypeScript",
    author: "Emily Brown",
    url: "https://example.com/typescript",
    likes: 31,
  },
  {
    id: 5,
    title: "REST API Design",
    author: "Michael Wilson",
    url: "https://example.com/rest-api",
    likes: 9,
  },
  {
    id: 6,
    title: "Understanding PostgreSQL",
    author: "Sarah Davis",
    url: "https://example.com/postgresql",
    likes: 42,
  },
  {
    id: 7,
    title: "Docker for Beginners",
    author: "David Miller",
    url: "https://example.com/docker",
    likes: 27,
  },
  {
    id: 8,
    title: "Git and GitHub Workflow",
    author: "Lisa Anderson",
    url: "https://example.com/git-github",
    likes: 15,
  },
  {
    id: 9,
    title: "Testing JavaScript Applications",
    author: "Robert Taylor",
    url: "https://example.com/javascript-testing",
    likes: 36,
  },
  {
    id: 10,
    title: "Building Full Stack Applications",
    author: "Chris Martin",
    url: "https://example.com/full-stack",
    likes: 50,
  },
];

export const getBlogs = () => {
  return blogs;
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

type Blog = (typeof blogs)[0];
type BlogWitoutId = Omit<Blog, "id">;

export const addBlogs = (data: BlogWitoutId) => {
  blogs.push({
    id: blogs.length + 1,
    ...data,
  });
};

export const increaseLike = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);
  if (blog) {
    blog.likes++;
  }
};
