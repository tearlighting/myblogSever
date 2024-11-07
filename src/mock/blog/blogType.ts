const blogTypes: Array<Partial<IBlogType>> = [
  {
    name: "HTML",
    order: 1,
  },
  {
    name: "JavaScript",
    order: 2,
  },
  {
    name: "CSS",
    order: 3,
  },
  {
    name: "TypeScript",
    order: 4,
  },
  {
    name: "Node",
    order: 5,
  },
  {
    name: "Webpack",
    order: 6,
  },

  {
    name: "Vue",
    order: 7,
  },
  {
    name: "React",
    order: 8,
  },
  {
    name: "Algorithm",
    order: 9,
  },
  {
    name: "Design Pattern",
    order: 10,
  },
  {
    name: "Browser",
    order: 11,
  },
  {
    name: "Network",
    order: 12,
  },
  {
    name: "NPM",
    order: 13,
  },
  {
    name: "Others",
    order: 14,
  },
]

import { blogTypeServiceInstance } from "@/service/blogService"

function initBlogTypes() {
  blogTypeServiceInstance.updateBlogTypes(blogTypes as any)
}

export { initBlogTypes }
