# v1.4.2 安全與免費部署範圍

此遊戲只提供靜態 HTML、CSS、JavaScript、PNG、SVG、MP3 和版號 JSON。

- 沒有 Firebase Web SDK、雲端資料庫、Cloud Functions、Cloud Run、App Hosting、第三方 AI／付費 TTS、分析追蹤、廣告或付款功能。
- 前端沒有 API 金鑰、存取權杖、服務帳號或環境變數；不呼叫 `fetch`、XMLHttpRequest、WebSocket 等網路介面。
- 九段歡呼 MP3 在製作時由 Mac 本機語音產生，遊戲只播放本站音檔；讀題使用瀏覽器提供的 Speech Synthesis；不提供麥克風輸入、不錄音、不傳送孩子的姓名或聲音。
- 星星、玩家模式、最近英雄組合、怪獸貼紙與旅程次數僅儲存在目前瀏覽器的 localStorage。不設登入、密碼或伺服器存檔。
- Hosting 設定以 `connect-src 'none'` 阻止前端連線，媒體只允許本站與離線嵌入的 data URI，禁止 iframe 嵌入、內嵌腳本、外掛物件與表單送出，並設定 `nosniff`、無 referrer 和相機／麥克風／定位／付款權限限制。
- `style-src` 允許 inline style，用於卡片配色、集氣條與動畫樣式；JavaScript 不允許 inline script 或 eval。
- `scripts/prepare_hosting.py` 用明確白名單建立 `dist`：只有 98 個靜態檔案。開發依賴、測試、CI、說明、離線單檔、`.env`、憑證、log 和 Firebase CLI 快取不部署。
- GitHub Actions 只在一般 `ubuntu-latest` 公開儲存庫 runner 進行測試；不設 Firebase 部署憑證或任何第三方 secrets，權限只給 `contents: read`。官方 Actions 固定到 commit SHA。不使用付費 artifact 儲存或依賴快取，截圖以壓縮後的 Base64 留在免費執行紀錄中。

Firebase 使用全新、隔離的 `ultraman-heroes-base` 專案與 Hosting 站點。部署前必須查證 `billingEnabled=false`、`billingAccountName` 為空；只部署 Hosting，不建立 Web App、資料庫、雲端函式或付費服務，也不綁定帳單或升級 Blaze。Firebase 建立專案時自動產生的閒置 Browser API key 已移除；上線後需確認有效 API key 清單仍為空。

Firebase 的 `/__/firebase/init.json` 是平台提供的保留端點，並非上傳檔案，不能把「專案檔案未含 key」當成已檢查平台端點。因此新版改用隔離專案，檢查平台回應與有效金鑰清單；不沿用舊專案設定。平台保留端點可能仍回傳已撤銷金鑰的快取值，不能把它誤認為有效金鑰；本次已確認撤銷作業完成，且在重新讀取端點後，有效 key 數量仍為 0。發布工具可能重新產生 Browser key，所以每次部署完成後都必須重新檢查並移除這個純靜態遊戲用不到的金鑰。若未來在 Google 控制台新增服務、建立新 key 或綁定帳單，需重新稽核。

免費 Hosting 仍有儲存與流量額度，而且同專案的多站點共享額度；額度不足會影響可用性。不要為了繼續提供服務而自動升級成付費方案。計費規則依 [Firebase 官方 Spark 方案](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans) 與 [Hosting 配額說明](https://firebase.google.com/docs/hosting/usage-quotas-pricing) 為準。

公開版本並非私人空間。遊戲只有一般角色資料，沒有孩子個資。官方角色素材之權利屬原權利人；本作品為非官方粉絲創作。

## 驗證

`npm test` 檢查互動流程；`npm run build && npm run test:security` 檢查部署白名單、版號、前端網路呼叫與憑證特徵；`npm run test:browser` 用真正的 Chromium 檢查完整玩法及九種螢幕尺寸。公開儲存庫 Actions 留下每次測試的紀錄，截圖放在免費 job log，不配置可能產生儲存費的 artifact 服務。
