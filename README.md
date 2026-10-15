# 光之國・小英雄基地

專為 4 歲與 6 歲小朋友製作的繁體中文超人力霸王互動遊戲。

**版本：v1.1.0（2026-10-15）**。首頁頁尾與側欄顯示版號，`version.json` 提供部署版本。

公開原始碼：[oeoeoeooeo/ultraman-little-heroes](https://github.com/oeoeoeooeo/ultraman-little-heroes)。新版預定站點：https://ultraman-little-heroes.web.app（部署與上線驗證完成後更新本段）。

## 立即玩

線上版使用 Chrome 或 Safari 開啟網址即可。離線版由 `python3 scripts/build.py` 產生 **「小英雄基地.html」**，所有圖片、程式與樣式都包在同一個檔案裡，可以離線玩，不用安裝、不用登入。產物不加入公開 Git，避免每次提交重複的大型檔案。也可以開啟開發用的 `index.html`，但需保留旁邊的 `assets` 資料夾、`style.css` 和 `app.js`。

首頁可選「弟弟模式」「哥哥模式」「兄弟一起」。建議第一次由爸爸媽媽陪著點一次，認識按鈕和鍵盤。

## 六種小冒險

| 任務 | 怎麼玩 |
| --- | --- |
| 猜猜我是誰 | 看英雄圖片與提示，認出初代、七號、迪卡、傑洛、傑特、梅比斯。每輪 5 題。 |
| 型態猜猜看 | 看迪卡的配色，找出複合型、力量型、天空型。每輪 5 題。 |
| 這是誰的變身器？ | 觀察變身器示意圖，選出它的主人。每輪 5 題。 |
| 變身！怪獸對戰 | 選英雄、拿出想像中的變身器、變身，再集氣發射必殺光線。 |
| 兄弟合體出任務 | 兩人各選一位英雄、各自變身，合作集氣發射合體光線。 |
| 英雄翻翻樂 | 找出英雄與他的變身器，配成一對。弟弟 4 組、哥哥 6 組。 |

另有六位英雄的圖鑑、故事朗讀、九枚成就徽章。星星於完成任務後發放，紀錄存在目前瀏覽器的 localStorage，沒有帳號與雲端同步。

## 操作

| 遊戲 | 操作 |
| --- | --- |
| 猜謎 | 點選答案，或按數字 `1`～`4`；答對後按「下一題」。 |
| 單人對戰 | `A`／`←` 攻擊、`S`／`↓` 護盾、`空白鍵` 必殺光線。 |
| 兄弟合作 | 哥哥 `A` 攻擊、`S` 護盾；弟弟 `L` 攻擊、`K` 護盾；兩人各集滿 4 格能量，按 `空白鍵` 發射。 |
| 暫停 | 按畫面「暫停」或 `Esc`。離開分頁會自動暫停，回來後手動繼續。 |
| 平板、手機 | 全部玩法都有畫面按鈕，可以直接觸控。 |

答錯不扣分、任務不設倒數時間、沒有遊戲結束懲罰。怪獸發出能量波時，試著開護盾；錯過時會收到光之國防護罩，繼續練習。完成對戰後，下次會輪替哥摩拉、小紫、小綠訓練怪獸。

弟弟模式提供英雄圖片選項、比較直接的提示與自動讀題；哥哥模式增加選項、減少提示。迪卡型態題維持三個選項。語音與音效可由右上角喇叭切換；中文語音是否可播放，依裝置與瀏覽器實際提供的聲音而定。首次開啟時，先點任一遊戲讓瀏覽器允許音效。

## 開發與檢查

遊戲本體使用 HTML、CSS、JavaScript，無執行期依賴、無外部連線。字型使用實際裝置可用的 `Microsoft JhengHei`、`PingFang TC`、`Heiti TC` 等繁體中文字型，未內嵌微軟字型。

```sh
# 需要 Node.js 的開發驗證；一般遊玩不需要這些步驟
npm install
npm test

# 將目前的原始碼打包成單檔離線遊戲
python3 scripts/build.py

# 有瀏覽器啟動權限的環境才可執行
npx playwright install chromium
npm run test:browser

# 選用：本機 HTTP 伺服器（另需環境允許開啟連接埠）
npm start
```

**本次已完成：** JavaScript 語法檢查、資產完整性檢查、六種完整遊戲流程的 DOM 互動測試（實際 click／keydown 事件），含難度、答錯重試、雙人變身、獨立集氣、護盾、暫停中光線停止結算、配對、九枚徽章、存檔、離開畫面取消延遲，以及切換分頁暫停。

**瀏覽器驗證：** 本機限制 macOS 瀏覽器程序權限；改由公開儲存庫的 GitHub Actions 執行 Chromium。`qa/check.cjs` 檢查九種尺寸（320×740、390×844、844×390、834×1194、1024×768、1280×720、1366×768、1440×1100、1920×1080）、直橫向與全遊戲流程。截圖以壓縮 Base64 放在免費 job log，不配置 artifact 儲存服務。結果以 Actions 的實際紀錄為準；語音聽感仍取決於孩子使用的裝置。手動執行工作流程時可填入 `game_url`，驗證實際線上站點且禁止第三方網路請求。

## 素材與角色資料

英雄圖片已儲存在 `assets/`，單檔版本亦已內嵌。來源為圓谷製作官方英雄圖鑑：

- [初代超人力霸王](https://tsuburaya-prod.com/heroes/ultraman)
- [超人七號](https://tsuburaya-prod.com/heroes/ultraseven)
- [迪卡與三種型態](https://tsuburaya-prod.com/heroes/ultraman-tiga)
- [傑洛與傑洛之眼](https://tsuburaya-prod.com/heroes/ultraman-zero)
- [傑特](https://tsuburaya-prod.com/heroes/ultraman-z)
- [梅比斯與梅比斯氣息](https://tsuburaya-prod.com/heroes/ultraman-mebius)
- [哥摩拉](https://tsuburaya-prod.com/encyclopedia/gomora)

中文名稱使用台灣常見譯名。變身器、迪卡型態和訓練怪獸使用遊戲自製的 SVG 示意插畫。徽章圖示使用裝置內建 Emoji；介面圖示與基地標誌為自製 SVG。

非官方粉絲創作，與圓谷製作無關。Ultraman 角色與圖片權利屬原權利人。

## 安全與免費空間

使用 Firebase 傳統靜態 Hosting 的 Spark 專案；不部署雲端函式、雲端資料庫、Cloud Run 或付費 App Hosting。只上傳 `dist` 的 12 個白名單靜態檔案。無前端 API 金鑰、付費 API、登入、分析追蹤或外部執行期依賴。部署前查證未綁定帳單；完整範圍與限制見 [SECURITY.md](SECURITY.md)。
