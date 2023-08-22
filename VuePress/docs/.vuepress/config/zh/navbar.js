export const navbar = [
    {
      text: "Intro",
      link: "/guide/whoAmI/"
    },{
      text: "网站黄页",
      link: "/guide/yellowPage/",
    },{
      text: "项目开发",
      link: "/pages/project/"
    },{
      text: "Tags",
      link: "/tags/"
    },
    {
      text: "前端笔记",
      children: [
        {
          text: "红宝书",
          link: "/redBook/", // 该元素将一直处于激活状态
          activeMatch: "/redBook/"
        },{
          text: "Vuepress",
          link: "/guide/",
        },{
          text: "Vue2",
          link: "/vue2/"
        }
      ],
    },{
      text: "后端笔记",
      children: [
        {
          text: "NodeJs",
          link: "/pages/node/",
        },{
          text: "Spring",
          link: "/pages/spring/",
        },{
          text: "Linux",
          link: "/pages/linux/"
        },{
          text: "Java",
          link: "/pages/java/"
        },{
          text: "设计模式",
          link: "/pages/method_pattern/",
        }
      ],
    }
]