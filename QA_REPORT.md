# v1.1.0 上線驗證紀錄

驗證日期：2026-10-15（台灣時間）。

- 正式站點：https://ultraman-heroes-base.web.app
- 公開原始碼：https://github.com/oeoeoeooeo/ultraman-little-heroes
- 正式站點的完整瀏覽器測試：[GitHub Actions 成功紀錄](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/38671320182)。

## 遊戲與 RWD

六種遊戲模式的 DOM 互動測試與 Chromium 瀏覽器測試通過，涵蓋答錯重試、難度切換、雙人變身、各自集氣、護盾、暫停、翻牌、九枚徽章、星星存檔、鍵盤和畫面按鈕。

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

九種尺寸均檢查首頁、選角、變身與對戰的水平溢出。40 張截圖保留在測試 job log；已人工檢視代表性的桌面、手機、平板、橫向、圖鑑、猜謎與合作畫面，以及修正後正式站的小手機首頁、手機首頁、平板合作和小手機變身畫面。實際手機硬體與中文語音聽感仍依裝置而異；此紀錄不代表已在每款實體裝置測試。

## 公開部署與安全

- 全新 Firebase 專案 `ultraman-heroes-base`：部署後 Google Cloud Billing 回應 `billingEnabled=false`，`billingAccountName` 為空。
- 沒有 Firebase Web App、後端、資料庫或付費 API；有效 Google API key 清單為空。平台保留端點可能顯示已撤銷 key 的快取資料，處理方式詳見 [SECURITY.md](SECURITY.md)。
- Hosting 只上傳 12 個白名單靜態檔案；不含憑證、開發依賴、測試程式、部署設定或 log。
- 正式站 HTML、JavaScript 與 CSS 的內容與已驗證的部署檔案一致；HTTP 安全標頭已查驗。
- `.env`、`.git/config`、`firebase.json`、`package.json`、`qa/check.cjs`、`scripts/build.py`、`node_modules/linkedom/package.json` 在正式站均回應 404。
- 正式站完整玩法測試未發現 JavaScript 錯誤或第三方網路請求；CSP 設定 `connect-src 'none'`。
- 公開 GitHub 儲存庫啟用 secret scanning 與 push protection，檢查時未有未解決的 secret scanning 警示；GitHub Actions 未使用 artifact 儲存或快取。

## 正式部署檔案 SHA-256

```text
index.html bdfe4b3d9c6c03bfe167321c579cede9f934785f0ed15725f7696e8317bfc3d7
app.js     55772f8c81a1434a66495e21cc78e9481c1793c88bb2ac629b897c711d389b67
style.css  305eb35b1f3603e201ab037e4d54e4a300b6dc33f9c3372072593246013e731d
```

這是本次發布的查驗紀錄；日後部署、增加服務或調整帳單設定時需重新查驗。
