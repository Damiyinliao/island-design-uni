# island-design-uni

一个轻量的 `uni-app` 组件库骨架，按 `wot-design-uni` 的思路整理成纯组件库形态，不包含 demo 页面、文档站或业务代码。

当前内置组件：

- `IslandScroll`

## 目录结构

```text
island-design-uni
├─ scripts
├─ src
│  ├─ components
│  ├─ global.d.ts
│  └─ index.ts
├─ env.d.ts
├─ package.json
├─ package.publish.json
└─ tsconfig.json
```

## 开发

```bash
pnpm install
pnpm run typecheck
pnpm run build
```

构建后会生成 `lib` 目录。这个目录就是实际用于发布到 npm 的包内容。

平时你主要只需要关注 `src/components`，新增组件时直接在里面创建自己的组件目录即可。

## 发布

```bash
pnpm run build
cd lib
npm publish
```

## 在 uni-app 项目中使用

推荐方式是按需引入：

```vue
<script setup lang="ts">
import { IslandScroll } from 'island-design-uni'
</script>

<template>
  <IslandScroll
    :loading="loading"
    :load-done="loadDone"
    :reset-key="activeTab"
    @refresh="handleRefresh"
    @load="handleLoad"
  >
    <view v-for="item in list" :key="item.id">{{ item.title }}</view>
  </IslandScroll>
</template>
```

也支持作为插件注册：

```ts
import { createSSRApp } from 'vue'
import App from './App.vue'
import IslandDesignUni from 'island-design-uni'

export function createApp() {
  const app = createSSRApp(App)
  app.use(IslandDesignUni)

  return { app }
}
```

## 组件说明

`IslandScroll` 是一个通用滚动加载容器，提供：

- 触顶刷新事件 `refresh`
- 触底或点击文字加载事件 `load`
- 数据源切换后自动回到顶部
- 底部占位和安全区预留

它已经移除了业务 store、别名路径和 `taro-text` 依赖，可以直接作为公共组件发布。

优先使用 `resetKey` 来标记“数据源切换”。`dataTotal` 只作为兼容字段保留，更适合传总量或重置后的数量，不建议直接传当前列表长度。
