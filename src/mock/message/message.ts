import { messageDaoInstance } from "@/dao/messageDao"
import { messageServiceInstance } from "@/service/messageService"

const message: Partial<IMessage> = {
  nickName: "nickName",
  content: "conntent",
  avatar: "avatar",
}

const avatars = [
  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
  "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
]
const blog = [
  {
    id: 1,
    comment: ["原来这就是HTTP", "なるほど", "+1", "good"],
  },
  {
    id: 2,
    comment: ["原来这就是Node", "nodeって侮らないな", "+1", "excellent"],
  },
  {
    id: 3,
    comment: ["谢谢博主", "知らなかったjs知識だ", "+1", "excellent"],
  },
  {
    id: 4,
    comment: ["谢谢博主", "css3便利ですね", "+1", "usefull"],
  },
  {
    id: 5,
    comment: ["谢谢博主", "これがwebpackの原理か", "+1", "usefull"],
  },
  {
    id: 6,
    comment: ["谢谢博主", "npm", "+1", "good"],
  },
]
export const initComment = () => {
  setTimeout(() => {
    const messages = []

    for (let item of blog) {
      messages.push(
        ...item.comment.map((content, i) => {
          const res = {
            blogId: item.id,
            content: "",
            nickName: "mock",
            avatar: "",
          }
          res.content = content
          res.avatar = avatars[i]
          return res
        })
      )
    }
    console.log(messages)

    messages.forEach((element) => {
      messageServiceInstance.addMessage(element)
    })
  }, 2000)
}

const messages = ["ようやっと作り終えたか", "頑張ったな", "不错哦", "good"]
export const initMessage = () => {
  setTimeout(() => {
    messages.map((m, i) => {
      messageDaoInstance.addMessage({
        nickName: "mock",
        content: m,
        avatar: avatars[i],
      })
    })
  }, 2000)
}
