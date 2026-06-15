# Infinite Map and Action Assets Redesign

Date: 2026-06-10

## Goal

根据 PRD 第 8 章资产规范，对当前项目做一次素材与渲染接入优化：

- 不修改 `vampire_survivors.html`。
- 让 `play.html` 在本地打开即可游玩。
- 解决现有关卡背景不适合无限/大地图平铺的问题。
- 重新生成并接入角色、敌人、武器的动作素材，保持“黑暗哥特 + 荒诞食物 + 手绘卡通 + 轻描边”的统一风格。

## Approved Direction

采用 A 方案：分层生成 + 轻量动作包。

旧的 `assest/backgrounds/*.png` 继续作为菜单、关卡展示或加载页背景，不再强行作为战斗地面无限平铺。战斗地面改为每关一张 1024x1024 seamless tile，再配合每关 4-6 个白底装饰物，由渲染层按固定随机种子散布。这样地图可以无限生长，同时不会出现大场景图重复拉伸、焦点突兀、边缘不连续的问题。

角色按 PRD 8.3 的完整规格重做。敌人和武器也生成对应动作，但采用更适合其功能的短动作包，而不是把所有对象都做成角色级 60 帧。这样既满足“每个武器、角色以及敌人都有相应动作”，又能控制文件体积和接入风险。

## Asset Scope

### Maps

新增目录：

```text
assest/tiles/
assest/props/{level_id}/
```

生成 5 张 1024x1024 无缝战斗地砖：

- `hungry_forest_tile.png`
- `waffle_tower_tile.png`
- `infinite_cookbook_library_tile.png`
- `bubble_tea_plant_tile.png`
- `capella_pasta_tile.png`

每个关卡生成 4-6 个装饰物 PNG，白底单体，沿用运行时去白管线：

- 饥饿森林：面包屑土堆、意面根须、咬痕树桩、破餐盘、酱汁蘑菇等。
- 华夫饼塔：焦糖砖块、糖浆裂缝、奶油柱残片、华夫碎块等。
- 无限食谱图书馆：漂浮书堆、书签碑、墨渍、纸页漩涡等。
- 奶茶工厂：珍珠桶、吸管管线、奶茶罐、泡沫泄漏等。
- 神圣意面堂：酒红地砖、蜡烛台、意面圣徽、酱汁花窗碎片等。

### Characters

角色清单：

- `antonio`
- `imelda`
- `gennaro`

每个角色生成并接入 60 帧：

- `idle`: 6 frames
- `walk/down`, `walk/up`, `walk/right`: 18 frames total
- `run/down`, `run/up`, `run/right`: 18 frames total
- `hit`: 6 frames
- `skill`: 6 frames
- `death`: 6 frames

左向继续由代码镜像右向，不生成 left 图片。所有帧尺寸为 362x362，脚底基线稳定，6 帧内重心漂移控制在 PRD 要求内。

### Enemies

敌人清单：

- `hangry_pigeon`
- `crispy_squirrel`
- `sleepy_moth`
- `bouncy_toad`
- `guilty_cricket`
- `sous_chef_zombie`
- `pastry_architect_golem`
- `librarian_ghost`
- `quality_control_robot`
- `sommelier_poltergeist`
- `health_inspector`

每个敌人生成短动作包：

- `idle`: 4 frames
- `move`: 4 frames
- `hit`: 2 frames
- `death`: 2 frames

普通和精英敌人帧尺寸保持 500x500。Boss `health_inspector` 使用 800x800 新帧，并在渲染层按现有尺寸参数缩放。敌人动作以剪影识别、移动节奏和受击反馈为主，不做角色式复杂朝向，避免同屏 300 敌人时动画数据和渲染压力过高。

### Weapons

基础武器：

- `bouncing_slipper`
- `spinning_ladle`
- `boomerang_cleaver`
- `throwing_chopsticks`
- `holy_toast`
- `garlic_breath`
- `rolling_pin`
- `hot_sauce_bottle`
- `whip`
- `cross`

进化武器：

- `divine_slipper`
- `excalibur_ladle`
- `meat_grinder`
- `infinite_hot_pot`

武器动作按行为生成，不做“行走/受击/死亡”这种不适合武器的动作：

- 弹道类：`fly` 4 frames + `impact` 4 frames
- 回旋/折返类：`fly` 6 frames + `return` 4 frames + `impact` 4 frames
- 环绕/光环类：`loop` 6 frames
- 近战横扫类：`slash` 6 frames
- 喷射/地面残留类：`spray` 6 frames + `burn` 4 frames
- 抛物线落地类：`lob` 4 frames + `splash` 4 frames

新增目录：

