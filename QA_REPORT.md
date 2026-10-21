# v1.8.0 宇宙飛行救援驗證紀錄

查核日期：2026-10-22。正式遊戲：https://ultraman-heroes-base.web.app

## 新關卡與流程

新增單人／雙人宇宙街機：各自選英雄與難度、四波穿越星海、四波隕石救援、各自三次守門核心命中、保留個別準備狀態與最後合體光線。哥哥 A／S／D、弟弟 J／K／L；單人支援方向鍵與空白鍵，觸控支援獨立多指與長按連射。碰撞有護盾，不扣星光、不淘汰。

本機 `node --check app.js`、`npm test`、`npm run build`、`npm run test:security` 通過。新增測試檢查個別飛行時間、光線保留原航道、延遲命中、暫停中的光線、雙指各自放開／取消、碰撞後繼續、完成者等待夥伴、準備不必同時、合體中暫停、單人、重玩、說明／背景暫停、離開取消與 24～36 顆星星只發一次。原有遊戲及存檔檢查亦通過。

## 實際瀏覽器與畫面

原始碼的 Chromium 與 WebKit 完整回歸均通過。新關卡檢查 1440×1100、834×1194、1024×768、390×844、320×740、844×390，包含完整三段、單人、選角、個別難度、暫停、等待夥伴、合體與通關。控制鈕至少 44px 寬、54px 高，操作時戰場保持可見。窄手機的發射鍵放在方向鍵下方；短橫向將駕駛台放在戰場旁。Chromium CDP 送入同時存在的雙觸點，驗證各自長按連射、分開放手、取消與方向操作，沒有縮放或選字。

原有九種首頁尺寸（320px～1920px）、百科、對戰、合作、反應、星際飛行、接線、三站救援、貼紙、徽章、進度保存、音檔解碼與播放、朗讀排序均回歸通過。沒有瀏覽器腳本錯誤或執行期第三方請求。離線單檔成功建置，約 20.06 MB，圖片與音檔全部內嵌。

原始碼測試輸出 187 張截圖，以壓縮 Base64 留在既有 Actions log，不使用付費 artifact／cache。已實際檢視 Chromium 與 WebKit 的平板、320px／390px 直向、844px 橫向、設定、守門戰、等待夥伴、合體、結果與首頁入口；窄手機提示已縮短，避免單字落行。

正式網址完整測試另輸出 187 張截圖；已實際檢視正式站 WebKit 的 320px 飛行操作與平板合體畫面，確認窄手機按鈕、提示文字、英雄與最終演出正常呈現。

未以實體 iPad 或真人兒童試玩，沒有本版人工聽感測試。不能以自動測試推論孩子的主觀趣味。

## 可重現紀錄

- 已測試的執行程式與測試來源：`0dc377b535080edc816fd793d558894c8824afe6`。
- [原始碼完整測試](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/39633210369)：成功，含 Chromium、WebKit、流程、離線建置與安全檢查。
- [正式網址完整測試](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/39634445582)：成功，含 Chromium、WebKit 與完整回歸檢查。
- 部署前已核對本機執行程式、版號、素材清單與上述測試來源相同。後續文件修改不改動已測試程式。

## 正式站與安全

Hosting 版本：`sites/ultraman-heroes-base/versions/0e38ce1fae55037b`，UTC 2026-10-21 16:24:01 發布。版號 1.8.0，98 個白名單檔案均與本機 dist 逐位元組一致，首頁以正式根網址核對。`.env`、firebase.json、package.json、qa/logic.cjs、hero-catalogue.json 均為 404。正式 HTML 的 CSP 保留 `connect-src 'none'`，並設定 nosniff。

部署前後均確認 billingEnabled=false，billingAccountName 為空，Firebase Web Apps 0。Firebase CLI 本次自動建立一把 Browser key，已移除且撤銷作業完成；讀取平台保留 init 端點後再次確認有效 API key 仍為 0，暫存驗證憑證已清除。遊戲沒有使用該端點，也沒有新增 API、SDK、帳號、付款、追蹤或後端。詳見 [SECURITY.md](SECURITY.md)。

| 正式檔案 | SHA-256 |
| --- | --- |
| index.html | 2866bb76dd7b5a3f8bed71c02a433f70f4870e2c86c1f428951828b593496981 |
| app.js | f42a45e86c0757c53db7b4092fee2a07d5132ecd2705531ead5d920cacd6bfd8 |
| style.css | 75d2573313033c0f181f8a26fc63af33efd7bfbd800df6a08992695cc6b13384 |
| assets/voice-correct.mp3 | f12e91f2281363b8b87b3655df75aae388401759669077644d8c4c55a90dcbf0 |

---

# v1.7.0 驗證紀錄

查核日期：2026-10-19。正式遊戲：https://ultraman-heroes-base.web.app

## 新增合作關卡

「兄弟守護隊」含各自變身、互動教學、巴士／列車／太空基地三站救援、分工交換、各自準備與合體光線。輕鬆線索保留，挑戰看過線索再回想 2～3 步；提示、錯誤與夥伴進度分開處理，完成才發 24 顆星星。可兩人合作或一人輪流。

