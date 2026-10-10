# 上海中考倒计时

一个纯静态的单页应用：倒计时 + 每日励志背景图 + 考试安排与总分构成。可以部署到 GitHub Pages，
并且能「添加到主屏幕」，像 App 一样全屏打开、断网也能看（PWA）。

## 功能

- **三级倒计时**：体育与健身统一测试、外语听说测试 + 物理·化学实验操作、正式考试，每级显示天/时/分/秒，下面一行是周数
- **每日励志背景图**：7 张照片按日期自动轮换（主题为自律、坚强、毅力、坚持），右上角图标可手动换一张（仅当天有效）
- **今天**：公历日期、星期、农历（含干支与生肖）
- **三个可折叠分区**（点击红色按钮会展开第一个并滚到此处，展开状态会被记住）：
  1. 具体考试安排（含 6 场笔试时段与分值）
  2. 总分 750 分构成
  3. 体育评分：统一考试四大类项目（6/3/3/3 分）＋日常考核 15 分规则＋部分项目成绩评价标准（男/女各 20 档，可切换，表格可左右滑动）
- **其他**：浅色/深色/跟随系统、每日打气语、日期与备注可在设置中修改（存在浏览器 localStorage）

## 文件结构

```
index.html               单页应用（HTML + CSS + JS，全部内联）
manifest.webmanifest     PWA 清单（名称、图标、主题色）
sw.js                    Service Worker：离线缓存
.nojekyll                GitHub Pages 跳过 Jekyll 处理
assets/                  背景图、应用图标、图片来源信息
  day-1.jpg … day-7.jpg  每日轮换的励志背景图（1600px 宽）
  icon-192.png / icon-512.png / icon-maskable-512.png
  apple-touch-icon.png / favicon-32.png
  credits.json           每张图片的作者与授权协议
```

## 部署到 GitHub Pages

```bash
# 在仓库页面新建一个空仓库（不要初始化 README / .gitignore），假设仓库名为 zhongkao-countdown
git remote add origin https://github.com/<你的用户名>/zhongkao-countdown.git
git push -u origin main
```

推送后：仓库 **Settings → Pages → Source 选 “Deploy from a branch” → Branch 选 `main`、目录选 `/ (root)` → Save**。
等 1 分钟左右，访问：

```
https://<你的用户名>.github.io/zhongkao-countdown/
```

### 手机添加到主屏幕

- **iPhone / iPad**：用 **Safari** 打开上面的网址 → 分享按钮 → 「添加到主屏幕」
- **Android**：用 **Chrome** 打开 → 右上角菜单 → 「安装应用」或「添加到主屏幕」

因为是 https，添加后可以离线打开；每天首次打开时背景图会自动换成当天那张。

## 修改考试日期

点右上角设置按钮，可修改三级日期、备注，以及勾选「时间待定」（只按日期倒计时）。
第三级日期同时决定 6 场笔试的两天。设置保存在本机浏览器里，不同设备互不影响。

## 更换或增加背景图

1. 把新图片（建议 1600×900 左右、横向）放进 `assets/`
2. 在 `index.html` 里搜索 `var PHOTOS`，照着已有格式加一条（文件名、主题、作者、授权协议）

图片数量决定轮换周期：现有 7 张 = 一周一循环。

## 图片来源

`assets/` 中的照片来自 [Wikimedia Commons](https://commons.wikimedia.org/)，遵循各自的授权协议
（CC BY / CC BY-SA）。具体作者与协议见 `assets/credits.json`，页面主图下方也会显示当前这张图的来源。

## 体育评分数据来源

体育评分标准整理自上海市初中毕业升学体育统一考试项目成绩评价标准（第一类 6 分、第二类 3 分、
第三类 3 分、第四类 3 分，共 15 分；日常考核 15 分）。参考原文：
<https://www.163.com/dy/article/JON2HFRV0516K386.html>；官方渠道：上海招考热线 <https://www.shmeea.edu.cn>。
标准可能逐年调整，请以当年官方文件为准。第三类项目（乒乓球、羽毛球、网球、武术、体操）的评定标准
与各项目场地器材要求详见官方文件。
