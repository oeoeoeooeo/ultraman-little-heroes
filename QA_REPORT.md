# v1.3.0 驗證紀錄

查核日期：2026-10-15。線上遊戲：https://ultraman-heroes-base.web.app

## 已通過的檢查

- `node --check app.js`、`npm test`、`npm run build`、`npm run test:security`。
- 53 位英雄、55 種型態、60 件道具、90 招代表招式、30 隻怪獸的唯一識別碼、來源、主人關聯及實際本機圖片。
- 全部型態題的選項均來自同一位英雄；道具題排除同一件道具的其他主人，不形成多重正解。翻牌可使用新增道具，每輪不重複主人或道具。
- 全六種任務的完整流程、錯題重試、五題完成、不同年齡難度、兩人變身／能量、翻牌、九枚徽章、進度儲存、導覽取消與背景暫停。
- 力量型的傷害加成、重裝／飛行型態挑戰、分身與鑽地點星星、Pucchi 友善救援、慈愛型救援加成。暫停期間不能換型態、換招式或答分身挑戰。
- 真正 Chromium 下的全部百科分頁、圖片完整載入、鍵盤與大按鈕操作、型態／招式切換、分身找目標及友善救援。沒有腳本錯誤與跨站執行期請求。
- 九段 MP3 全部可解碼，含實際聲音，長度約 1.9～3.7 秒、峰值未達削波；瀏覽器實際播放、靜音與換頁取消。未人工聆聽，未宣稱已做主觀音色驗收。讀題聲音仍依裝置中文語音而定。

## RWD 與實際畫面

Chromium 測試 1920×1080、1440×1100、1366×768、1280×720、1024×768、834×1194、390×844、320×740、844×390，檢查首頁、雙人選角、變身及對戰。新增四個百科分頁另在桌機、平板、手機與 320px 窄螢幕驗證。共 63 張截圖，保留在免費 Actions job log，不使用 artifact 儲存。

已實際查看桌機型態與招式百科、窄螢幕道具百科、手機怪獸百科、320px 雙人對戰、手機巴爾坦分身與 Pucchi 救援截圖。修正窄螢幕怪獸遮住第二位英雄的問題，測試也檢查兩位英雄和怪獸的邊界不重疊。型態／道具為明示的簡化配色示意；人物圖為基本造型搭配型態光暈與標籤。沒有宣稱已在實體手機、Safari 或所有字型組合驗證。

## 可重現的公開紀錄

- 最終程式 commit：`9b5f4f1d15c3a6fbb4b07ce780e82b7a68cb6a3e`。
- [最終原始碼完整測試](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/38678802841)：成功。
- [正式 web.app 完整測試](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/38678842798)：成功，包含正式站台的語音播放與媒體政策。
- 本紀錄與 README 的最後提交只更新說明，不修改已測試的程式與資產。

## 正式站台與安全

Hosting 版本：`sites/ultraman-heroes-base/versions/ff93a8dc07d2aa87`。正式站台的 98 個白名單檔案全部下載，比對本機 `dist` 逐位元組一致。受保護的 `.env`、`firebase.json`、`package.json`、`qa/logic.cjs`、`hero-catalogue.json` 路徑均回 404。

已確認 `billingEnabled=false`、未綁定帳單、Firebase Web Apps 數量 0、有效 Google API key 數量 0。部署工具自動建立的閒置 Browser key 在最後一次部署後再次撤銷，且撤銷作業完成。平台保留端點仍可能含已撤銷的快取 key，詳見 SECURITY.md；遊戲檔案沒有上傳金鑰、憑證、付費 API、SDK、分析或後端。

正式 HTML 已核對 CSP 的 `connect-src 'none'`、`media-src 'self' data:` 和 `nosniff`。GitHub 公開儲存庫開啟 secret scanning 與 push protection，公開警報 0；Actions artifact 與 cache 均為 0。敏感稽核用暫存設定已刪除。

| 正式檔案 | SHA-256 |
| --- | --- |
| `index.html` | `72dc43058fefb66104c579a48231574e795526b316f68021d32d134ccb740277` |
| `app.js` | `62fcdea01cd2d8266ca0b56a7cb2536d21e1da24a7bcfca253a0747784146b6d` |
| `style.css` | `36120652bcc78f37d958001edeb9130648af0b1451cdc17aeb120df107482eb2` |