DOM 測試使用實際點擊、鍵盤與合成 pointer 事件，涵蓋錯誤後重新預覽、提示後再次隱藏、已完成夥伴不重做、交換工作後個別難度、晚一點準備、演出中暫停、背景暫停、離開取消，以及獎勵僅結算一次。原有遊戲、百科、九枚徽章、存檔、音效排序、飛行與接線回歸通過；新增後首頁十款遊戲。

## 實際瀏覽器與視覺檢查

原始碼的 Chromium 與 WebKit 完整流程通過。新關卡檢查 834×1194、1024×768、390×844、320×740、844×390，驗證不橫向溢出、按鈕尺寸、戰場可見、完整三站、交換、暫停、合體與通關；WebKit 旋轉後的自動暫停會明確按繼續再操作。Chromium CDP 同時送入兩個觸點，驗證各自變身、不同任務同時完成、各自放開／取消，以及沒有縮放或選字。

沿用原有九種 RWD 尺寸與舊遊戲完整測試。原始碼執行輸出 155 張截圖，經壓縮 Base64 保留在 Actions log，不使用付費 artifact 或 cache。已實際檢視首頁、Chromium／WebKit 的窄手機與橫向守護隊、平板操作、交換後三圖形按鈕、救援過站與通關；窄手機戰場縮小、文案縮短，基地標籤避免擠壓。

正式網址的 Chromium 與 WebKit 完整回歸測試均通過，另輸出 155 張截圖；已檢視正式站平板合體光線與 320px 交換工作畫面。未在實體 iPad 或兒童上試玩，沒有人工聽感驗證，也未以自動測試推論「孩子一定喜歡」。

## 可重現紀錄

- 最終執行程式來源：`fa2e3085355c6b1ad40ca9e58ffc1b7d23c934c0`。
- [原始碼完整測試](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/39264863524)：成功，含 Chromium、WebKit、功能與安全檢查。
- [正式網址完整測試](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/39265964902)：成功，測試來源 `4411830857ad0677325ebda2a55ce2ff228c269d`。與已測試的執行程式相同，僅調整截圖等待動畫與截圖範圍。
- 最後文件提交只更新說明與驗證紀錄，沒有改動已測試的程式、資產或部署內容。
- 部署前以 Git blob hash 核對本機 app.js、style.css、index.html、package.json、asset-manifest.json，均與已通過的遠端程式一致。

## 正式站與安全

Hosting 版本：`projects/948435005577/sites/ultraman-heroes-base/versions/f8a3d9055272ee30`。98 個白名單檔案均與本機 dist 逐位元組一致，index.html 以正式根網址比對，版號為 1.7.0。`.env`、firebase.json、package.json、qa/logic.cjs、hero-catalogue.json 均為 404。

部署前確認 billingEnabled=false、未綁定帳單；部署後 Firebase Web Apps 0、有效 API key 0。Firebase 自動建立的閒置 Browser key 已刪除，撤銷作業 done=true。平台保留端點可能含已撤銷快取值，遊戲不存取它。正式 HTML 的 CSP 為 connect-src 'none'、媒體限本站、禁止 iframe，並有 nosniff 與相關權限限制。靜態安全檢查通過，未新增 API、SDK、付費服務、帳號、追蹤或外部啟動依賴。

公開儲存庫的 secret scanning／push protection 啟用，open secret alerts、Actions artifacts 與 caches 均為 0。私人驗證設定存於專案外，不加入 Git 或 Hosting；發布前已清除本次私人設定檔。

| 正式檔案 | SHA-256 |
| --- | --- |
| index.html | 5fc20964dc86a40bd3f4715431f7f2bb2f3d0bea3fd0349afaf8729ba4c7db1e |
| app.js | 44a1f5edb7ab2bb24e1d9154c94506e321e477a183d1c0b6fff8f2cb9a8361da |
| style.css | d7ce141d6385977b99f0500e21caa2ec915328927d1ab801e90c384da056d333 |
| assets/voice-correct.mp3 | f12e91f2281363b8b87b3655df75aae388401759669077644d8c4c55a90dcbf0 |

以下保留上一版歷史驗證紀錄。

# v1.6.0 驗證紀錄（歷史）

查核日期：2026-10-16。線上遊戲：https://ultraman-heroes-base.web.app

## 平板多指操作

長按改用每個 pointerId 各自管理，不再共用單一長按狀態。哥哥放手只停止哥哥，弟弟仍可繼續；觸控取消、失去捕捉、暫停、離開與切到背景會清除對應操作。觸控在按下時立即生效，抑制後續相容點擊；滑鼠、鍵盤與輔助功能產生的點擊保留。

戰鬥、雙人變身、反應與飛行控制鈕使用 touch-action:none，阻止按鈕區拖曳、縮放、選字及長按選單，保留其他位置的文件滑動。作業系統保留的多指手勢仍由裝置設定決定，網頁不保證能阻止。

