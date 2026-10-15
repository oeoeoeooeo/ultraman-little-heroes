# v1.2.0 上線驗證紀錄

驗證日期：2026-10-15（台灣時間）。正式站：https://ultraman-heroes-base.web.app

## 本次擴充

角色由 6 位擴充至 53 位，收錄圓谷官方英雄百科目前列出的全部角色，包括 2026 年 Ultraman Teo。加入經典、平成、新生代、最新英雄分類，以及中文名、英文名與年份搜尋。完整資料來源見 [SOURCES.md](SOURCES.md)。

## 遊戲與 RWD

- [原始碼完整測試成功](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/38674366514)。
- [正式網址完整測試成功](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/38674604632)。
- 六種遊戲模式、鍵盤與畫面按鈕、答錯重試、雙人變身、獨立集氣、護盾、暫停、配對、九枚徽章和存檔通過。
- 53 位角色及圖片完整性、最新年代篩選、Teo 搜尋與實際選角變身、搜尋空結果、搜尋輸入不當作 HTML 執行均通過。
- 共用變身器的候選答案去重，翻牌每輪道具不重複。41 個有道具角色納入題庫，無道具／意念變身／未公開道具角色仍可選角戰鬥。

| 模擬螢幕 | 尺寸（CSS 像素） |
| --- | --- |
| 小手機直向 | 320 × 740 |
| 手機直向 | 390 × 844 |
| 手機橫向 | 844 × 390 |
| 平板直向 | 834 × 1194 |
| 平板橫向 | 1024 × 768 |
| 小桌面 | 1280 × 720 |
| 筆電 | 1366 × 768 |
| 桌面 | 1440 × 1100 |
| Full HD | 1920 × 1080 |

九種尺寸的首頁、選角、變身與對戰無水平溢出；另檢查小手機猜謎、翻牌、圖鑑與成就。Chromium 產出 45 張截圖保留在測試 job log；本次人工檢視小手機最新英雄圖鑑、手機合作選角、桌面 Teo 搜尋與平板 Teo 對戰畫面。沒有宣稱已測試每款實體手機；中文語音聽感仍依裝置提供的語音而異。

## 公開部署與安全

- 部署使用既有隔離專案 `ultraman-heroes-base`，僅更新靜態 Hosting。
- 部署後 Google Cloud Billing 回應 `billingEnabled=false`，`billingAccountName` 為空。
- 移除部署工具自動建立的閒置 Browser key，確認撤銷作業完成且有效 Google API key 清單為空。平台保留端點的快取說明見 [SECURITY.md](SECURITY.md)。
- Hosting 只部署 59 個白名單檔案：5 個網頁／版號檔、1 個 SVG 標誌、53 個 PNG 人物圖片。
- 正式站全部 59 個檔案與已驗證的本機 dist 逐位元組一致；HTTP 安全標頭已查驗。
- `.env`、`.git/config`、`firebase.json`、`package.json`、`hero-catalogue.json`、`asset-manifest.json`、`qa/check.cjs`、`scripts/build.py` 與 `node_modules/linkedom/package.json` 均回應 404。
- 正式站完整玩法未發現 JavaScript 錯誤或第三方網路請求；人物素材由本站載入，不在遊玩時向百科網站抓資料。
- GitHub secret scanning 檢查沒有未解決警示；Actions artifact 數量為 0，未使用付費儲存或依賴快取。

## 正式部署 SHA-256

```text
index.html 23cb33029a5b06866d73f5594a456c9cd88701044c166ae0b866b2b1f16f6149
app.js 61c1472867e16577becb0b3b4c20d28679d47a1bd67f0e299a119911d74028d3
style.css b4236e530f7afb98ba0ec36cdbc7e4755ed67002e1e94131fc806d7c259ce43c
```

本次 Hosting 版本：`b9b4d7790e651438`。這是發布當下的驗證紀錄，之後新增服務或調整帳單設定需要重新查驗。

[v1.1.0 既有驗證紀錄](https://github.com/oeoeoeooeo/ultraman-little-heroes/blob/v1.1.0/QA_REPORT.md)。
