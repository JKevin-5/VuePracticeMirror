---
layout: cover
background: /background.jpg
transition: slide-left
css: unocss
---

# 升职论文

### ——— 关于个人工作的总结与展望

<div class="font-serif text-base right-20 bottom-10 absolute">
  <span>发表人：蒋煜楷</span>
  <p>作成日：2023年3月19日</p>
</div>

---

# 目录

1. 前言
2. 对过往的总结
3. 对未来的展望
4. 结语

---
layout: two-cols
---

<template v-slot:default>

# 一、前言

《软件项目管理学》的里程碑(Milestone)，是项目中完成阶段性工作的标志，是一个任务结束的明确的起止点。

标志着上一个阶段的结束、下一个阶段开始。
</template>

<template v-slot:right>

![Local Image](/milestone.jpg)

</template>

<!--
1、如软件项目管理学中里程碑(Milestone)意义一般，是项目中完成阶段性工作的标志，是一个任务结束的明确的起止点。

2、通过基于项目现状的现实需求对未来的工作进行合理的展望，设定合理的个人工作预期，依照早期规划明确正确的努力及进步方向，从而更高效驱动自身发展与提高。
-->

---

# 二、对过往的总结

### 2.1、松元项目总结

- RPA
- 接口与Analysis表单

<!--
分为两个点来说

1、RPA

2、接口与Analysis表单
-->

---
layout: two-cols
---

<template v-slot:default>

# 2.1、RPA
RPA 是什么？

<p class="p-r-5">机器人流程自动化（Robotic process automation）简称RPA，是以软件机器人及人工智能（AI）为基础的业务流程自动化技术。</P>


<p class="p-r-5">在传统的工作流自动化技术工具中，会由程序设计师产生自动化任务的动作列表，并且会用内部的应用程序接口（API）或是专用的脚本语言作为和后台系统之间的接口。有些软件可能没有这类用途的API，而RPA可以降低其自动化的门槛。相较之下，RPA系统会观察使用者在应用软件中图形用户界面（GUI）所进行的工作，并且直接在GUI上自动重复这些工作。</p>

</template>
<template v-slot:right>

![Local Image](/uipath-2.png)

</template>

<!--RPA工具在技术上类似图形用户界面测试工具，这些测试工具也会自动和图形用户界面互动，并且通常是先由使用者示范其流程，再由这些工具来重现。和这类测试工具不同的地方在于，RPA工具可以在多个应用程序之间处理、交换数据，例如接收内含发票的电子邮件、取得其中数据，然后输入到簿记系统中。-->

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
layout: two-cols
---

<template v-slot:default>

# 2.1、RPA
为什么选择RPA

<p class="p-r-5">刚进公司的时候，跟进的第一块业务是松元工厂的RPA模块，用了一两周的时间，从零开始到接手松元RPA项目的维护和改进。起初，RPA的技术选择是因为松元公司对接的U8供应商无法提供相关接口。</p>

<p class="p-r-5">RPA主要是使用UIPATH这款软件进行实现类似脚本的可视化编程操作。和代码编程类似，得益于UIPATH给予的Windows统一的控制API，我们可以做到但不限于：数据库操作、本地配置文件读取、模拟点击、Windows进程管理、桌面快照等功能。通过可视化界面的任务动作编排，可以将原本需要员工手动录入系统的动作流程转换为RPA能理解的可执行程序。</p>

</template>
<template v-slot:right>

![Local Image](/uipath-1.png)

</template>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>
---

# 2.1、RPA
使用RPA的好处
| | |
|---|---|
|✅好处1|代替人工频繁输入|
|✅好处2|可以进行全天候、半监督工作|
|✅好处3|可以进行数据库交互，实现系统之间的互通|

<br/>
<br/>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

<!--
可视化的
-->
---

# 2.1、RPA
使用RPA的缺点
| | |
|---|---|
|❌用友系统升级|U8系统半夜升级或者是U8系统画面布局发生变化，UIPATH无法识别变动后的画面布局，导致RPA执行失败|
|❌Windows升级|UIPATH软件等不能正常启动，或Windows系统升级后bug等|
|❌用友账套限制|PA执行时相当于长期占用一个账套运行，导致RPA无法在白天执行，可能出现账套的抢占，影响其他用户正常工作|
|❌操作速度有上限|无法满足工厂日益增长的业务订单量，可能需要多台电脑的分批量的操作|
|❌遇到问题难以调试与复现|只能通过日志、录屏、邮件通知、脚本重跑的方式去调查问题|

问题还有很多...😵

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

---
layout: two-cols
---

<template v-slot:default>

# 2.1、RPA
RPA不止于RPA

周边知识点
- Windows的batch脚本编写
- Windows的定时任务
- pgcron的定时任务
- pgsql的存储过程
- Linux的crontab定时任务
- Linux的shell脚本编写
</template>

<template v-slot:right>

```batch
# 查看当前系统的所有进程
tasklist|find /i "%rpa%"
# 连接数据库
set PGPASSWORD=%password%
# for循环读取数据库结果
for /f "delims="  %%t in (
  'psql.exe -h %host% 
            -p %port%  
            -d %database% 
            -U %username% 
            -c "copy (%queueIcOutSql%) to STDOUT" '
  ) do (
    set result=%%t
)
```

</template>

<style>
h1 {
  background-color: #2B90B6;
  background-image: linear-gradient(45deg, #4EC5D4 10%, #146b8c 20%);
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>