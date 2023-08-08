export const sidebar = {
    "/guide/": [
      {
        text: "guide",
        collapsible: true,
        children: ["/guide/README.md", "/guide/getting-started.md"],
      },
      {
        text: "guide",
        collapsible: true,
        children: ["/guide/README.md", "/guide/getting-started.md"],
      },
    ],
    "/redBook/": [
      {
        text: "红宝书笔记",
        collapsible: false,
        children: [
          "/redBook/Chapter3.md"
          ,"/redBook/Chapter4.md"
          ,"/redBook/Chapter5.md"
          ,"/redBook/Chapter6.md"
          ,"/redBook/Chapter11.md"
          ,"/redBook/Chapter21.md"
          ,"/redBook/Chapter26.md"
        ]
      },
      {
        text: "对照笔记",
        collapsible: false,
        children:[
          "/redBook/notes/module.md"
        ]
      }

    ],
    "/vue2/": [
      "01组件事件绑定与解绑.md",
      "02全局事件总线.md"
    ],
    "/pages/spring/Spring/": [
      "Spring-aop.md",
    ],
    "/pages/spring/SpringBoot/": [
      {
        text:'',
        children: [
          "/pages/spring/SpringBoot/plan.md",
          "/pages/spring/SpringBoot/multProfile.md",
          "/pages/spring/SpringBoot/ModularDevelopment.md",
          "/pages/spring/SpringBoot/controller.md"
        ]
      }
    ],
    "/pages/linux/": [
      {
        text:'',
        children: [
          "/pages/linux/shell.md",
          "/pages/linux/docker.md"
        ]
      }
    ],
    "/pages/java/": [
      {
        text:'',
        children: [
        ]
      }
    ]
  }