# Release Notes

**Version**: v2.0.0-beta.3  
**Date**: 2026-04-26  
**Compare**: origin/main...HEAD

## Summary

- **Commits**: 214
- **Files changed**: 371

## Features

- prebuild release workflow and fix production backend startup ([7099801](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7099801))
- add note/card versioning and security hardening ([1d41107](https://github.com/PapyrusOR/Papyrus_Desktop/commit/1d41107))
- 增加显式报错 ([353c462](https://github.com/PapyrusOR/Papyrus_Desktop/commit/353c462))
- add chokidar file watcher and wire into server ([9ca04b3](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9ca04b3))
- implement AI and MCP subsystems in TypeScript ([a546a76](https://github.com/PapyrusOR/Papyrus_Desktop/commit/a546a76))
- migrate Python backend to TypeScript with Fastify ([7bfe87e](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7bfe87e))
- 添加模型/提供商图标并更新配置 ([d0a5c6f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d0a5c6f))
- 实现 WCAG 2.1 AA/AAA 无障碍支持，修复 Electron 启动崩溃问题 ([6187cfd](https://github.com/PapyrusOR/Papyrus_Desktop/commit/6187cfd))
- 整理文件 ([4a3926b](https://github.com/PapyrusOR/Papyrus_Desktop/commit/4a3926b))
- add diagnostic window for startup troubleshooting ([46e79cd](https://github.com/PapyrusOR/Papyrus_Desktop/commit/46e79cd))
- add diagnostic logging and debug build config ([1767ecf](https://github.com/PapyrusOR/Papyrus_Desktop/commit/1767ecf))
- add provider management backend with encrypted API key storage ([aa33def](https://github.com/PapyrusOR/Papyrus_Desktop/commit/aa33def))
- add splash screen, frameless window and window controls ([4e49ed7](https://github.com/PapyrusOR/Papyrus_Desktop/commit/4e49ed7))
- Electron v41 upgrade with window mode support ([3589aeb](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3589aeb))
- add taskkill to kill existing Papyrus processes before startup ([fb25b1b](https://github.com/PapyrusOR/Papyrus_Desktop/commit/fb25b1b))
- install root certificate on first app launch ([25b363a](https://github.com/PapyrusOR/Papyrus_Desktop/commit/25b363a))
- add auto root CA installation during setup and code signing config ([29dadb4](https://github.com/PapyrusOR/Papyrus_Desktop/commit/29dadb4))
- 添加构建产物下载脚本 ([3448d43](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3448d43))
- 增加发布工作流 ([7eab807](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7eab807))
- 增加扩展支持，markdown支持，优化忽略文件 ([c88e078](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c88e078))
- 工作流测试1 ([018eb26](https://github.com/PapyrusOR/Papyrus_Desktop/commit/018eb26))
- 增加工作流本地测试工具 ([692f755](https://github.com/PapyrusOR/Papyrus_Desktop/commit/692f755))
- 提高工作流健壮性 ([08cbf0f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/08cbf0f))
- 这次真的是setup外置了，工作流增加 ([0e44a0b](https://github.com/PapyrusOR/Papyrus_Desktop/commit/0e44a0b))
- 只保留setup ([f5c89de](https://github.com/PapyrusOR/Papyrus_Desktop/commit/f5c89de))
- 隐藏导入按钮 ([25297af](https://github.com/PapyrusOR/Papyrus_Desktop/commit/25297af))
- 实装锁定编辑模式 ([dc90170](https://github.com/PapyrusOR/Papyrus_Desktop/commit/dc90170))
- 笔记编辑界面底栏增加数据 ([1a26a93](https://github.com/PapyrusOR/Papyrus_Desktop/commit/1a26a93))
- 绑定agent开关，加强描边 ([61d9df3](https://github.com/PapyrusOR/Papyrus_Desktop/commit/61d9df3))
- 优化UI，增强错误处理 ([574cc69](https://github.com/PapyrusOR/Papyrus_Desktop/commit/574cc69))
- 增加头像 ([8bfee7d](https://github.com/PapyrusOR/Papyrus_Desktop/commit/8bfee7d))
- 添加头像自定义 ([899bfa3](https://github.com/PapyrusOR/Papyrus_Desktop/commit/899bfa3))
- 添加新增更新功能 ([0639ce2](https://github.com/PapyrusOR/Papyrus_Desktop/commit/0639ce2))
- AI输出框上边加模型ID ([bc32f63](https://github.com/PapyrusOR/Papyrus_Desktop/commit/bc32f63))
- 优化侧边栏 ([13eaa5d](https://github.com/PapyrusOR/Papyrus_Desktop/commit/13eaa5d))
- 优化模式选择颜色 ([8db9987](https://github.com/PapyrusOR/Papyrus_Desktop/commit/8db9987))
- 增加聊天栏拖动 ([8d97a56](https://github.com/PapyrusOR/Papyrus_Desktop/commit/8d97a56))
- 优化边距 ([7290ae3](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7290ae3))
- 移除旧UI ([6860224](https://github.com/PapyrusOR/Papyrus_Desktop/commit/6860224))
- 移除旧UI ([489acdd](https://github.com/PapyrusOR/Papyrus_Desktop/commit/489acdd))
- 加装副侧边栏 ([db4e5af](https://github.com/PapyrusOR/Papyrus_Desktop/commit/db4e5af))
- 增加了前端的好几个栏 ([ba64d2f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ba64d2f))
- 整理代码 ([ee7f420](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ee7f420))
- 结构洗牌，加强兼容 ([9d88586](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9d88586))

## Bug Fixes

- match release artifacts under any subdir ([c1d469f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c1d469f))
- pass --publish=never to electron-builder ([db649b4](https://github.com/PapyrusOR/Papyrus_Desktop/commit/db649b4))
- use origin/main for release notes diff base ([fb7b40c](https://github.com/PapyrusOR/Papyrus_Desktop/commit/fb7b40c))
- use inode-based path check for obsidian import root ([4fb6f9e](https://github.com/PapyrusOR/Papyrus_Desktop/commit/4fb6f9e))
- use realpathSync.native on Windows for obsidian import ([2e12839](https://github.com/PapyrusOR/Papyrus_Desktop/commit/2e12839))
- case-insensitive path check for Windows obsidian import ([5cb5ea4](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5cb5ea4))
- remove console noise, isolate api tests, extend timeout ([facf430](https://github.com/PapyrusOR/Papyrus_Desktop/commit/facf430))
- use github.event.inputs for cross-event compatibility ([83592bb](https://github.com/PapyrusOR/Papyrus_Desktop/commit/83592bb))
- correct release workflow and harden test isolation ([d375330](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d375330))
- add tag push trigger to release workflow ([5f7dd6a](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5f7dd6a))
- 修复安全更改 ([8a8cc0e](https://github.com/PapyrusOR/Papyrus_Desktop/commit/8a8cc0e))
- 修复安全漏洞 ([c3dfbc8](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c3dfbc8))
- resolve P0/P1/P2 bugs across TS backend ([aa869f6](https://github.com/PapyrusOR/Papyrus_Desktop/commit/aa869f6))
- correct direct-run detection and package main entry ([ca96bab](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ca96bab))
- 修复多个 UI 和启动问题 ([ae04016](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ae04016))
- add missing papyrus.data module files to git ([7199f08](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7199f08))
- 修复 verify_import_structure 路径设置 ([f23b13e](https://github.com/PapyrusOR/Papyrus_Desktop/commit/f23b13e))
- 修复测试脚本 PYTHONPATH 传递和错误输出 ([ce48df7](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ce48df7))
- 修复 PyInstaller one-dir 模式路径不匹配 ([c46454a](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c46454a))
- 设置 PYTHONPATH=src 运行测试 ([1c289dd](https://github.com/PapyrusOR/Papyrus_Desktop/commit/1c289dd))
- 修复工作流触发条件，添加 v2.0.0beta* 分支匹配 ([06a475d](https://github.com/PapyrusOR/Papyrus_Desktop/commit/06a475d))
- 修复打包后 Python 可执行文件路径错误 ([91f81d9](https://github.com/PapyrusOR/Papyrus_Desktop/commit/91f81d9))
- 修复工作流和构建配置问题 ([b9cc808](https://github.com/PapyrusOR/Papyrus_Desktop/commit/b9cc808))
- fix template string syntax error in diagnostic window ([c8461b1](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c8461b1))
- correct import path for DATABASE_FILE and asar-unpacked paths ([e8820d2](https://github.com/PapyrusOR/Papyrus_Desktop/commit/e8820d2))
- change PyInstaller to one-dir mode for all platforms ([0c6d0b4](https://github.com/PapyrusOR/Papyrus_Desktop/commit/0c6d0b4))
- add PYTHONPATH to electron main.js backend spawn ([58f5510](https://github.com/PapyrusOR/Papyrus_Desktop/commit/58f5510))
- Python module import path and launcher PYTHONPATH ([a737ab2](https://github.com/PapyrusOR/Papyrus_Desktop/commit/a737ab2))
- electron path encoding issue in dev mode ([dc7e064](https://github.com/PapyrusOR/Papyrus_Desktop/commit/dc7e064))
- windows dev command quotes ([4383640](https://github.com/PapyrusOR/Papyrus_Desktop/commit/4383640))
- 修复 PyInstaller 打包缺少模块的问题 ([ebb212e](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ebb212e))
- 修复项目代码中的bug ([bbb0ed5](https://github.com/PapyrusOR/Papyrus_Desktop/commit/bbb0ed5))
- 修复所有单元测试和集成测试 ([f77755a](https://github.com/PapyrusOR/Papyrus_Desktop/commit/f77755a))
- fix certificate installation string escaping and use constants for messages ([ba68335](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ba68335))
- remove certificate installation from NSIS script ([687f87d](https://github.com/PapyrusOR/Papyrus_Desktop/commit/687f87d))
- NSIS installer and macOS entitlements fixes ([1ddd898](https://github.com/PapyrusOR/Papyrus_Desktop/commit/1ddd898))
- make NSIS certificate installation optional for CI builds ([b58d259](https://github.com/PapyrusOR/Papyrus_Desktop/commit/b58d259))
- NSIS installer script syntax error ([9cd1fea](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9cd1fea))
- skip code signing in CI environment ([98c06a6](https://github.com/PapyrusOR/Papyrus_Desktop/commit/98c06a6))
- switch Python backend to onedir mode and fix CI Python version ([840a04d](https://github.com/PapyrusOR/Papyrus_Desktop/commit/840a04d))
- 修复 CI 构建 data 目录不存在问题 ([f6d7aa9](https://github.com/PapyrusOR/Papyrus_Desktop/commit/f6d7aa9))
- 解决了linux与mac版本体积过大的问题 ([8aca46f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/8aca46f))
- 修复了mac包体积爆炸的问题 ([2b49693](https://github.com/PapyrusOR/Papyrus_Desktop/commit/2b49693))
- 修复了返回顶部按钮入侵聊天框的问题 ([183b85f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/183b85f))
- 修复了顶栏飞出和报错不明显问题 ([5095272](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5095272))
- 修复工作流名称不一致的问题 ([5c8b8d8](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5c8b8d8))
- 优化工作流 ([f432fce](https://github.com/PapyrusOR/Papyrus_Desktop/commit/f432fce))
- 优化忽略文件，删除测试数据 ([c59c0fe](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c59c0fe))
- update workflow triggers ([e54297b](https://github.com/PapyrusOR/Papyrus_Desktop/commit/e54297b))
- 修复已知问题 ([3a3012d](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3a3012d))
- 侧边栏不再随滚动动作而滚动 ([3d3a098](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3d3a098))
- 修复了图标不适配的问题 ([1b74778](https://github.com/PapyrusOR/Papyrus_Desktop/commit/1b74778))
- 修复了title未被正确闭合的问题 ([5876a69](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5876a69))
- 修复了chatview不正常结束的问题 ([d3cefa4](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d3cefa4))
- 修复main.py的存取和类型问题 ([aa7d803](https://github.com/PapyrusOR/Papyrus_Desktop/commit/aa7d803))
- 修复透明度范围与实际不一致的问题 ([7713978](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7713978))

## Refactoring

- 简化测试验证，移除易失败的服务器测试 ([0ffc6cd](https://github.com/PapyrusOR/Papyrus_Desktop/commit/0ffc6cd))
- rename app from Papyrus Frontend to Papyrus ([a873f43](https://github.com/PapyrusOR/Papyrus_Desktop/commit/a873f43))
- 重写 test_api.py 为集成测试，消除假通过 ([ffb6c17](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ffb6c17))

## Documentation

- update Electron version to 41.1.0 in PRD ([12a67db](https://github.com/PapyrusOR/Papyrus_Desktop/commit/12a67db))
- add file index and PRD documentation ([5632812](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5632812))

## Chores

- 增加缓存命中 ([3dd5a47](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3dd5a47))
- v2.0.0-beta.3 ([de8c553](https://github.com/PapyrusOR/Papyrus_Desktop/commit/de8c553))
- finalize TS migration and harden release pipeline ([46ef3e0](https://github.com/PapyrusOR/Papyrus_Desktop/commit/46ef3e0))
- bump uuid from 11.1.0 to 14.0.0 ([e16419e](https://github.com/PapyrusOR/Papyrus_Desktop/commit/e16419e))
- 更新颜色文档，修开发bug ([af8bfff](https://github.com/PapyrusOR/Papyrus_Desktop/commit/af8bfff))
- add dev command and fix CI workflow for Electron v41 ([644d1c2](https://github.com/PapyrusOR/Papyrus_Desktop/commit/644d1c2))
- 添加electron支持 ([bbf6cb0](https://github.com/PapyrusOR/Papyrus_Desktop/commit/bbf6cb0))
- 调整扩展按钮，对接数据界面，优化UI ([2567787](https://github.com/PapyrusOR/Papyrus_Desktop/commit/2567787))
- 为SQL加入数据进行测试 ([9dd4439](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9dd4439))
- 拆分main，清理遗留代码 ([78d9af6](https://github.com/PapyrusOR/Papyrus_Desktop/commit/78d9af6))
- 引入watchdog监听 ([4642c33](https://github.com/PapyrusOR/Papyrus_Desktop/commit/4642c33))
- 优化项目代码结构 ([22aa484](https://github.com/PapyrusOR/Papyrus_Desktop/commit/22aa484))
- 打通MCP Demo ([ea39ad1](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ea39ad1))
- 添加SQL启动工具 ([deb9c8b](https://github.com/PapyrusOR/Papyrus_Desktop/commit/deb9c8b))
- 全面兼容tailwind css ([777661a](https://github.com/PapyrusOR/Papyrus_Desktop/commit/777661a))
- 引入了taliwind css ([774dc24](https://github.com/PapyrusOR/Papyrus_Desktop/commit/774dc24))
- 使用SQL3数据库替代原有json文件夹，并保留向后兼容 ([49f7926](https://github.com/PapyrusOR/Papyrus_Desktop/commit/49f7926))
- 全面支持后端接口 ([d13c723](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d13c723))
- 删除mock数据，前后端桥接 ([eef66f9](https://github.com/PapyrusOR/Papyrus_Desktop/commit/eef66f9))
- 添加大纲导航功能 ([e4b461f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/e4b461f))
- 为笔记添加mock数据 ([dfee098](https://github.com/PapyrusOR/Papyrus_Desktop/commit/dfee098))
- 快捷键随设置变化二逼那还 ([6d214bf](https://github.com/PapyrusOR/Papyrus_Desktop/commit/6d214bf))
- 同步快捷键 ([3d41214](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3d41214))
- 拆分设置代码，适配深色模式，规范与无障碍 ([e647c46](https://github.com/PapyrusOR/Papyrus_Desktop/commit/e647c46))
- 优化UI，使点击供应商卡片可直接触发下拉 ([5cbd509](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5cbd509))
- 删除保存更改按钮 ([9a74a0b](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9a74a0b))
- 添加模型支持选择key方案，优化UI ([5e45aa8](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5e45aa8))
- 优化多key适配 ([14baa4f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/14baa4f))
- 前端更新多key的demo ([e42939f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/e42939f))
- 优化添加供应商/模型栏 ([57f5814](https://github.com/PapyrusOR/Papyrus_Desktop/commit/57f5814))
- 删除当前标签，模型ID小字改为供应商名称 ([cf44f97](https://github.com/PapyrusOR/Papyrus_Desktop/commit/cf44f97))
- 优化增加供应商/模型按钮 ([0e35e13](https://github.com/PapyrusOR/Papyrus_Desktop/commit/0e35e13))
- 更新月之暗面后端支持 ([ef62219](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ef62219))
- 增加月之暗面模型支持 ([dd113e0](https://github.com/PapyrusOR/Papyrus_Desktop/commit/dd113e0))
- 增加供应商设置的下拉菜单 ([3c602ae](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3c602ae))
- 加装设置侧边栏 ([c89d9c1](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c89d9c1))
- 更新文档 ([1b1f6bc](https://github.com/PapyrusOR/Papyrus_Desktop/commit/1b1f6bc))
- 优化补全max_token，统一长度设置 ([92eacdf](https://github.com/PapyrusOR/Papyrus_Desktop/commit/92eacdf))
- 增加数据文本动态调整颜色功能 ([b3d79e2](https://github.com/PapyrusOR/Papyrus_Desktop/commit/b3d79e2))
- 完成自动补全demo ([871b154](https://github.com/PapyrusOR/Papyrus_Desktop/commit/871b154))
- 优化设置二级菜单 ([6784e62](https://github.com/PapyrusOR/Papyrus_Desktop/commit/6784e62))
- 增加二级菜单宽度 ([d43abbe](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d43abbe))
- 合并外观与窗景设置 ([8b30fcc](https://github.com/PapyrusOR/Papyrus_Desktop/commit/8b30fcc))
- 更换窗静设置图标 ([541faa9](https://github.com/PapyrusOR/Papyrus_Desktop/commit/541faa9))
- 统一设置标题 ([3330fae](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3330fae))
- 调整设置界面 ([5f38ded](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5f38ded))
- 移除关于菜单，增加设置里的关于项 ([9b1f3dc](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9b1f3dc))
- 扩展管理增加窗景 ([ce5f810](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ce5f810))
- 文件库支持窗景 ([15e725b](https://github.com/PapyrusOR/Papyrus_Desktop/commit/15e725b))
- 调整透明度范围· ([245ba47](https://github.com/PapyrusOR/Papyrus_Desktop/commit/245ba47))
- 为数据界面加入窗景 ([1d80cd6](https://github.com/PapyrusOR/Papyrus_Desktop/commit/1d80cd6))
- 修复背景bug，改透明度设置 ([f416cd7](https://github.com/PapyrusOR/Papyrus_Desktop/commit/f416cd7))
- 优化窗景，并出卷轴窗景demo ([ff8fe1a](https://github.com/PapyrusOR/Papyrus_Desktop/commit/ff8fe1a))
- 添加无障碍文档，调整字重，调整标题关系，统一卡片样式 ([41beaff](https://github.com/PapyrusOR/Papyrus_Desktop/commit/41beaff))
- 添加无障碍支持（测试） ([28c8b5d](https://github.com/PapyrusOR/Papyrus_Desktop/commit/28c8b5d))
- 将设置与窗景功能接入 ([b55a0c5](https://github.com/PapyrusOR/Papyrus_Desktop/commit/b55a0c5))
- 更换悬停显示，设置加入窗景设置，重写设置内容 ([e684a8c](https://github.com/PapyrusOR/Papyrus_Desktop/commit/e684a8c))
- 构建基础设置界面 ([3f0225e](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3f0225e))
- 增加菜单界面 ([592cb1c](https://github.com/PapyrusOR/Papyrus_Desktop/commit/592cb1c))
- 优化卷轴学习功能 ([5639680](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5639680))
- 构建卷轴学习界面 ([7785d9c](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7785d9c))
- 增加笔记查看器，后端引入从Obsidian导入功能 ([34c321f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/34c321f))
- 完成主页面 ([d020dd0](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d020dd0))
- 大幅提升代码健壮性，提高工程质量 ([6bd1268](https://github.com/PapyrusOR/Papyrus_Desktop/commit/6bd1268))
- 开始界面完成 ([9aabb80](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9aabb80))
- 加装卷轴图标，预留界面 ([4df6ec1](https://github.com/PapyrusOR/Papyrus_Desktop/commit/4df6ec1))
- 优化侧边栏 ([60045ce](https://github.com/PapyrusOR/Papyrus_Desktop/commit/60045ce))

## Other Changes

- ci(release): use CHANGELOG section as release body ([6cf20c5](https://github.com/PapyrusOR/Papyrus_Desktop/commit/6cf20c5))
- ci(workflow): trigger build on TS后端重写 branch ([d068e0f](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d068e0f))
- debug(notes): add console.log to diagnose obsidian import failure on CI ([7f24dbe](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7f24dbe))
- ci(workflow): capture test output artifact on failure ([d21c764](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d21c764))
- ci(release): auto-trigger release on tag push ([93a7449](https://github.com/PapyrusOR/Papyrus_Desktop/commit/93a7449))
- security(fix): 放宽本地模型 base_url 校验，支持常见本地部署标识 ([022c39c](https://github.com/PapyrusOR/Papyrus_Desktop/commit/022c39c))
- security: 修复审计报告中的 P0/P1/P2 级安全漏洞 ([74923d4](https://github.com/PapyrusOR/Papyrus_Desktop/commit/74923d4))
- 把安全相关文件忽略掉，不宜公开；git先写将头像加入项目文件夹 ([20375a8](https://github.com/PapyrusOR/Papyrus_Desktop/commit/20375a8))
- V2.0.0beta1 (#16) ([f10b14d](https://github.com/PapyrusOR/Papyrus_Desktop/commit/f10b14d))
- Update README.md ([0935cd9](https://github.com/PapyrusOR/Papyrus_Desktop/commit/0935cd9))
- 添加canvas文件夹作为预留 ([a87e611](https://github.com/PapyrusOR/Papyrus_Desktop/commit/a87e611))
- ci: lower size thresholds for one-dir mode builds ([b362fd3](https://github.com/PapyrusOR/Papyrus_Desktop/commit/b362fd3))
- ci: fix Python executable path for macOS/Linux verification ([3cebbcb](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3cebbcb))
- ci: fix Windows build verification for one-dir mode ([21f2dd8](https://github.com/PapyrusOR/Papyrus_Desktop/commit/21f2dd8))
- ci: fix macOS build path from mac/ to mac-arm64/ ([42bc21a](https://github.com/PapyrusOR/Papyrus_Desktop/commit/42bc21a))
- ci: fix encoding when reading files in verify script ([c787f35](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c787f35))
- ci: fix Unicode encoding issues on Windows ([9033658](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9033658))
- ci: fix executable size check for Linux/macOS one-dir mode ([7b5d3d7](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7b5d3d7))
- ci: specify bash shell for test step on Windows ([6bafa75](https://github.com/PapyrusOR/Papyrus_Desktop/commit/6bafa75))
- ci: 加强打包文件验证，防止后端丢失 ([c1eb1cc](https://github.com/PapyrusOR/Papyrus_Desktop/commit/c1eb1cc))
- ci: 加强测试步骤错误处理，失败立即停止构建 ([34174c5](https://github.com/PapyrusOR/Papyrus_Desktop/commit/34174c5))
- ci: 加强工作流错误处理和测试验证 ([9add446](https://github.com/PapyrusOR/Papyrus_Desktop/commit/9add446))
- build: add portable version for Windows ([7a3d9af](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7a3d9af))
- ci: 启用 Node.js 24 避免弃用警告 ([451807e](https://github.com/PapyrusOR/Papyrus_Desktop/commit/451807e))
- ci: 添加 v2* 分支触发 ([7bb21df](https://github.com/PapyrusOR/Papyrus_Desktop/commit/7bb21df))
- ci: 修复 lock file 路径 ([8856c40](https://github.com/PapyrusOR/Papyrus_Desktop/commit/8856c40))
- ci: 分支推送也触发构建 ([6f5ae66](https://github.com/PapyrusOR/Papyrus_Desktop/commit/6f5ae66))
- ci: 禁用自动 release，保留构建产物下载 ([0e775b8](https://github.com/PapyrusOR/Papyrus_Desktop/commit/0e775b8))
- ci: enable release workflow ([4dab88c](https://github.com/PapyrusOR/Papyrus_Desktop/commit/4dab88c))
- Update electron-build.yml ([d8e7592](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d8e7592))
- Update dependency installation in electron-build.yml ([d5e5d86](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d5e5d86))
- v2.0.0alpha1: 构建完成，增加electron打包，增加流式输出，增加工具调用与思考链折叠，增加版本号管理工具 ([5644a16](https://github.com/PapyrusOR/Papyrus_Desktop/commit/5644a16))
- sync chat changes: multi-session, attachments, and session rename (#11) ([15cc407](https://github.com/PapyrusOR/Papyrus_Desktop/commit/15cc407))
- sync chat changes: multi-session, attachments, and session rename (#11) ([2b4650c](https://github.com/PapyrusOR/Papyrus_Desktop/commit/2b4650c))
- Reapply "chore: 开始界面完成" ([d1129e0](https://github.com/PapyrusOR/Papyrus_Desktop/commit/d1129e0))
- Revert "chore: 开始界面完成" ([3813abc](https://github.com/PapyrusOR/Papyrus_Desktop/commit/3813abc))
- 优化聊天栏，加装卡片 ([43a3646](https://github.com/PapyrusOR/Papyrus_Desktop/commit/43a3646))
- i ([a001f03](https://github.com/PapyrusOR/Papyrus_Desktop/commit/a001f03))
- bugfix: 清缓存 ([4090c50](https://github.com/PapyrusOR/Papyrus_Desktop/commit/4090c50))
- v2.0.0beta1:前端预留 ([15ddbc2](https://github.com/PapyrusOR/Papyrus_Desktop/commit/15ddbc2))
- v2.0.0beta.1: 全面兼容py3.14,升级测试包，更改项目文档 ([8404bd2](https://github.com/PapyrusOR/Papyrus_Desktop/commit/8404bd2))
- v2.0.0beta.1: 全面兼容py3.14,升级测试包，更改项目文档 ([234bb97](https://github.com/PapyrusOR/Papyrus_Desktop/commit/234bb97))

## Diff Stat

```
.electron-builder.config.js                        |  134 +
 .github/workflows/build-and-release.yml            |   95 -
 .github/workflows/release.yml                      |  331 ++
 .gitignore                                         |  210 +-
 CHANGELOG.md                                       |  185 +
 ELECTRON.md                                        |  195 +
 PUSH_COMMANDS.bat                                  |   31 +
 Papyrus.spec                                       |   40 -
 README-DEV.md                                      |  188 +
 README.md                                          |  282 +-
 RELEASE_NOTES.md                                   |   14 +
 SECURITY_FIX_REPORT.md                             |  184 +
 assets/icon.icns                                   |  Bin 0 -> 198034 bytes
 assets/icon.ico                                    |  Bin 16126 -> 47006 bytes
 assets/icon.png                                    |  Bin 0 -> 154932 bytes
 backend/check-cov.cjs                              |   10 +
 backend/cov.txt                                    |  136 +
 backend/jest.config.js                             |   34 +
 backend/output.txt                                 |  136 +
 backend/package-lock.json                          | 5690 ++++++++++++++++++++
 backend/package.json                               |   38 +
 backend/src/ai/config.ts                           |  370 ++
 backend/src/ai/llm-cache.ts                        |  141 +
 backend/src/ai/provider.ts                         |  662 +++
 backend/src/ai/tool-manager.ts                     |  163 +
 backend/src/ai/tools.ts                            |  454 ++
 backend/src/api/routes/ai.ts                       |  622 +++
 backend/src/api/routes/card-versions.ts            |   44 +
 backend/src/api/routes/cards.ts                    |   61 +
 backend/src/api/routes/data.ts                     |   94 +
 backend/src/api/routes/logs.ts                     |   85 +
 backend/src/api/routes/markdown.ts                 |   26 +
 backend/src/api/routes/mcp.ts                      |  183 +
 backend/src/api/routes/note-versions.ts            |   42 +
 backend/src/api/routes/notes.ts                    |   63 +
 backend/src/api/routes/progress.ts                 |  132 +
 backend/src/api/routes/providers.ts                |  119 +
 backend/src/api/routes/review.ts                   |   53 +
 backend/src/api/routes/search.ts                   |   63 +
 backend/src/api/routes/update.ts                   |   38 +
 backend/src/api/server.ts                          |  159 +
 backend/src/core/cards.ts                          |  120 +
 backend/src/core/crypto.ts                         |  136 +
 backend/src/core/notes.ts                          |  230 +
 backend/src/core/progress.ts                       |   42 +
 backend/src/core/sm2.ts                            |   48 +
 backend/src/core/types.ts                          |   53 +
 backend/src/core/versioning.ts                     |  104 +
 backend/src/db/database.ts                         |  955 ++++
 backend/src/integrations/file-watcher.ts           |   94 +
 backend/src/mcp/server.ts                          |  217 +
 backend/src/utils/auth.ts                          |   69 +
 backend/src/utils/logger.ts                        |  362 ++
 backend/src/utils/paths.ts                         |   28 +
 backend/test_output.txt                            |  369 ++
 backend/test_regex.js                              |    5 +
 backend/tests/integration/api.test.ts              | 2546 +++++++++
 backend/tests/integration/server-auth.test.ts      |   66 +
 backend/tests/tsconfig.json                        |   10 +
 backend/tests/unit/ai-config.test.ts               |  155 +
 backend/tests/unit/ai-provider.test.ts             | 1077 ++++
 backend/tests/unit/ai-tools.test.ts                |  278 +
 backend/tests/unit/auth.test.ts                    |   80 +
 backend/tests/unit/cards.test.ts                   |  219 +
 backend/tests/unit/crypto.test.ts                  |  184 +
 backend/tests/unit/database.test.ts                |  436 ++
 backend/tests/unit/file-watcher.test.ts            |  183 +
 backend/tests/unit/llm-cache.test.ts               |  251 +
 backend/tests/unit/logger.test.ts                  |  258 +
 backend/tests/unit/mcp-server.test.ts              |  224 +
 backend/tests/unit/notes.test.ts                   |  265 +
 backend/tests/unit/rate-limit.test.ts              |   45 +
 backend/tests/unit/sm2.test.ts                     |   52 +
 backend/tests/unit/tool-manager.test.ts            |  114 +
 backend/tests/unit/versioning.test.ts              |  291 +
 backend/tsconfig.json                              |   28 +
 backend/tsconfig.test.json                         |   10 +
 build/create-cert.ps1                              |   69 +
 build/entitlements.mac.plist                       |   14 +
 build/installer.nsh                                |   14 +
 dev.bat                                            |   46 +
 docs/AI_README.md                                  |  107 +-
 docs/AI_TOOLS_DEMO.md                              |    2 +
 docs/API.md                                        |  225 +
 docs/COMPLETION_DEMO.md                            |  136 +
 docs/ELECTRON_V41_SETUP.md                         |  249 +
 docs/EXTENSIONS.md                                 |  594 ++
 docs/FILE_INDEX.md                                 |  473 ++
 docs/PRD.md                                        |  436 ++
 docs/PROJECT_STRUCTURE.md                          |  397 +-
 docs/README.md                                     |  120 +-
 docs/guides/A11Y_IMPLEMENTATION.md                 |  148 +
 docs/guides/A11Y_IMPLEMENTATION_SUMMARY.md         |  161 +
 docs/guides/A11Y_SETTINGS.md                       |   88 +
 docs/guides/A11Y_VERIFICATION.md                   |  195 +
 docs/guides/ACCESSIBILITY_GUIDE.md                 |  546 ++
 docs/guides/API_FASTAPI.md                         |   37 +
 docs/guides/ARTIFACTS.md                           |  126 +
 docs/guides/CHANGELOG.md                           |   44 +-
 docs/guides/ENVIRONMENT_REQUIREMENTS.md            |  153 +
 docs/guides/QUICKSTART.md                          |  104 +-
 docs/guides/RELEASE.md                             |  367 ++
 docs/guides/SCENERY_DESIGN_GUIDE.md                |  176 +
 docs/guides/UI_TOKENS.md                           |  229 +
 docs/guides/VERSION.md                             |  155 +-
 docs/guides/WCAG_AA_AAA_IMPLEMENTATION.md          |  255 +
 docs/sqlite_migration.md                           |  123 +
 docs/tool_call_approval.md                         |  190 +
 ...270\251\345\235\221\350\256\260\345\275\225.md" |   60 +
 e2e/app-launch.spec.ts                             |   63 +
 e2e/playwright.config.ts                           |   19 +
 electron-builder-debug.json                        |   27 +
 electron-builder.json                              |  130 +
 electron/diagnostic-preload.js                     |   36 +
 electron/diagnostic-window.js                      |  169 +
 electron/main.js                                   |  665 +++
 electron/preload.js                                |   45 +
 examples/extension-template/README.md              |   36 +
 examples/extension-template/content.js             |   29 +
 examples/extension-template/icons/README.md        |    9 +
 examples/extension-template/main.js                |  309 ++
 examples/extension-template/manifest.json          |   37 +
 examples/extension-template/popup.html             |   74 +
 examples/extension-template/popup.js               |   91 +
 frontend/.ai/spec.md                               |  175 +
 frontend/README.md                                 |   41 +
 frontend/TAILWIND_GUIDE.md                         |  223 +
 frontend/TAILWIND_OPTIMIZATION.md                  |  136 +
 frontend/index.html                                |   90 +
 frontend/launcher.js                               |  188 +
 frontend/package-lock.json                         | 3342 ++++++++++++
 frontend/package.json                              |   31 +
 frontend/postcss.config.js                         |    6 +
 frontend/public/icon.ico                           |  Bin 0 -> 15406 bytes
 frontend/public/scenery/image.png                  |  Bin 0 -> 498058 bytes
 frontend/src/App.tsx                               |  264 +
 frontend/src/ChartsPage/ChartsPage.tsx             |  559 ++
 frontend/src/ChatPanel.css                         |  541 ++
 frontend/src/ChatPanel.tsx                         |  976 ++++
 frontend/src/DesktopPage/README.md                 |   18 +
 frontend/src/DesktopPage/canvas/.gitkeep           |   10 +
 frontend/src/ExtensionsPage/ExtensionsPage.tsx     |  301 ++
 frontend/src/FilesPage/FileIcon.tsx                |   92 +
 frontend/src/FilesPage/FilesPage.tsx               |  322 ++
 frontend/src/FilesPage/ZipIcon.tsx                 |    8 +
 frontend/src/NotesPage/NotesPage.tsx               |  180 +
 frontend/src/NotesPage/components/AddCard.tsx      |   56 +
 frontend/src/NotesPage/components/FileTree.tsx     |  268 +
 frontend/src/NotesPage/components/FolderTab.tsx    |   62 +
 frontend/src/NotesPage/components/NoteCard.tsx     |   99 +
 .../components/Relations/RelationGraph.tsx         |  370 ++
 .../components/Relations/RelationsPanel.tsx        |  487 ++
 .../src/NotesPage/components/Relations/index.ts    |    3 +
 .../src/NotesPage/components/Relations/types.ts    |   68 +
 frontend/src/NotesPage/components/StatsBar.tsx     |  135 +
 frontend/src/NotesPage/components/index.ts         |    5 +
 frontend/src/NotesPage/constants.ts                |   54 +
 frontend/src/NotesPage/types.ts                    |   46 +
 frontend/src/NotesPage/useNotes.ts                 |  186 +
 frontend/src/NotesPage/views/NoteDetailView.tsx    |  620 +++
 frontend/src/NotesPage/views/NoteListView.tsx      |  116 +
 frontend/src/ScrollPage/FlashcardStudy.tsx         |  884 +++
 frontend/src/ScrollPage/ScrollPage.tsx             |  830 +++
 frontend/src/SearchBox.tsx                         |  359 ++
 frontend/src/SettingsPage/README.md                |   82 +
 frontend/src/SettingsPage/SettingsPage.css         |  572 ++
 frontend/src/SettingsPage/SettingsPage.tsx         |  201 +
 .../src/SettingsPage/components/SettingItem.tsx    |   53 +
 .../components/SettingsLayout copy.tsx             |   91 +
 .../SettingsPage/components/SettingsSidebar.tsx    |  249 +
 frontend/src/SettingsPage/components/index.ts      |   10 +
 frontend/src/SettingsPage/views/AboutView.tsx      |  299 +
 .../src/SettingsPage/views/AccessibilityView.tsx   |  320 ++
 frontend/src/SettingsPage/views/AppearanceView.tsx |  587 ++
 frontend/src/SettingsPage/views/ChatView.tsx       | 1409 +++++
 frontend/src/SettingsPage/views/DataView.tsx       |  300 ++
 frontend/src/SettingsPage/views/GeneralView.tsx    |  366 ++
 frontend/src/SettingsPage/views/McpView.tsx        |  252 +
 frontend/src/SettingsPage/views/ShortcutsView.tsx  |  378 ++
 frontend/src/SettingsPage/views/index.ts           |    8 +
 frontend/src/Sidebar.css                           |  143 +
 frontend/src/Sidebar.tsx                           |  144 +
 frontend/src/StartPage/LatticeOverlay.tsx          |   25 +
 frontend/src/StartPage/RecentNotes.tsx             |  153 +
 frontend/src/StartPage/RecentScrolls.tsx           |  213 +
 frontend/src/StartPage/ReviewQueue.tsx             |  172 +
 frontend/src/StartPage/StartPage.tsx               |  614 +++
 frontend/src/StartPage/sceneryContent.ts           |   47 +
 frontend/src/StartPage/sceneryData.ts              |   42 +
 frontend/src/StartPage/solarTerms.ts               |   60 +
 frontend/src/StatusBar.css                         |   38 +
 frontend/src/StatusBar.tsx                         |   40 +
 frontend/src/TitleBar.css                          |  177 +
 frontend/src/TitleBar.tsx                          |  555 ++
 frontend/src/a11y.css                              |  441 ++
 frontend/src/api.ts                                |  287 +
 frontend/src/components/ChatHistory.css            |  230 +
 frontend/src/components/ChatHistory.tsx            |  275 +
 frontend/src/components/ReasoningChain.css         |  173 +
 frontend/src/components/ReasoningChain.tsx         |  113 +
 frontend/src/components/SceneryBackground.tsx      |   50 +
 frontend/src/components/ScreenReaderAnnouncer.tsx  |  207 +
 frontend/src/components/SectionNavigation.tsx      |  245 +
 frontend/src/components/SmartTextArea.tsx          |  362 ++
 frontend/src/components/TailwindExample.tsx        |  133 +
 frontend/src/components/ToolCallCard.css           |  303 ++
 frontend/src/components/ToolCallCard.tsx           |  223 +
 frontend/src/components/index.ts                   |   23 +
 frontend/src/contexts/AccessibilityContext.tsx     |  249 +
 frontend/src/contexts/index.ts                     |   14 +
 frontend/src/hooks/useCompletion.ts                |  228 +
 frontend/src/hooks/useScenery.ts                   |  220 +
 frontend/src/hooks/useSceneryColor.ts              |  184 +
 frontend/src/hooks/useScrollNavigation.ts          |   84 +
 frontend/src/hooks/useShortcuts.ts                 |  137 +
 frontend/src/hooks/useWebSocket.ts                 |  206 +
 frontend/src/icons/IconAccessibility.tsx           |   27 +
 frontend/src/icons/IconAgentMode.tsx               |    7 +
 frontend/src/icons/IconCharts.tsx                  |    7 +
 frontend/src/icons/IconScroll.tsx                  |   21 +
 frontend/src/icons/ModelLogo.tsx                   |   70 +
 frontend/src/icons/ProviderLogo.tsx                |  102 +
 frontend/src/icons/svgs/accessibility.svg          |    1 +
 frontend/src/icons/svgs/models/Claude.tsx          |   13 +
 frontend/src/icons/svgs/models/Deepseek.tsx        |   13 +
 frontend/src/icons/svgs/models/Doubao.tsx          |   13 +
 frontend/src/icons/svgs/models/Gemini.tsx          |   13 +
 frontend/src/icons/svgs/models/Gemma.tsx           |   13 +
 frontend/src/icons/svgs/models/Grok.tsx            |   13 +
 frontend/src/icons/svgs/models/Huggingface.tsx     |   13 +
 frontend/src/icons/svgs/models/Meta.tsx            |   13 +
 frontend/src/icons/svgs/models/Minimax.tsx         |   13 +
 frontend/src/icons/svgs/models/Mistral.tsx         |   13 +
 frontend/src/icons/svgs/models/Moonshot.tsx        |   13 +
 frontend/src/icons/svgs/models/Nanobanana.tsx      |   13 +
 frontend/src/icons/svgs/models/Ollama.tsx          |   13 +
 frontend/src/icons/svgs/models/Openai.tsx          |   13 +
 frontend/src/icons/svgs/models/Openrouter.tsx      |   13 +
 frontend/src/icons/svgs/models/Qwen.tsx            |   13 +
 frontend/src/icons/svgs/models/Tavily.tsx          |   13 +
 frontend/src/icons/svgs/models/Wenxin.tsx          |   13 +
 frontend/src/icons/svgs/models/Xiaomimimo.tsx      |   13 +
 frontend/src/icons/svgs/models/Yuanbao.tsx         |   13 +
 frontend/src/icons/svgs/models/Zhipu.tsx           |   13 +
 frontend/src/icons/svgs/models/claude.svg          |    1 +
 frontend/src/icons/svgs/models/deepseek.svg        |    1 +
 frontend/src/icons/svgs/models/doubao.svg          |    1 +
 frontend/src/icons/svgs/models/gemini.svg          |    1 +
 frontend/src/icons/svgs/models/gemma.svg           |    1 +
 frontend/src/icons/svgs/models/grok.svg            |    1 +
 frontend/src/icons/svgs/models/huggingface.svg     |    1 +
 frontend/src/icons/svgs/models/index.ts            |   21 +
 frontend/src/icons/svgs/models/meta.svg            |    1 +
 frontend/src/icons/svgs/models/minimax.svg         |    1 +
 frontend/src/icons/svgs/models/mistral.svg         |    1 +
 frontend/src/icons/svgs/models/moonshot.svg        |    1 +
 frontend/src/icons/svgs/models/nanobanana.svg      |    1 +
 frontend/src/icons/svgs/models/ollama.svg          |    1 +
 frontend/src/icons/svgs/models/openai.svg          |    1 +
 frontend/src/icons/svgs/models/openrouter.svg      |    1 +
 frontend/src/icons/svgs/models/qwen.svg            |    1 +
 frontend/src/icons/svgs/models/tavily.svg          |    1 +
 frontend/src/icons/svgs/models/wenxin.svg          |    1 +
 frontend/src/icons/svgs/models/xiaomimimo.svg      |    1 +
 frontend/src/icons/svgs/models/yuanbao.svg         |    1 +
 frontend/src/icons/svgs/models/zhipu.svg           |    1 +
 frontend/src/icons/svgs/providers/Alibabacloud.tsx |   13 +
 frontend/src/icons/svgs/providers/Anthropic.tsx    |   13 +
 frontend/src/icons/svgs/providers/Azure.tsx        |   13 +
 frontend/src/icons/svgs/providers/Baidu.tsx        |   13 +
 frontend/src/icons/svgs/providers/Bytedance.tsx    |   13 +
 frontend/src/icons/svgs/providers/Cerebras.tsx     |   13 +
 frontend/src/icons/svgs/providers/Cherrystudio.tsx |   13 +
 frontend/src/icons/svgs/providers/Deepseek.tsx     |   13 +
 frontend/src/icons/svgs/providers/Gemini.tsx       |   13 +
 .../src/icons/svgs/providers/Githubcopilot.tsx     |   13 +
 frontend/src/icons/svgs/providers/Google.tsx       |   13 +
 frontend/src/icons/svgs/providers/Googlecloud.tsx  |   13 +
 frontend/src/icons/svgs/providers/Grok.tsx         |   13 +
 frontend/src/icons/svgs/providers/Infinigence.tsx  |   13 +
 frontend/src/icons/svgs/providers/Lmstudio.tsx     |   13 +
 frontend/src/icons/svgs/providers/Modelscope.tsx   |   13 +
 frontend/src/icons/svgs/providers/Moonshot.tsx     |   13 +
 frontend/src/icons/svgs/providers/Newapi.tsx       |   13 +
 frontend/src/icons/svgs/providers/Novelai.tsx      |   13 +
 frontend/src/icons/svgs/providers/Nvidia.tsx       |   13 +
 frontend/src/icons/svgs/providers/Ollama.tsx       |   13 +
 frontend/src/icons/svgs/providers/Openai.tsx       |   13 +
 frontend/src/icons/svgs/providers/Openrouter.tsx   |   13 +
 frontend/src/icons/svgs/providers/Perplexity.tsx   |   13 +
 frontend/src/icons/svgs/providers/Poe.tsx          |   13 +
 frontend/src/icons/svgs/providers/Qiniu.tsx        |   13 +
 frontend/src/icons/svgs/providers/Siliconcloud.tsx |   13 +
 frontend/src/icons/svgs/providers/Stepfun.tsx      |   13 +
 frontend/src/icons/svgs/providers/Vertexai.tsx     |   13 +
 frontend/src/icons/svgs/providers/Volcengine.tsx   |   13 +
 frontend/src/icons/svgs/providers/Zai.tsx          |   13 +
 frontend/src/icons/svgs/providers/Zhipu.tsx        |   13 +
 frontend/src/icons/svgs/providers/alibabacloud.svg |    1 +
 frontend/src/icons/svgs/providers/anthropic.svg    |    1 +
 frontend/src/icons/svgs/providers/azure.svg        |    1 +
 frontend/src/icons/svgs/providers/baidu.svg        |    1 +
 frontend/src/icons/svgs/providers/bytedance.svg    |    1 +
 frontend/src/icons/svgs/providers/cerebras.svg     |    1 +
 frontend/src/icons/svgs/providers/cherrystudio.svg |    1 +
 frontend/src/icons/svgs/providers/deepseek.svg     |    1 +
 frontend/src/icons/svgs/providers/gemini.svg       |    1 +
 .../src/icons/svgs/providers/githubcopilot.svg     |    1 +
 frontend/src/icons/svgs/providers/google.svg       |    1 +
 frontend/src/icons/svgs/providers/googlecloud.svg  |    1 +
 frontend/src/icons/svgs/providers/grok.svg         |    1 +
 frontend/src/icons/svgs/providers/index.ts         |   32 +
 frontend/src/icons/svgs/providers/infinigence.svg  |    1 +
 frontend/src/icons/svgs/providers/lmstudio.svg     |    1 +
 frontend/src/icons/svgs/providers/modelscope.svg   |    1 +
 frontend/src/icons/svgs/providers/moonshot.svg     |    1 +
 frontend/src/icons/svgs/providers/newapi.svg       |    1 +
 frontend/src/icons/svgs/providers/novelai.svg      |    1 +
 frontend/src/icons/svgs/providers/nvidia.svg       |    1 +
 frontend/src/icons/svgs/providers/ollama.svg       |    1 +
 frontend/src/icons/svgs/providers/openai.svg       |    1 +
 frontend/src/icons/svgs/providers/openrouter.svg   |    1 +
 frontend/src/icons/svgs/providers/perplexity.svg   |    1 +
 frontend/src/icons/svgs/providers/poe.svg          |    1 +
 frontend/src/icons/svgs/providers/qiniu.svg        |    1 +
 frontend/src/icons/svgs/providers/siliconcloud.svg |    1 +
 frontend/src/icons/svgs/providers/stepfun.svg      |    1 +
 frontend/src/icons/svgs/providers/vertexai.svg     |    1 +
 frontend/src/icons/svgs/providers/volcengine.svg   |    1 +
 frontend/src/icons/svgs/providers/zai.svg          |    1 +
 frontend/src/icons/svgs/providers/zhipu.svg        |    1 +
 frontend/src/icons/useIconColorMode.ts             |   32 +
 frontend/src/main.tsx                              |   70 +
 frontend/src/tailwind.css                          |   31 +
 frontend/src/theme.css                             |  223 +
 frontend/src/types/electron.d.ts                   |   67 +
 frontend/tailwind.config.js                        |   88 +
 frontend/tsconfig.json                             |   20 +
 frontend/vite.config.js                            |   23 +
 package-lock.json                                  | 4396 +++++++++++++++
 package.json                                       |  146 +
 requirements.txt                                   |    1 -
 run.pyw                                            |   19 -
 scripts/build-electron.js                          |  399 ++
 scripts/download-artifacts.bat                     |   32 +
 scripts/download-artifacts.js                      |   82 +
 scripts/download-artifacts.sh                      |   36 +
 scripts/extract-changelog.js                       |  108 +
 scripts/generate-release-notes.js                  |  218 +
 scripts/get-changelog.bat                          |   12 +
 scripts/get-changelog.sh                           |   15 +
 src/Papyrus.py                                     |  830 ---
 src/ai/__init__.py                                 |    1 -
 src/ai/config.py                                   |  118 -
 src/ai/provider.py                                 |  454 --
 src/ai/sidebar_v3.py                               |  824 ---
 src/ai/tools.py                                    |  266 -
 src/log_viewer.py                                  |  195 -
 src/logger.py                                      |  218 -
 src/mcp/__init__.py                                |    0
 src/mcp/server.py                                  |  105 -
 start-dev.bat                                      |   70 +
 start-dev.ps1                                      |   33 +
 tests/test_ai.py                                   |  126 -
 tests/test_integration.py                          |  466 --
 tests/test_papyrus.py                              |  287 -
 tests/test_sidebar_v3.py                           |  248 -
 tools/build-electron-simple.js                     |  142 +
 tools/diagnose.py                                  |  114 -
 tools/package-electron-all.bat                     |  121 +
 tools/package-electron.bat                         |   63 +
 371 files changed, 59977 insertions(+), 4779 deletions(-)
```

## Changed Areas

- **Frontend**: 215 files
- **Backend**: 62 files
- **Electron**: 4 files
- **Other**: 90 files

## Contributors

- ALPACA LI
- ChimeHsia
