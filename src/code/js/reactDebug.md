# 记录React源码调试步骤



## 环境搭建



### 拉取代码

```shell
git clone https://github.com/facebook/react.git
```



目录结构

```shell
.
├── babel.config.js           # Babel的配置文件
├── dangerfile.js             # Dangerfile，用于自动化代码审查工具
├── fixtures                  # 测试用例和示例目录
│   ├── art                   # art渲染相关测试或示例
│   ├── attribute-behavior    # 元素属性行为相关测试或示例
│   ├── concurrent            # React并发模式相关测试或示例
│   ├── devtools              # React开发者工具相关测试或示例
│   ├── dom                   # DOM相关测试或示例
│   ├── eslint                # ESLint规则相关测试或示例
│   ├── expiration            # 可能和超时、过期相关的测试或示例
│   ├── fiber-debugger        # Fiber调试相关测试或示例
│   ├── fiber-triangle        # Fiber架构的三角示例（渲染）
│   ├── fizz                  # Fizz SSR renderer相关测试或示例
│   ├── fizz-ssr-browser      # Fizz SSR在浏览器环境的测试或示例
│   ├── flight                # React Flight相关测试或示例
│   ├── flight-browser        # React Flight在浏览器环境的测试或示例
│   ├── flight-esm            # React Flight的ESM版本测试或示例
│   ├── legacy-jsx-runtimes   # 旧版JSX运行时相关测试或示例
│   ├── nesting               # 组件嵌套相关测试或示例
│   ├── packaging             # 打包相关测试或示例
│   ├── scheduler             # 调度器相关测试或示例
│   ├── ssr                   # 服务器端渲染（SSR）相关测试或示例
│   ├── ssr2                  # 服务器端渲染的另一个测试或示例目录
│   └── stacks                # 栈跟踪或错误处理相关测试或示例
├── netlify.toml              # Netlify部署配置文件
├── packages                  # 包含多个包或子项目的目录
│   ├── dom-event-testing-library    # 针对DOM事件的测试库
│   ├── eslint-plugin-react-hooks    # React Hooks的ESLint插件
│   ├── internal-test-utils          # 内部测试工具
│   ├── jest-react                   # Jest针对React的测试工具
│   ├── react                        # React核心库
│   ├── react-art                    # React渲染器适用于艺术绘画类应用
│   ├── react-cache                  # React的缓存机制
│   ├── react-client                 # React客户端
│   ├── react-debug-tools            # React调试工具
│   ├── react-devtools               # React开发者工具
│   ├── react-devtools-core          # React开发者工具的核心包
│   ├── react-devtools-extensions    # React开发者工具的扩展包
│   ├── react-devtools-inline        # 内联版React开发者工具
│   ├── react-devtools-shared        # React开发者工具中共享的资源
│   ├── react-devtools-shell         # React开发者工具的shell环境
│   ├── react-devtools-timeline      # React开发者工具的时间线功能
│   ├── react-dom                    # React的DOM渲染器
│   ├── react-dom-bindings           # React DOM的额外绑定
│   ├── react-interactions           # 用于React的用户交互库
│   ├── react-is                     # 用于验证React元素的类型的库
│   ├── react-native-renderer        # React的原生渲染器
│   ├── react-noop-renderer          # 用于测试的React noop渲染器
│   ├── react-reconciler             # React协调器
│   ├── react-refresh                # React Fast Refresh功能
│   ├── react-server                 # React服务端渲染的库
│   ├── react-server-dom-esm         # React服务端DOM (ESM格式)
│   ├── react-server-dom-fb          # React服务端DOM (Facebook专用版本)
│   ├── react-server-dom-turbopack   # React服务端DOM (Turbopack版本)
│   ├── react-server-dom-webpack     # React服务端DOM (Webpack版本)
│   ├── react-suspense-test-utils    # React Suspense的测试工具
│   ├── react-test-renderer          # React组件渲染的测试工具
│   ├── scheduler                    # React的调度程序库
│   ├── shared                       # 多个包共享的公共代码或资源
│   ├── use-subscription             # React的订阅钩子
│   └── use-sync-external-store      # React的同步外部存储钩子
├── scripts                  # 包含构建脚本和工具的目录
│   ├── authors              # 作者相关脚本
│   ├── babel                # Babel转译相关脚本
│   ├── bench                # 性能基准测试脚本
│   ├── circleci             # CircleCI持续集成配置脚本
│   ├── devtools             # 开发者工具相关脚本
│   ├── error-codes          # 错误代码处理脚本
│   ├── eslint               # ESLint代码检查脚本
│   ├── eslint-rules         # 自定义ESLint规则脚本
│   ├── flow                 # Flow类型检查相关脚本
│   ├── git                  # Git相关操作脚本
│   ├── jest                 # Jest测试相关脚本
│   ├── perf-counters        # 性能计数器脚本
│   ├── prettier             # Prettier代码格式化脚本
│   ├── print-warnings       # 打印警告信息的脚本
│   ├── release              # 发布相关脚本
│   ├── rollup               # Rollup打包相关脚本
│   ├── shared               # 脚本中共享的资源或配置
│   └── tasks                # 其他自动化任务脚本
```



### 构建React

```shell
yarn  # 安装依赖
yarn run build-for-devtools # 进行项目的构建 
# 这里也可以使用如下命令，进行选择性构建
# yarn build react/index,react/jsx,react-dom/index,scheduler --type=NODE
```



完成后将生成一个build的文件夹包含如下文件

```shell
.
├── bundle-sizes.json			# 这个文件包含构建后的React各个bundle的大小信息。这是用于监控React库文件大小变化的，并且可以用来进行性能审查。
├── facebook-www 					# 此目录包含为Facebook的内部平台定制构建的React版本。Facebook有他们自己的Web基础设施和要求，这个目录里的构建是专门为适														配那个环境而定制的。	
├── oss-experimental			# “oss”代表“开源软件”。这个目录包含了构建的React实验性版本的包。实验性版本可能包括还未稳定的新功能和API，这些功能是为了														社区能够试验并提供反馈。
├── oss-stable						# 这个目录中存放的是构建的React稳定版的包。稳定版是向最终用户推荐使用的版本，这些版本经过了充分的测试，并被认为是稳定和安														全的。
├── oss-stable-semver			# 类似于oss-stable，但是可能遵循语义版本控制（Semantic Versioning，简称semver）的特定策略。这意味着包的版本号将明确														地表示出任何向后不兼容的更改、新功能或修复。
└── react-native					# 这个目录包含为React Native专门构建的React版本。React Native是一个允许你使用React构建原生移动应用的库，它使用的																React版本有些许不同，适配了移动端的特定环境和需求。
```



### 将使用的包进行连接

```shell
cd /build/oss-experimental # 这里选择带有实验性功能的代码
cd /react
# react指向
yarn link
# react-dom指向
cd /react-dom
yarn link
# scheduler指向
cd /scheduler
yarn link

# 在react根目录下执行
yarn link react react-dom scheduler
```



### 创建react项目

```shell
npx create-react-app react-demo
cd /react-demo
# 将刚刚进行连接的react包在这里进行引用
yarn link react react-dom
```



### 运行项目

```shell
yarn start
```



## Vscode源码调试



在运行和调试块中点击创建`launch.json`文件

```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "针对 localhost 启动 Chrome",
      "url": "http://localhost:3000", // 修改端口
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

运行调试，并将代码项目运行，在vscode需要调试的地方进行断点，开始进行源码调试。