- DOM 事件測試：兩人同時按下、分別放手、取消、相容點擊不重複出招，以及暫停與離開清除長按。
- Chromium CDP：送入兩個同時存在的觸控點並移動，驗證兩人各自集氣、哥哥放手後弟弟繼續、取消後停止、畫面沒有縮放或選字；另驗證雙人同時換航道及同時完成反應訊號。
- WebKit 使用觸控裝置模擬檢查控制與畫面；本次沒有實體 iPad 或真人兒童試玩。

## 新街機與智力遊戲

「雙人星際飛行」各自有三條航道，每趟 12 波；3.2／2.4／1.7 秒三段速度、合作連擊、星光及護盾。兩人可各自左右移動，暫停及背景暫停保留進度，再玩保留速度。畫面、波次、分數與暫停鍵保持同區，手機橫向改為航道／控制並排。

「光能接線」每次產生三座可解基地：弟弟與兄弟模式 3×3，哥哥後兩關 4×4；旋轉管道讓光從左上入口抵達右下出口。提供即時亮路、復原、重來及逐步提示，沒有倒數，完成三關才發獎。

DOM 測試完成全部飛行速度、左右邊界、個別計分、護盾、暫停、離開取消及獎勵不重複；隨機測試 60 個接線盤面，提示均能導向解答，並檢查復原、重來、年齡格數及完成才發獎。Chromium／WebKit 以實際按鈕完成飛行 12 波及接線三關，飛行檢查 834、1024、390、320、844px 五種直橫向尺寸、畫面與控制同時可見、按鈕至少 44×60px；接線檢查 834、390、320、844px 四種尺寸，管道格至少 40px。

## 原有功能與畫面

首頁九款遊戲，九枚完整徽章；保留六項基本任務的探險家條件與舊存檔。既有猜角色、型態、道具、單雙人對戰、翻牌、反應特訓、三站救援及貼紙均完成回歸測試。沿用 53 位英雄、55 種型態、60 件道具、90 招招式及 30 位怪獸，本版未新增百科資料或來源查核。

原有九種 RWD 尺寸（320px 至 1920px）、圖鑑與貼紙簿、平板文件滑動、戰場與光效、九段本機 MP3 解碼與播放、歡呼後才讀答案、換題／靜音取消、存檔過濾及離開清除均通過。沒有瀏覽器腳本錯誤或第三方執行期請求。離開勝利後會清除彩紙，DOM 與兩種瀏覽器均驗證不會殘留到下一關。

每次完整執行產生 137 張截圖，放在 Actions job log，沒有 artifact 或 cache 儲存。實際檢視 Chromium 的九款遊戲首頁、平板／窄手機飛行、橫向駕駛台、接線盤面、暫停及通關畫面。另檢視正式站 WebKit 的橫向飛行與窄手機接線，確認離開勝利後沒有彩紙遮擋新關卡。

未在實體 iPad、所有字型組合或真人兒童上驗證，不能把自動測試視為孩子已覺得好玩。既有音檔未在本版重製；原生朗讀排序測試仍使用記錄器，沒有人工聆聽確認音色。

## 可重現紀錄

- 最終程式與測試 commit：`c9f9b7092a951060512269c76f1ca7bfb597a281`。
- [原始碼完整測試](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/38768649272)：成功，含 Chromium 與 WebKit。
- [正式 web.app 完整測試](https://github.com/oeoeoeooeo/ultraman-little-heroes/actions/runs/38768747388)：成功，含 Chromium 與 WebKit。
- 最後文件提交只更新說明與驗證紀錄，沒有改動已測試的程式、資產或部署內容。

## 正式站台與安全

Hosting 版本：`sites/ultraman-heroes-base/versions/659ba394f90bba9b`。98 個白名單檔案均與本機 dist 逐位元組一致，index.html 使用正式根網址核對。`.env`、`firebase.json`、`package.json`、`qa/logic.cjs`、`hero-catalogue.json` 均為 404。

已確認 billingEnabled=false、未綁定帳單、Firebase Web Apps 0、有效 Google API key 0。部署自動建立的閒置 Browser key 已刪除，撤銷作業完成。平台保留的 /__/firebase/init.json 仍含已撤銷快取值；讀取後再查 key 數量仍為 0，遊戲沒有使用此端點。詳見 [SECURITY.md](SECURITY.md)。

正式 HTML 的 CSP 設定 connect-src 'none'、限制媒體為本機、禁止嵌入，並設定 nosniff。遊戲沒有新增 API、SDK、追蹤、帳號、付款或後端，進度保存在目前瀏覽器。公開儲存庫的 secret scanning 與 push protection 開啟，警報、artifact、cache 均為 0。稽核憑證、簽名 log 網址設定與平台快取回應均已於發布後清除。

| 正式檔案 | SHA-256 |
| --- | --- |
| index.html | ac32340af8784525728a0f64415afa8db9c9417820cc80fd5d3c97e7067f712c |
| app.js | c08c1a38f2df7c28fe1bce1c8a54b9ffde4c4779130e844760274655976734fb |
| style.css | ccf6d4b5660811de0df6aa4ba9e65ca500d71df924b8aa35946b41b61e70a31a |
| assets/voice-correct.mp3 | f12e91f2281363b8b87b3655df75aae388401759669077644d8c4c55a90dcbf0 |
