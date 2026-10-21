# v1.8.0 專案資料索引

整理日期：2026-10-22。遊戲程式與正式站台版本：v1.8.0，完整驗證見 QA_REPORT.md。本次沿用專案既有來源與驗證紀錄，未新增百科查核或角色資料。

## 現有內容

| 內容 | 數量／範圍 | 主要資料 |
| --- | --- | --- |
| 英雄 | 53 位 | `hero-catalogue.json` |
| 型態 | 55 種 | `adventure-catalogue.json` 的 `forms` |
| 變身器、力量道具與武器 | 60 件 | 同檔的 `devices`；並非每件都是變身器 |
| 代表招式 | 90 招 | 同檔的 `moves` |
| 怪獸與友善夥伴 | 30 位 | 同檔的 `monsters` |
| 玩法 | 十一款遊戲（含宇宙飛行救援、兄弟守護隊、反應、飛行與接線），另有三站救援旅程 | `app.js` |
| 收藏 | 九枚徽章、30 位夥伴貼紙 | `app.js`；進度存於瀏覽器 |
| 歡呼 | 九段重新製作的本機 MP3 | `assets/`；讀題另使用裝置語音 |

## 文件與用途

| 文件 | 要找什麼 |
| --- | --- |
| [README.md](README.md) | 遊戲入口、操作、建置與測試方式 |
| [SOURCES.md](SOURCES.md) | 英雄與素材來源、收錄範圍、譯名及示意圖限制 |
| [UX_REVIEW.md](UX_REVIEW.md) | 玩家流程改善、多指與合作玩法 |
| [SPACE_RESCUE.md](SPACE_RESCUE.md) | 宇宙飛行救援的三段關卡、操作、難度與驗收 |
| [GAME_DESIGN.md](GAME_DESIGN.md) | 兄弟守護隊研究、規格與後續試玩目標 |
| [QA_REPORT.md](QA_REPORT.md) | 已完成的互動、RWD、正式站台與安全驗證 |
| [SECURITY.md](SECURITY.md) | 靜態部署、免費範圍、本機進度與金鑰稽核 |
| [PLAYTEST.md](PLAYTEST.md) | 尚待進行的家庭試玩與空白紀錄表 |
| [ROADMAP.md](ROADMAP.md) | 後續候選功能、開發順序與驗收條件 |
| [CHANGELOG.md](CHANGELOG.md) | 發布版本與變更範圍 |

## 更新資料時的規則

1. 英雄資料同步更新 `hero-catalogue.json` 與 `app.js` 的 `HEROES`；型態、道具、招式及怪獸同步更新 `adventure-catalogue.json` 與相應程式常數。既有測試會檢查一致性。
2. 每筆資料保留來源與主人關聯；官方設定、自製示意圖及原創玩法分別說明。沒有查證的專屬招式不寫成官方技能。
3. 新增資產時更新 `asset-manifest.json` 的部署白名單，確認本機圖片／音檔完整，更新數量與驗證紀錄。
4. 道具猜謎排除純武器與共用主人造成的多重正解；型態題使用同一英雄的型態。
5. 程式修改完成後執行適用的邏輯、安全與瀏覽器檢查，查看代表性截圖，再更新遊戲版號。

`qa/check.cjs` 包含 Chromium 真實觸控滑動、語音排序與光效檢查；`qa/tablet-webkit.cjs` 另驗證 WebKit 平板尺寸的捲動、戰場位置與本機音檔。這些測試不等同實體 iPad 驗證。

正式站台只部署白名單中的遊戲檔案。來源、試玩表與開發文件透過公開 GitHub 查閱，家庭填寫的觀察紀錄保留在本機。

新增 QA：`qa/arcade-browser.cjs` 檢查飛行、接線及 Chromium CDP 同時雙指；`qa/logic.cjs` 覆蓋獨立長按、三種速度及隨機接線盤面。角色資料與素材清單未變動。

宇宙飛行救援 QA：`qa/space-logic.cjs` 涵蓋三段流程與獎勵；`qa/space-browser.cjs` 涵蓋 Chromium／WebKit 六種尺寸及實際多指操作。