```text
assest/weapon_actions/{weapon_id}/{action}/frame_00.png
```

现有 `assest/weapons/*.png` 保留作 HUD、升级面板、图鉴和 fallback 图标。

## Code Design

### Asset Configuration

`js/config/assets.js` 增加三类资源表：

- `LEVEL_TILE_IMAGES`
- `LEVEL_PROP_SPRITES`
- `WEAPON_ACTION_SPRITES`

现有 `LEVEL_BG_IMAGES` 保留，职责从战斗地面切换为界面展示背景。角色动画加载从 Antonio 专用循环改为遍历 `CHARACTER_ANIMATION_FRAMES` 的所有角色。

### Animation Data

`js/config/animation-data.js` 扩展为三类动画配置：

- `CHARACTER_ANIMATION_FRAMES`
- `ENEMY_ANIMATION_FRAMES`
- `WEAPON_ANIMATION_FRAMES`

角色继续复用已有状态优先级和 left mirror 逻辑。敌人和武器使用轻量配置，不强依赖角色状态机的完整状态抢占机制。

### Map Rendering

`js/render/render-world.js` 改为：

- 优先读取当前关卡的 `LEVEL_TILE_IMAGES[levelId]`。
- 用 camera/world offset 对 1024 tile 做取模平铺。
- 根据 `levelId + runSeed` 生成稳定装饰物分布。
- 装饰物只绘制视口附近的实例，避免大地图全量遍历。

如果 tile 资源加载失败，则 fallback 到现有背景平铺，保证游戏仍可运行。

### Enemy Rendering

`js/entities/enemy.js` 增加动画状态字段：

- `animState`: `idle | move | hit | death`
- `animTimer`
- `lastHitAt`
- `deathStartedAt`

敌人正常移动时播放 `move`，速度接近 0 时播放 `idle`，受击短暂播放 `hit`。死亡动画只在需要保留尸体/死亡过渡时播放；如果当前实体系统仍然即时移除敌人，则先将 `death` 动作作为后续掉落/特效接入的资源与配置准备，不阻塞游玩。

### Weapon Rendering

武器图标和武器动作分离：

- HUD、升级面板、图鉴继续使用 `WEAPON_SPRITES`。
- 投射物、横扫、喷射、光环优先使用 `WEAPON_ANIMATION_FRAMES`。
- 如果某个动作资源缺失，回退到当前静态图标旋转/程序弧线，避免 404 或空白。

优先接入当前已实现行为：bounce、orbit、boomerang、straight、lob、aura、sweep、spray、hidden whip/cross。

## Image Generation Workflow

所有白底主体资产遵循 PRD 8.2：

- 纯白背景 `#FFFFFF`
- 主体不得有连接画布边缘的近白区域
- 深色 2-4px 描边
- 无文字、无水印
- 单张主体图建议小于 500KB

地砖资产不使用白底，遵循 PRD 8.6：

- 1024x1024
- seamless/tileable
- 俯视或 45 度俯视
- 低对比度、无强焦点
- 不出现离屏物体投影

角色动作先生成角色参考图，再逐动作生成 6 帧，减少角色外观漂移。若图像模型一次性输出横向 sprite sheet，则切成 `frame_00..05.png`；若逐帧输出，则直接归档并统一压缩。

## Testing and Acceptance

完成后验证：

- `vampire_survivors.html` 文件不发生修改。
- `npm test` 通过。
- 运行 `build.ps1` 成功生成最新 `bundle.js`。
- 本地打开 `play.html` 可进入游戏、选择角色、选择关卡、开始战斗。
- 控制台无素材 404。
- 玩家移动超过一个屏幕距离时，地面无明显接缝，装饰物分布稳定。
- Antonio、Imelda、Gennaro 均能播放 idle/walk/run/hit/skill/death。
- 11 个敌人均有 idle/move/hit/death 动作配置或 fallback。
- 14 个武器均有对应动作配置或 fallback。

## Out of Scope

本轮不新增 PRD 后续里程碑里的新玩法系统，例如 PowerUp、隐藏关、遗物、每日挑战、功能武器三件套、家族餐厅。若素材生成时顺带产出可复用图像，也只归档，不接入未实现玩法。

## Risks

- AI 序列帧一致性可能不足。应按角色参考图、单动作 6 帧、人工筛选的流程降低风险。
- 素材数量较大，可能推高加载时间。应压缩 PNG，并让缺失动作回退到静态图。
- 敌人动作过多会影响 300 敌人场景性能。敌人动画应按低帧率播放，并只绘制视口内敌人。
- 地砖是否真正 seamless 需要视觉检查；如边缘不连续，需要重新生成该关 tile。
