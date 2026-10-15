'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const main = $('#main');
const ICONS = {
  planet:'<circle cx="12" cy="12" r="7"/><path d="M5 8C-3 12 4 20 17 14S24 5 18 7"/>',
  hero:'<path d="M12 2 21 6v7c0 5-9 9-9 9S3 18 3 13V6Z"/><path d="m6 9 4 2-1 3-3-2Zm12 0-4 2 1 3 3-2ZM10 17h4M12 3v5"/>',
  medal:'<circle cx="12" cy="9" r="6"/><path d="m8 14-2 8 6-3 6 3-2-8m-4-8 1 2 2 .5-1.5 1.5.3 2-1.8-1-1.8 1 .3-2L9 8.5l2-.5Z"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back:'<path d="M19 12H5m6-6-6 6 6 6"/>',
  sound:'<path d="M11 4 6 8H3v8h3l5 4Zm4 4c2 2 2 6 0 8m3-11c4 4 4 10 0 14"/>',
  mute:'<path d="M11 4 6 8H3v8h3l5 4Zm5 5 5 6m0-6-5 6"/>',
  expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-11v1"/>',
  heart:'<path d="M12 21 3 12C-3 5 7-2 12 6c5-8 15-1 9 6Z"/>',
  sparkle:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Zm7 0 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
  play:'<path d="m8 4 12 8-12 8Z"/>',
  keyboard:'<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M6 9h.1m4 0h.1m4 0h.1m4 0h.1M6 12h.1m4 0h.1m4 0h.1m4 0h.1M7 16h10"/>'
};
function icon(name){return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.sparkle}</svg>`;}
$$('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon));
$('#fullscreen-button').innerHTML = icon('expand');

const HEROES = [
  {
    "id": "ultraman",
    "name": "初代超人力霸王",
    "short": "初代",
    "en": "ULTRAMAN",
    "color": "#edf0df",
    "device": "貝塔膠囊",
    "hint": "我是紅色與銀色的英雄，胸口有藍色的彩色計時器。",
    "fact": "來自 M78 星雲的光之國，為了守護地球，和早田一起奮戰。",
    "move": "斯派修姆光線",
    "year": 1966,
    "era": "classic",
    "deviceQuiz": true,
    "deviceKey": "貝塔膠囊",
    "source": "https://tsuburaya-prod.com/heroes/ultraman"
  },
  {
    "id": "seven",
    "name": "超人七號",
    "short": "七號",
    "en": "ULTRASEVEN",
    "color": "#f3e8de",
    "device": "超人力霸王之眼",
    "hint": "我全身紅紅的，頭上有一把可以飛出去的頭鏢！",
    "fact": "愛護地球生命的紅色英雄。額頭能發出光線，頭上還有厲害的頭鏢！",
    "move": "艾梅利姆光線",
    "year": 1967,
    "era": "classic",
    "deviceQuiz": true,
    "deviceKey": "超人力霸王之眼",
    "source": "https://tsuburaya-prod.com/heroes/ultraseven"
  },
  {
    "id": "tiga",
    "name": "超人力霸王迪卡",
    "short": "迪卡",
    "en": "ULTRAMAN TIGA",
    "color": "#eae5f2",
    "device": "神光棒（亦稱閃光棒）",
    "hint": "我有紅色、紫色和銀色，還能變成三種型態！",
    "fact": "從超古代甦醒的光之巨人，可以切換複合型、力量型與天空型。",
    "move": "哉佩利敖光線",
    "year": 1996,
    "era": "heisei",
    "deviceQuiz": true,
    "deviceKey": "神光棒",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-tiga"
  },
  {
    "id": "zero",
    "name": "超人力霸王傑洛",
    "short": "傑洛",
    "en": "ULTRAMAN ZERO",
    "color": "#e2edf1",
    "device": "傑洛之眼",
    "hint": "我是七號的兒子，頭上有兩把帥氣的頭鏢！",
    "fact": "超人七號的兒子。跟雷歐學過宇宙拳法，擅長快速的戰鬥。",
    "move": "傑洛集束射線",
    "year": 2009,
    "era": "heisei",
    "deviceQuiz": true,
    "deviceKey": "傑洛之眼",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-zero"
  },
  {
    "id": "z",
    "name": "超人力霸王傑特",
    "short": "傑特",
    "en": "ULTRAMAN Z",
    "color": "#e1eeee",
    "device": "Z 昇華器",
    "hint": "我很崇拜傑洛師父，我的名字是一個英文字母 Z！",
    "fact": "充滿熱情的新手英雄，把傑洛當成師父，努力守護和平。",
    "move": "傑斯帝姆光線",
    "year": 2020,
    "era": "new",
    "deviceQuiz": true,
    "deviceKey": "Z 昇華器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-z"
  },
  {
    "id": "mebius",
    "name": "超人力霸王梅比斯",
    "short": "梅比斯",
    "en": "ULTRAMAN MEBIUS",
    "color": "#f3e7d9",
    "device": "梅比斯氣息",
    "hint": "我的變身器戴在手腕上，我的名字叫梅比斯！",
    "fact": "和 GUYS 隊員一起守護地球，從彼此的友情中獲得力量。",
    "move": "梅比姆射線",
    "year": 2006,
    "era": "heisei",
    "deviceQuiz": true,
    "deviceKey": "梅比斯氣息",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-mebius"
  },
  {
    "id": "zoffy",
    "short": "佐菲",
    "name": "超人力霸王佐菲",
    "en": "ZOFFY",
    "year": 1966,
    "era": "classic",
    "device": "無專屬變身器",
    "deviceKind": "none",
    "deviceKey": "無專屬變身器",
    "deviceQuiz": false,
    "fact": "宇宙警衛隊的隊長，也是超人兄弟的可靠夥伴。",
    "hint": "我是佐菲！宇宙警衛隊的隊長，也是超人兄弟的可靠夥伴。",
    "move": "M87 光線",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/zoffy"
  },
  {
    "id": "jack",
    "short": "傑克",
    "name": "超人力霸王傑克",
    "en": "ULTRAMAN JACK",
    "year": 1971,
    "era": "classic",
    "device": "意念變身",
    "deviceKind": "none",
    "deviceKey": "意念變身",
    "deviceQuiz": false,
    "fact": "與鄉秀樹一起保護地球，擅長使用七號贈送的超級手鐲。",
    "hint": "我是傑克！與鄉秀樹一起保護地球，擅長使用七號贈送的超級手鐲。",
    "move": "斯派修姆光線",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-jack"
  },
  {
    "id": "ace",
    "short": "衛司",
    "name": "超人力霸王衛司",
    "en": "ULTRAMAN ACE",
    "year": 1972,
    "era": "classic",
    "device": "超級戒指",
    "deviceKind": "ring",
    "deviceKey": "超級戒指",
    "deviceQuiz": true,
    "fact": "額頭和胸口都有能量來源，擅長各式各樣的光線招式。",
    "hint": "我是衛司！額頭和胸口都有能量來源，擅長各式各樣的光線招式。",
    "move": "梅塔利姆光線",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ace"
  },
  {
    "id": "taro",
    "short": "太郎",
    "name": "超人力霸王太郎",
    "en": "ULTRAMAN TARO",
    "year": 1973,
    "era": "classic",
    "device": "超級徽章",
    "deviceKind": "badge",
    "deviceKey": "超級徽章",
    "deviceQuiz": true,
    "fact": "超人之父與超人之母的兒子，頭上有一對超級之角。",
    "hint": "我是太郎！超人之父與超人之母的兒子，頭上有一對超級之角。",
    "move": "斯特利姆光線",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-taro"
  },
  {
    "id": "leo",
    "short": "雷歐",
    "name": "超人力霸王雷歐",
    "en": "ULTRAMAN LEO",
    "year": 1974,
    "era": "classic",
    "device": "獅子之瞳",
    "deviceKind": "ring",
    "deviceKey": "獅子之瞳",
    "deviceQuiz": true,
    "fact": "來自獅子座 L77 星，努力鍛鍊拳腳功夫，也教導過傑洛。",
    "hint": "我是雷歐！來自獅子座 L77 星，努力鍛鍊拳腳功夫，也教導過傑洛。",
    "move": "雷歐飛踢",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-leo"
  },
  {
    "id": "astra",
    "short": "阿斯特拉",
    "name": "阿斯特拉",
    "en": "ASTRA",
    "year": 1974,
    "era": "classic",
    "device": "無專屬變身器",
    "deviceKind": "none",
    "deviceKey": "無專屬變身器",
    "deviceQuiz": false,
    "fact": "雷歐的弟弟，與哥哥一起守護和平。",
    "hint": "我是阿斯特拉！雷歐的弟弟，與哥哥一起守護和平。",
    "move": "兄弟合體光線",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/astra"
  },
  {
    "id": "king",
    "short": "尊王",
    "name": "超人力霸王尊王",
    "en": "ULTRAMAN KING",
    "year": 1974,
    "era": "classic",
    "device": "無專屬變身器",
    "deviceKind": "none",
    "deviceKey": "無專屬變身器",
    "deviceQuiz": false,
    "fact": "神祕而強大的長者，會在英雄需要幫助時伸出援手。",
    "hint": "我是尊王！神祕而強大的長者，會在英雄需要幫助時伸出援手。",
    "move": "尊王閃光",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-king"
  },
  {
    "id": "father-of-ultra",
    "short": "超人之父",
    "name": "超人之父",
    "en": "FATHER OF ULTRA",
    "year": 1972,
    "era": "classic",
    "device": "無專屬變身器",
    "deviceKind": "none",
    "deviceKey": "無專屬變身器",
    "deviceQuiz": false,
    "fact": "宇宙警衛隊的大隊長，也是太郎的爸爸。",
    "hint": "我是超人之父！宇宙警衛隊的大隊長，也是太郎的爸爸。",
    "move": "光之力量",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/father-of-ultra"
  },
  {
    "id": "mother-of-ultra",
    "short": "超人之母",
    "name": "超人之母",
    "en": "MOTHER OF ULTRA",
    "year": 1973,
    "era": "classic",
    "device": "無專屬變身器",
    "deviceKind": "none",
    "deviceKey": "無專屬變身器",
    "deviceQuiz": false,
    "fact": "溫柔的銀十字軍隊長，使用治癒力量幫助受傷的英雄。",
    "hint": "我是超人之母！溫柔的銀十字軍隊長，使用治癒力量幫助受傷的英雄。",
    "move": "治癒之光",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/mother-of-ultra"
  },
  {
    "id": "80",
    "short": "80",
    "name": "超人力霸王80",
    "en": "ULTRAMAN 80",
    "year": 1980,
    "era": "classic",
    "device": "電光棒",
    "deviceKind": "spark",
    "deviceKey": "電光棒",
    "deviceQuiz": true,
    "fact": "在人類世界擔任老師，守護孩子，也用靈活身手保護地球。",
    "hint": "我是80！在人類世界擔任老師，守護孩子，也用靈活身手保護地球。",
    "move": "沙庫修姆光線",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-80"
  },
  {
    "id": "yullian",
    "short": "尤莉安",
    "name": "尤莉安",
    "en": "YULLIAN",
    "year": 1980,
    "era": "classic",
    "device": "閃光手鐲",
    "deviceKind": "wrist",
    "deviceKey": "閃光手鐲",
    "deviceQuiz": true,
    "fact": "光之國的公主，曾經來到地球，與 80 一起作戰。",
    "hint": "我是尤莉安！光之國的公主，曾經來到地球，與 80 一起作戰。",
    "move": "雙重力量",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/yullian"
  },
  {
    "id": "joneus",
    "short": "喬尼亞斯",
    "name": "超人力霸王喬尼亞斯",
    "en": "ULTRAMAN JONEUS",
    "year": 1979,
    "era": "classic",
    "device": "閃光之星",
    "deviceKind": "badge",
    "deviceKey": "閃光之星",
    "deviceQuiz": true,
    "fact": "來自 U40 星的戰士，胸口有醒目的星形標誌。",
    "hint": "我是喬尼亞斯！來自 U40 星的戰士，胸口有醒目的星形標誌。",
    "move": "普拉尼姆光線",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-joneus"
  },
  {
    "id": "scott",
    "short": "史考特",
    "name": "超人力霸王史考特",
    "en": "ULTRAMAN SCOTT",
    "year": 1987,
    "era": "classic",
    "device": "意念變身",
    "deviceKind": "none",
    "deviceKey": "意念變身",
    "deviceQuiz": false,
    "fact": "與飛行員史考特合為一體，和查克、貝絲組成 Ultra Force。",
    "hint": "我是史考特！與飛行員史考特合為一體，和查克、貝絲組成 Ultra Force。",
    "move": "光線招式",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-scott"
  },
  {
    "id": "chuck",
    "short": "查克",
    "name": "超人力霸王查克",
    "en": "ULTRAMAN CHUCK",
    "year": 1987,
    "era": "classic",
    "device": "意念變身",
    "deviceKind": "none",
    "deviceKey": "意念變身",
    "deviceQuiz": false,
    "fact": "Ultra Force 的年長夥伴，能認出友善怪獸並幫助牠。",
    "hint": "我是查克！Ultra Force 的年長夥伴，能認出友善怪獸並幫助牠。",
    "move": "光線招式",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-chuck"
  },
  {
    "id": "beth",
    "short": "貝絲",
    "name": "女超人力霸王貝絲",
    "en": "ULTRAWOMAN BETH",
    "year": 1987,
    "era": "classic",
    "device": "意念變身",
    "deviceKind": "none",
    "deviceKey": "意念變身",
    "deviceQuiz": false,
    "fact": "Ultra Force 的女英雄，與史考特、查克一起守護和平。",
    "hint": "我是貝絲！Ultra Force 的女英雄，與史考特、查克一起守護和平。",
    "move": "光線招式",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultrawoman-beth"
  },
  {
    "id": "great",
    "short": "葛雷",
    "name": "超人力霸王葛雷",
    "en": "ULTRAMAN GREAT",
    "year": 1990,
    "era": "heisei",
    "device": "電漿三角",
    "deviceKind": "pendant",
    "deviceKey": "電漿三角",
    "deviceQuiz": true,
    "fact": "與傑克辛道一起奮戰，用多種光線和拳腳功夫保護地球。",
    "hint": "我是葛雷！與傑克辛道一起奮戰，用多種光線和拳腳功夫保護地球。",
    "move": "燃燒電漿",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-great"
  },
  {
    "id": "powered",
    "short": "帕瓦德",
    "name": "超人力霸王帕瓦德",
    "en": "ULTRAMAN POWERED",
    "year": 1993,
    "era": "heisei",
    "device": "閃光稜鏡",
    "deviceKind": "spark",
    "deviceKey": "閃光稜鏡",
    "deviceQuiz": true,
    "fact": "與健一凱伊合為一體，追蹤巴爾坦星人並守護地球。",
    "hint": "我是帕瓦德！與健一凱伊合為一體，追蹤巴爾坦星人並守護地球。",
    "move": "超級斯派修姆光線",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-powered"
  },
  {
    "id": "dyna",
    "short": "帝納",
    "name": "超人力霸王帝納",
    "en": "ULTRAMAN DYNA",
    "year": 1997,
    "era": "heisei",
    "device": "閃光劍",
    "deviceKind": "spark",
    "deviceKey": "閃光劍",
    "deviceQuiz": true,
    "fact": "與飛鳥真一起奮戰，可以切換閃光型、強壯型與奇蹟型。",
    "hint": "我是帝納！與飛鳥真一起奮戰，可以切換閃光型、強壯型與奇蹟型。",
    "move": "索爾捷特光線",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-dyna"
  },
  {
    "id": "gaia",
    "short": "蓋亞",
    "name": "超人力霸王蓋亞",
    "en": "ULTRAMAN GAIA",
    "year": 1998,
    "era": "heisei",
    "device": "藍寶錐",
    "deviceKind": "crystal",
    "deviceKey": "藍寶錐",
    "deviceQuiz": true,
    "fact": "由地球意志誕生的紅色光之巨人，與高山我夢一起守護生命。",
    "hint": "我是蓋亞！由地球意志誕生的紅色光之巨人，與高山我夢一起守護生命。",
    "move": "光子冰刀",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-gaia"
  },
  {
    "id": "agul",
    "short": "亞格",
    "name": "超人力霸王亞格",
    "en": "ULTRAMAN AGUL",
    "year": 1998,
    "era": "heisei",
    "device": "藍寶鐲",
    "deviceKind": "wrist",
    "deviceKey": "藍寶鐲",
    "deviceQuiz": true,
    "fact": "擁有海洋的藍色光芒，與蓋亞一起守護地球。",
    "hint": "我是亞格！擁有海洋的藍色光芒，與蓋亞一起守護地球。",
    "move": "光子粉碎機",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-agul"
  },
  {
    "id": "neos",
    "short": "雷歐斯",
    "name": "超人力霸王雷歐斯",
    "en": "ULTRAMAN NEOS",
    "year": 2000,
    "era": "heisei",
    "device": "星辰器",
    "deviceKind": "spark",
    "deviceKey": "星辰器",
    "deviceQuiz": true,
    "fact": "光之國的年輕戰士，與七號 21 一起保護地球。",
    "hint": "我是雷歐斯！光之國的年輕戰士，與七號 21 一起保護地球。",
    "move": "新馬格紐姆光線",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-neos"
  },
  {
    "id": "ultraseven-21",
    "short": "七號 21",
    "name": "超人力霸王七號 21",
    "en": "ULTRASEVEN 21",
    "year": 2000,
    "era": "heisei",
    "device": "意念變身",
    "deviceKind": "none",
    "deviceKey": "意念變身",
    "deviceQuiz": false,
    "fact": "擅長調查與偵察的戰士，會在雷歐斯遇到危險時出現。",
    "hint": "我是七號 21！擅長調查與偵察的戰士，會在雷歐斯遇到危險時出現。",
    "move": "雷吉亞射線",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraseven-21"
  },
  {
    "id": "cosmos",
    "short": "高斯",
    "name": "超人力霸王高斯",
    "en": "ULTRAMAN COSMOS",
    "year": 2001,
    "era": "heisei",
    "device": "日月同輝",
    "deviceKind": "spark",
    "deviceKey": "日月同輝",
    "deviceQuiz": true,
    "fact": "溫柔又熱愛和平，會先嘗試安撫怪獸，保護各種生命。",
    "hint": "我是高斯！溫柔又熱愛和平，會先嘗試安撫怪獸，保護各種生命。",
    "move": "滿月光波",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-cosmos"
  },
  {
    "id": "justice",
    "short": "正義",
    "name": "超人力霸王正義",
    "en": "ULTRAMAN JUSTICE",
    "year": 2002,
    "era": "heisei",
    "device": "正義之槍",
    "deviceKind": "spark",
    "deviceKey": "正義之槍",
    "deviceQuiz": true,
    "fact": "來自宇宙的正義戰士，與高斯一起思考如何守護生命。",
    "hint": "我是正義！來自宇宙的正義戰士，與高斯一起思考如何守護生命。",
    "move": "維克托利姆光線",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-justice"
  },
  {
    "id": "nexus",
    "short": "納克斯",
    "name": "超人力霸王納克斯",
    "en": "ULTRAMAN NEXUS",
    "year": 2004,
    "era": "heisei",
    "device": "進化信徒",
    "deviceKind": "spark",
    "deviceKey": "進化信徒",
    "deviceQuiz": true,
    "fact": "光之力量會由不同的適格者接棒，讓希望持續傳下去。",
    "hint": "我是納克斯！光之力量會由不同的適格者接棒，讓希望持續傳下去。",
    "move": "十字光線風暴",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-nexus"
  },
  {
    "id": "max",
    "short": "馬克斯",
    "name": "超人力霸王馬克斯",
    "en": "ULTRAMAN MAX",
    "year": 2005,
    "era": "heisei",
    "device": "馬克斯火花",
    "deviceKind": "wrist",
    "deviceKey": "馬克斯火花",
    "deviceQuiz": true,
    "fact": "兼具速度與力量，頭上藏著武器，與東馬快斗一起奮戰。",
    "hint": "我是馬克斯！兼具速度與力量，頭上藏著武器，與東馬快斗一起奮戰。",
    "move": "馬克修姆加農",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-max"
  },
  {
    "id": "xenon",
    "short": "傑諾",
    "name": "超人力霸王傑諾",
    "en": "ULTRAMAN XENON",
    "year": 2005,
    "era": "heisei",
    "device": "無專屬變身器",
    "deviceKind": "none",
    "deviceKey": "無專屬變身器",
    "deviceQuiz": false,
    "fact": "在馬克斯遇到危險時現身，送給夥伴新的力量。",
    "hint": "我是傑諾！在馬克斯遇到危險時現身，送給夥伴新的力量。",
    "move": "傑諾尼姆加農",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-xenon"
  },
  {
    "id": "hikari",
    "short": "希卡利",
    "name": "超人力霸王希卡利",
    "en": "ULTRAMAN HIKARI",
    "year": 2006,
    "era": "heisei",
    "device": "騎士氣息",
    "deviceKind": "wrist",
    "deviceKey": "騎士氣息",
    "deviceQuiz": true,
    "fact": "藍色的科學家英雄，也是梅比斯的重要夥伴。",
    "hint": "我是希卡利！藍色的科學家英雄，也是梅比斯的重要夥伴。",
    "move": "騎士射線",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-hikari"
  },
  {
    "id": "ginga",
    "short": "銀河",
    "name": "超人力霸王銀河",
    "en": "ULTRAMAN GINGA",
    "year": 2013,
    "era": "new",
    "device": "銀河火花",
    "deviceKind": "spark",
    "deviceKey": "銀河火花",
    "deviceQuiz": true,
    "fact": "身上有發亮的水晶，與禮堂光一起展開冒險。",
    "hint": "我是銀河！身上有發亮的水晶，與禮堂光一起展開冒險。",
    "move": "銀河十字光線",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ginga"
  },
  {
    "id": "victory",
    "short": "勝利",
    "name": "超人力霸王勝利",
    "en": "ULTRAMAN VICTORY",
    "year": 2014,
    "era": "new",
    "device": "勝利聖槍",
    "deviceKind": "lance",
    "deviceKey": "勝利聖槍",
    "deviceQuiz": true,
    "fact": "由地底青年翔變身，能把怪獸的力量化成右手武器。",
    "hint": "我是勝利！由地底青年翔變身，能把怪獸的力量化成右手武器。",
    "move": "勝利射線",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-victory"
  },
  {
    "id": "x",
    "short": "X",
    "name": "超人力霸王X",
    "en": "ULTRAMAN X",
    "year": 2015,
    "era": "new",
    "device": "X 終端",
    "deviceKind": "terminal",
    "deviceKey": "X 終端",
    "deviceQuiz": true,
    "fact": "與大空大地互相合作，讓兩顆心的力量連在一起。",
    "hint": "我是X！與大空大地互相合作，讓兩顆心的力量連在一起。",
    "move": "扎納帝姆光線",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-x"
  },
  {
    "id": "orb",
    "short": "歐布",
    "name": "超人力霸王歐布",
    "en": "ULTRAMAN ORB",
    "year": 2016,
    "era": "new",
    "device": "歐布圓環",
    "deviceKind": "orb",
    "deviceKey": "歐布圓環",
    "deviceQuiz": true,
    "fact": "以紅凱的身分四處旅行，借用前輩的力量守護和平。",
    "hint": "我是歐布！以紅凱的身分四處旅行，借用前輩的力量守護和平。",
    "move": "斯派利敖光線",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-orb"
  },
  {
    "id": "geed",
    "short": "捷德",
    "name": "超人力霸王捷德",
    "en": "ULTRAMAN GEED",
    "year": 2017,
    "era": "new",
    "device": "捷德昇華器",
    "deviceKind": "terminal",
    "deviceKey": "捷德昇華器",
    "deviceQuiz": true,
    "fact": "雖然出身充滿考驗，仍然珍惜朋友，努力成為正義的英雄。",
    "hint": "我是捷德！雖然出身充滿考驗，仍然珍惜朋友，努力成為正義的英雄。",
    "move": "毀滅爆裂",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-geed"
  },
  {
    "id": "rosso",
    "short": "羅索",
    "name": "超人力霸王羅索",
    "en": "ULTRAMAN ROSSO",
    "year": 2018,
    "era": "new",
    "device": "羅布迴轉儀",
    "deviceKind": "gyro",
    "deviceKey": "羅布迴轉儀",
    "deviceQuiz": true,
    "fact": "湊家哥哥活海變身的英雄，基本型態擁有火的力量。",
    "hint": "我是羅索！湊家哥哥活海變身的英雄，基本型態擁有火的力量。",
    "move": "烈焰球",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-rosso"
  },
  {
    "id": "blu",
    "short": "布魯",
    "name": "超人力霸王布魯",
    "en": "ULTRAMAN BLU",
    "year": 2018,
    "era": "new",
    "device": "羅布迴轉儀",
    "deviceKind": "gyro",
    "deviceKey": "羅布迴轉儀",
    "deviceQuiz": true,
    "fact": "湊家弟弟勇海變身的英雄，基本型態擁有水的力量。",
    "hint": "我是布魯！湊家弟弟勇海變身的英雄，基本型態擁有水的力量。",
    "move": "水流射線",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-blu"
  },
  {
    "id": "grigio",
    "short": "格麗喬",
    "name": "女超人力霸王格麗喬",
    "en": "ULTRAWOMAN GRIGIO",
    "year": 2019,
    "era": "new",
    "device": "羅布迴轉儀（美劍版）",
    "deviceKind": "gyro",
    "deviceKey": "羅布迴轉儀（美劍版）",
    "deviceQuiz": true,
    "fact": "湊家妹妹朝陽變身的女英雄，能用治癒力量支持夥伴。",
    "hint": "我是格麗喬！湊家妹妹朝陽變身的女英雄，能用治癒力量支持夥伴。",
    "move": "格麗喬治癒",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultrawoman-grigio"
  },
  {
    "id": "taiga",
    "short": "大河",
    "name": "超人力霸王大河",
    "en": "ULTRAMAN TAIGA",
    "year": 2019,
    "era": "new",
    "device": "大河火花",
    "deviceKind": "wrist",
    "deviceKey": "大河火花",
    "deviceQuiz": true,
    "fact": "太郎的兒子，和泰塔斯、風馬組成三人小隊。",
    "hint": "我是大河！太郎的兒子，和泰塔斯、風馬組成三人小隊。",
    "move": "斯特利姆爆裂",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-taiga"
  },
  {
    "id": "titas",
    "short": "泰塔斯",
    "name": "超人力霸王泰塔斯",
    "en": "ULTRAMAN TITAS",
    "year": 2019,
    "era": "new",
    "device": "大河火花",
    "deviceKind": "wrist",
    "deviceKey": "大河火花",
    "deviceQuiz": true,
    "fact": "來自 U40 星的力量型戰士，有強健的體魄與沉穩的心。",
    "hint": "我是泰塔斯！來自 U40 星的力量型戰士，有強健的體魄與沉穩的心。",
    "move": "普拉尼姆爆裂",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-titas"
  },
  {
    "id": "fuma",
    "short": "風馬",
    "name": "超人力霸王風馬",
    "en": "ULTRAMAN FUMA",
    "year": 2019,
    "era": "new",
    "device": "大河火花",
    "deviceKind": "wrist",
    "deviceKey": "大河火花",
    "deviceQuiz": true,
    "fact": "來自 O-50 的迅速戰士，像忍者一樣靈活，是三人小隊的夥伴。",
    "hint": "我是風馬！來自 O-50 的迅速戰士，像忍者一樣靈活，是三人小隊的夥伴。",
    "move": "極星光波手裏劍",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-fuma"
  },
  {
    "id": "ribut",
    "short": "利布特",
    "name": "超人力霸王利布特",
    "en": "ULTRAMAN RIBUT",
    "year": 2014,
    "era": "new",
    "device": "GUTS 閃光棒（地球訓練時）",
    "deviceKind": "gun",
    "deviceKey": "GUTS 閃光棒",
    "deviceQuiz": true,
    "fact": "銀河救援隊的成員，擅長武術和護盾，幫助需要救援的生命。",
    "hint": "我是利布特！銀河救援隊的成員，擅長武術和護盾，幫助需要救援的生命。",
    "move": "加拉克西姆爆裂",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ribut"
  },
  {
    "id": "trigger",
    "short": "特利卡",
    "name": "超人力霸王特利卡",
    "en": "ULTRAMAN TRIGGER",
    "year": 2021,
    "era": "new",
    "device": "GUTS 閃光棒",
    "deviceKind": "gun",
    "deviceKey": "GUTS 閃光棒",
    "deviceQuiz": true,
    "fact": "從火星的石像甦醒，與真中劍吾一起守護笑容，也能切換三種型態。",
    "hint": "我是特利卡！從火星的石像甦醒，與真中劍吾一起守護笑容，也能切換三種型態。",
    "move": "哉佩利敖光線",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-trigger"
  },
  {
    "id": "decker",
    "short": "德卡",
    "name": "超人力霸王德卡",
    "en": "ULTRAMAN DECKER",
    "year": 2022,
    "era": "new",
    "device": "超級 D 閃光劍",
    "deviceKind": "terminal",
    "deviceKey": "超級 D 閃光劍",
    "deviceQuiz": true,
    "fact": "由明日見奏大變身，擁有閃光型、強壯型與奇蹟型。",
    "hint": "我是德卡！由明日見奏大變身，擁有閃光型、強壯型與奇蹟型。",
    "move": "賽魯傑德光線",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-decker"
  },
  {
    "id": "regulos",
    "short": "雷克洛斯",
    "name": "超人力霸王雷克洛斯",
    "en": "ULTRAMAN REGULOS",
    "year": 2020,
    "era": "new",
    "device": "未公開專屬變身器",
    "deviceKind": "none",
    "deviceKey": "未公開專屬變身器",
    "deviceQuiz": false,
    "fact": "在 D60 行星學習宇宙幻獸拳，雙臂帶著白虎與赤龍的力量。",
    "hint": "我是雷克洛斯！在 D60 行星學習宇宙幻獸拳，雙臂帶著白虎與赤龍的力量。",
    "move": "宇宙幻獸拳",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-regulos"
  },
  {
    "id": "blazar",
    "short": "布雷薩",
    "name": "超人力霸王布雷薩",
    "en": "ULTRAMAN BLAZAR",
    "year": 2023,
    "era": "latest",
    "device": "布雷薩手鐲",
    "deviceKind": "wrist",
    "deviceKey": "布雷薩手鐲",
    "deviceQuiz": true,
    "fact": "來自遙遠的 M421，與比留間弦人一起守護地球。",
    "hint": "我是布雷薩！來自遙遠的 M421，與比留間弦人一起守護地球。",
    "move": "螺旋光矛",
    "color": "#eae5f2",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-blazar"
  },
  {
    "id": "arc",
    "short": "雅克",
    "name": "超人力霸王雅克",
    "en": "ULTRAMAN ARC",
    "year": 2024,
    "era": "latest",
    "device": "ARC 昇華器",
    "deviceKind": "cube",
    "deviceKey": "ARC 昇華器",
    "deviceQuiz": true,
    "fact": "飛世優馬釋放想像力，與光之生命路提昂一起成為英雄。",
    "hint": "我是雅克！飛世優馬釋放想像力，與光之生命路提昂一起成為英雄。",
    "move": "雅克終結光線",
    "color": "#edf0df",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-arc"
  },
  {
    "id": "omega",
    "short": "奧米加",
    "name": "超人力霸王奧米加",
    "en": "ULTRAMAN OMEGA",
    "year": 2025,
    "era": "latest",
    "device": "奧米加頭鏢＋奧米加星石",
    "deviceKind": "boomerang",
    "deviceKey": "奧米加頭鏢＋奧米加星石",
    "deviceQuiz": true,
    "fact": "失去記憶後來到地球，使用紅色頭鏢，與大木田宙人一起探索世界。",
    "hint": "我是奧米加！失去記憶後來到地球，使用紅色頭鏢，與大木田宙人一起探索世界。",
    "move": "雷特克魯特光線",
    "color": "#e1eeee",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-omega"
  },
  {
    "id": "teo",
    "short": "Teo",
    "name": "超人力霸王Teo",
    "en": "ULTRAMAN TEO",
    "year": 2026,
    "era": "latest",
    "device": "Teo Crystar",
    "deviceKind": "pendant",
    "deviceKey": "Teo Crystar",
    "deviceQuiz": true,
    "fact": "來自 H12 行星的藍色英雄，珍惜動物與生命，將守護的心化成光。",
    "hint": "我是Teo！來自 H12 行星的藍色英雄，珍惜動物與生命，將守護的心化成光。",
    "move": "Teocium 光線",
    "color": "#f3e7d9",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-teo"
  }
];
const FORMS = [
  {
    "id": "multi",
    "heroId": "tiga",
    "name": "複合型",
    "color": "#916eb2",
    "second": "#d76c6e",
    "role": "balance",
    "move": "哉佩利敖光線",
    "hint": "力量和速度都很棒！",
    "description": "迪卡的複合型。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王迪卡"
  },
  {
    "id": "power",
    "heroId": "tiga",
    "name": "力量型",
    "color": "#cf5e62",
    "second": "#cf5e62",
    "role": "power",
    "move": "迪拉修姆光流",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "迪卡的力量型。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王迪卡"
  },
  {
    "id": "sky",
    "heroId": "tiga",
    "name": "天空型",
    "color": "#8a80c5",
    "second": "#8a80c5",
    "role": "speed",
    "move": "蘭帕爾特光彈",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "迪卡的天空型。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王迪卡"
  },
  {
    "id": "tiga-glitter",
    "heroId": "tiga",
    "name": "閃耀迪卡",
    "color": "#dfba4c",
    "second": "#dfba4c",
    "role": "guard",
    "move": "閃耀哉佩利敖光線",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "迪卡的閃耀迪卡。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王迪卡"
  },
  {
    "id": "dyna-flash",
    "heroId": "dyna",
    "name": "閃光型",
    "color": "#bf5c68",
    "second": "#557fb6",
    "role": "balance",
    "move": "索爾捷特光線",
    "hint": "力量和速度都很棒！",
    "description": "帝納的閃光型。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王帝納"
  },
  {
    "id": "dyna-strong",
    "heroId": "dyna",
    "name": "強壯型",
    "color": "#df4e51",
    "second": "#df4e51",
    "role": "power",
    "move": "加爾奈特轟炸",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "帝納的強壯型。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王帝納"
  },
  {
    "id": "dyna-miracle",
    "heroId": "dyna",
    "name": "奇蹟型",
    "color": "#597dd0",
    "second": "#597dd0",
    "role": "speed",
    "move": "立波留姆光波",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "帝納的奇蹟型。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王帝納"
  },
  {
    "id": "gaia-v1",
    "heroId": "gaia",
    "name": "V1 型",
    "color": "#c34a46",
    "second": "#c34a46",
    "role": "balance",
    "move": "光子冰刀",
    "hint": "力量和速度都很棒！",
    "description": "蓋亞的V1 型。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王蓋亞"
  },
  {
    "id": "gaia-v2",
    "heroId": "gaia",
    "name": "V2 型",
    "color": "#9a424a",
    "second": "#9a424a",
    "role": "guard",
    "move": "量子流線",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "蓋亞的V2 型。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王蓋亞"
  },
  {
    "id": "gaia-sv",
    "heroId": "gaia",
    "name": "至高型 SV",
    "color": "#a14665",
    "second": "#5a8aac",
    "role": "power",
    "move": "光子流線",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "蓋亞的至高型 SV。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王蓋亞"
  },
  {
    "id": "cosmos-luna",
    "heroId": "cosmos",
    "name": "月神模式",
    "color": "#6588ca",
    "second": "#6588ca",
    "role": "calm",
    "move": "滿月光波",
    "hint": "用溫柔的光，幫朋友安心！",
    "description": "高斯的月神模式。用溫柔的光，幫朋友安心！",
    "source": "https://zh.wikipedia.org/zh-tw/高斯·奥特曼"
  },
  {
    "id": "cosmos-corona",
    "heroId": "cosmos",
    "name": "日冕模式",
    "color": "#cd6652",
    "second": "#cd6652",
    "role": "power",
    "move": "Naybuster 光線",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "高斯的日冕模式。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/高斯·奥特曼"
  },
  {
    "id": "cosmos-eclipse",
    "heroId": "cosmos",
    "name": "日蝕模式",
    "color": "#827bb4",
    "second": "#c7665f",
    "role": "guard",
    "move": "高斯謬姆光線",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "高斯的日蝕模式。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/高斯·奥特曼"
  },
  {
    "id": "zero-base",
    "heroId": "zero",
    "name": "基本型態",
    "color": "#668cbc",
    "second": "#c86261",
    "role": "balance",
    "move": "傑洛集束射線",
    "hint": "力量和速度都很棒！",
    "description": "傑洛的基本型態。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "zero-strong",
    "heroId": "zero",
    "name": "強壯日冕",
    "color": "#b75048",
    "second": "#b75048",
    "role": "power",
    "move": "Strong Corona Zero Burning",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "傑洛的強壯日冕。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "zero-luna",
    "heroId": "zero",
    "name": "月神奇蹟",
    "color": "#538bc2",
    "second": "#538bc2",
    "role": "speed",
    "move": "奇蹟傑洛頭鏢",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "傑洛的月神奇蹟。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "zero-ultimate",
    "heroId": "zero",
    "name": "終極傑洛",
    "color": "#88a5b9",
    "second": "#88a5b9",
    "role": "guard",
    "move": "Final Ultimate Zero",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "傑洛的終極傑洛。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "zero-shining",
    "heroId": "zero",
    "name": "光輝傑洛",
    "color": "#d1b76d",
    "second": "#d1b76d",
    "role": "guard",
    "move": "Shining Emerium Slash",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "傑洛的光輝傑洛。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "zero-beyond",
    "heroId": "zero",
    "name": "極越型態",
    "color": "#9382be",
    "second": "#9382be",
    "role": "speed",
    "move": "Twin Giga Break",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "傑洛的極越型態。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "z-original",
    "heroId": "z",
    "name": "原始型態",
    "color": "#4d91bb",
    "second": "#444c64",
    "role": "balance",
    "move": "傑斯帝姆光線",
    "hint": "力量和速度都很棒！",
    "description": "傑特的原始型態。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "z-alpha",
    "heroId": "z",
    "name": "阿爾法鋒刃",
    "color": "#678ba5",
    "second": "#434c65",
    "role": "speed",
    "move": "傑斯帝姆邁射光",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "傑特的阿爾法鋒刃。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "z-beta",
    "heroId": "z",
    "name": "貝塔粉碎",
    "color": "#d26654",
    "second": "#d26654",
    "role": "power",
    "move": "傑斯帝姆升龍拳",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "傑特的貝塔粉碎。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "z-gamma",
    "heroId": "z",
    "name": "伽瑪未來",
    "color": "#8c75c1",
    "second": "#c46b70",
    "role": "guard",
    "move": "傑斯帝姆驅動",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "傑特的伽瑪未來。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "z-delta",
    "heroId": "z",
    "name": "德爾塔昇華鉤爪",
    "color": "#ad745c",
    "second": "#695fac",
    "role": "power",
    "move": "傑斯帝姆光輪",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "傑特的德爾塔昇華鉤爪。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "trigger-multi",
    "heroId": "trigger",
    "name": "複合型",
    "color": "#ab7bad",
    "second": "#d8736c",
    "role": "balance",
    "move": "哉佩利敖光線",
    "hint": "力量和速度都很棒！",
    "description": "特利卡的複合型。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "trigger-power",
    "heroId": "trigger",
    "name": "強壯型",
    "color": "#d25a56",
    "second": "#d25a56",
    "role": "power",
    "move": "迪拉修姆光流",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "特利卡的強壯型。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "trigger-sky",
    "heroId": "trigger",
    "name": "疾速型",
    "color": "#658ac8",
    "second": "#658ac8",
    "role": "speed",
    "move": "蘭帕爾特光彈",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "特利卡的疾速型。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "trigger-eternity",
    "heroId": "trigger",
    "name": "閃耀永恆",
    "color": "#d9b649",
    "second": "#d9b649",
    "role": "guard",
    "move": "閃耀哉佩利敖光線",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "特利卡的閃耀永恆。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "trigger-truth",
    "heroId": "trigger",
    "name": "真實特利卡",
    "color": "#924957",
    "second": "#49455a",
    "role": "balance",
    "move": "真實哉佩利敖光線",
    "hint": "力量和速度都很棒！",
    "description": "特利卡的真實特利卡。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "decker-flash",
    "heroId": "decker",
    "name": "閃光型",
    "color": "#b66b9f",
    "second": "#6b8cbf",
    "role": "balance",
    "move": "賽魯傑德光線",
    "hint": "力量和速度都很棒！",
    "description": "德卡的閃光型。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker"
  },
  {
    "id": "decker-strong",
    "heroId": "decker",
    "name": "強壯型",
    "color": "#c95d50",
    "second": "#c95d50",
    "role": "power",
    "move": "德魯涅德烈破",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "德卡的強壯型。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker"
  },
  {
    "id": "decker-miracle",
    "heroId": "decker",
    "name": "奇蹟型",
    "color": "#5c89c6",
    "second": "#5c89c6",
    "role": "speed",
    "move": "雷亞琉特波動",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "德卡的奇蹟型。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker"
  },
  {
    "id": "decker-dynamic",
    "heroId": "decker",
    "name": "強勁型",
    "color": "#d7a751",
    "second": "#d7a751",
    "role": "guard",
    "move": "戴謬德光線",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "德卡的強勁型。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker"
  },
  {
    "id": "arc-base",
    "heroId": "arc",
    "name": "基本型態",
    "color": "#b96554",
    "second": "#b96554",
    "role": "balance",
    "move": "雅克終結光線",
    "hint": "力量和速度都很棒！",
    "description": "雅克的基本型態。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼"
  },
  {
    "id": "arc-solis",
    "heroId": "arc",
    "name": "太陽裝甲",
    "color": "#d87944",
    "second": "#d87944",
    "role": "power",
    "move": "雅克終結光線",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "雅克的太陽裝甲。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼"
  },
  {
    "id": "arc-luna",
    "heroId": "arc",
    "name": "月亮裝甲",
    "color": "#659ecb",
    "second": "#659ecb",
    "role": "speed",
    "move": "雅克終結光線",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "雅克的月亮裝甲。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼"
  },
  {
    "id": "arc-galaxy",
    "heroId": "arc",
    "name": "銀河裝甲",
    "color": "#9f80bd",
    "second": "#9f80bd",
    "role": "guard",
    "move": "雅克終結光線",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "雅克的銀河裝甲。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼"
  },
  {
    "id": "omega-base",
    "heroId": "omega",
    "name": "基本型態",
    "color": "#c9554a",
    "second": "#c9554a",
    "role": "balance",
    "move": "雷特克魯特光線",
    "hint": "力量和速度都很棒！",
    "description": "奧米加的基本型態。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA"
  },
  {
    "id": "omega-rekiness",
    "heroId": "omega",
    "name": "雷基尼斯裝甲",
    "color": "#689fcd",
    "second": "#689fcd",
    "role": "guard",
    "move": "雷特克魯特光線",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "奧米加的雷基尼斯裝甲。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA"
  },
  {
    "id": "omega-trigaron",
    "heroId": "omega",
    "name": "特萊加隆裝甲",
    "color": "#d7b249",
    "second": "#d7b249",
    "role": "speed",
    "move": "雷特克魯特光線",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "奧米加的特萊加隆裝甲。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA"
  },
  {
    "id": "omega-valgeness",
    "heroId": "omega",
    "name": "瓦爾基涅斯裝甲",
    "color": "#cc704e",
    "second": "#cc704e",
    "role": "power",
    "move": "雷特克魯特光線",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "奧米加的瓦爾基涅斯裝甲。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA"
  },
  {
    "id": "omega-gamedon",
    "heroId": "omega",
    "name": "加美頓裝甲",
    "color": "#719f79",
    "second": "#719f79",
    "role": "guard",
    "move": "雷特克魯特光線",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "奧米加的加美頓裝甲。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA"
  },
  {
    "id": "geed-primitive",
    "heroId": "geed",
    "name": "原始型態",
    "color": "#a76676",
    "second": "#a76676",
    "role": "balance",
    "move": "毀滅爆裂",
    "hint": "力量和速度都很棒！",
    "description": "捷德的原始型態。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "geed-solid",
    "heroId": "geed",
    "name": "烈焰爆燃",
    "color": "#c86343",
    "second": "#c86343",
    "role": "power",
    "move": "Strike Boost",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "捷德的烈焰爆燃。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "geed-acro",
    "heroId": "geed",
    "name": "頂尖極速",
    "color": "#72aac5",
    "second": "#72aac5",
    "role": "speed",
    "move": "Atmos Impact",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "捷德的頂尖極速。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "geed-magnificent",
    "heroId": "geed",
    "name": "崇高型態",
    "color": "#d09857",
    "second": "#d09857",
    "role": "guard",
    "move": "Big Burst Away",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "捷德的崇高型態。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "geed-royal",
    "heroId": "geed",
    "name": "皇家至尊",
    "color": "#d0b15e",
    "second": "#d0b15e",
    "role": "guard",
    "move": "Royal End",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "捷德的皇家至尊。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "geed-ultimate",
    "heroId": "geed",
    "name": "究極終結",
    "color": "#9d7bc2",
    "second": "#9d7bc2",
    "role": "power",
    "move": "Crescent Final Geed",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "捷德的究極終結。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "geed-galaxy",
    "heroId": "geed",
    "name": "銀河躍昇",
    "color": "#9c74b7",
    "second": "#9c74b7",
    "role": "speed",
    "move": "Wrecking Phoenix",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "捷德的銀河躍昇。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "orb-origin",
    "heroId": "orb",
    "name": "起源型態",
    "color": "#bb6856",
    "second": "#bb6856",
    "role": "balance",
    "move": "Orb Supreme Calibur",
    "hint": "力量和速度都很棒！",
    "description": "歐布的起源型態。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "orb-spacium",
    "heroId": "orb",
    "name": "重光型態",
    "color": "#9d788f",
    "second": "#c16f75",
    "role": "balance",
    "move": "斯派利敖光線",
    "hint": "力量和速度都很棒！",
    "description": "歐布的重光型態。力量和速度都很棒！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "orb-burnmite",
    "heroId": "orb",
    "name": "暴炎型態",
    "color": "#d57a47",
    "second": "#d57a47",
    "role": "power",
    "move": "Stobium Dynamite",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "歐布的暴炎型態。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "orb-hurricane",
    "heroId": "orb",
    "name": "疾風型態",
    "color": "#5e9cbb",
    "second": "#5e9cbb",
    "role": "speed",
    "move": "Trident Slash",
    "hint": "動作輕快，飛行和速度最拿手！",
    "description": "歐布的疾風型態。動作輕快，飛行和速度最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "orb-thunder",
    "heroId": "orb",
    "name": "暗耀型態",
    "color": "#b95d60",
    "second": "#b95d60",
    "role": "power",
    "move": "Zedcium 光線",
    "hint": "力量充滿，重裝挑戰最拿手！",
    "description": "歐布的暗耀型態。力量充滿，重裝挑戰最拿手！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "orb-trinity",
    "heroId": "orb",
    "name": "三重型態",
    "color": "#af9870",
    "second": "#795dad",
    "role": "guard",
    "move": "Trinitium 光輪",
    "hint": "保護夥伴，護盾持續更久！",
    "description": "歐布的三重型態。保護夥伴，護盾持續更久！",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  }
];
const DEVICES = [
  {
    "id": "device-ultraman",
    "name": "貝塔膠囊",
    "device": "貝塔膠囊",
    "deviceKey": "貝塔膠囊",
    "deviceKind": "spark",
    "owners": [
      "ultraman"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman",
    "fact": "和初代一起啟動光之力量。"
  },
  {
    "id": "device-seven",
    "name": "超人力霸王之眼",
    "device": "超人力霸王之眼",
    "deviceKey": "超人力霸王之眼",
    "deviceKind": "spark",
    "owners": [
      "seven"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraseven",
    "fact": "和七號一起啟動光之力量。"
  },
  {
    "id": "device-tiga",
    "name": "神光棒（亦稱閃光棒）",
    "device": "神光棒（亦稱閃光棒）",
    "deviceKey": "神光棒",
    "deviceKind": "spark",
    "owners": [
      "tiga"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-tiga",
    "fact": "和迪卡一起啟動光之力量。"
  },
  {
    "id": "device-zero",
    "name": "傑洛之眼",
    "device": "傑洛之眼",
    "deviceKey": "傑洛之眼",
    "deviceKind": "spark",
    "owners": [
      "zero"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-zero",
    "fact": "和傑洛一起啟動光之力量。"
  },
  {
    "id": "device-z",
    "name": "Z 昇華器",
    "device": "Z 昇華器",
    "deviceKey": "Z 昇華器",
    "deviceKind": "spark",
    "owners": [
      "z"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-z",
    "fact": "和傑特一起啟動光之力量。"
  },
  {
    "id": "device-mebius",
    "name": "梅比斯氣息",
    "device": "梅比斯氣息",
    "deviceKey": "梅比斯氣息",
    "deviceKind": "spark",
    "owners": [
      "mebius"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-mebius",
    "fact": "和梅比斯一起啟動光之力量。"
  },
  {
    "id": "device-ace",
    "name": "超級戒指",
    "device": "超級戒指",
    "deviceKey": "超級戒指",
    "deviceKind": "ring",
    "owners": [
      "ace"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ace",
    "fact": "和衛司一起啟動光之力量。"
  },
  {
    "id": "device-taro",
    "name": "超級徽章",
    "device": "超級徽章",
    "deviceKey": "超級徽章",
    "deviceKind": "badge",
    "owners": [
      "taro"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-taro",
    "fact": "和太郎一起啟動光之力量。"
  },
  {
    "id": "device-leo",
    "name": "獅子之瞳",
    "device": "獅子之瞳",
    "deviceKey": "獅子之瞳",
    "deviceKind": "ring",
    "owners": [
      "leo"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-leo",
    "fact": "和雷歐一起啟動光之力量。"
  },
  {
    "id": "device-80",
    "name": "電光棒",
    "device": "電光棒",
    "deviceKey": "電光棒",
    "deviceKind": "spark",
    "owners": [
      "80"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-80",
    "fact": "和80一起啟動光之力量。"
  },
  {
    "id": "device-yullian",
    "name": "閃光手鐲",
    "device": "閃光手鐲",
    "deviceKey": "閃光手鐲",
    "deviceKind": "wrist",
    "owners": [
      "yullian"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/yullian",
    "fact": "和尤莉安一起啟動光之力量。"
  },
  {
    "id": "device-joneus",
    "name": "閃光之星",
    "device": "閃光之星",
    "deviceKey": "閃光之星",
    "deviceKind": "badge",
    "owners": [
      "joneus"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-joneus",
    "fact": "和喬尼亞斯一起啟動光之力量。"
  },
  {
    "id": "device-great",
    "name": "電漿三角",
    "device": "電漿三角",
    "deviceKey": "電漿三角",
    "deviceKind": "pendant",
    "owners": [
      "great"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-great",
    "fact": "和葛雷一起啟動光之力量。"
  },
  {
    "id": "device-powered",
    "name": "閃光稜鏡",
    "device": "閃光稜鏡",
    "deviceKey": "閃光稜鏡",
    "deviceKind": "spark",
    "owners": [
      "powered"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-powered",
    "fact": "和帕瓦德一起啟動光之力量。"
  },
  {
    "id": "device-dyna",
    "name": "閃光劍",
    "device": "閃光劍",
    "deviceKey": "閃光劍",
    "deviceKind": "spark",
    "owners": [
      "dyna"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-dyna",
    "fact": "和帝納一起啟動光之力量。"
  },
  {
    "id": "device-gaia",
    "name": "藍寶錐",
    "device": "藍寶錐",
    "deviceKey": "藍寶錐",
    "deviceKind": "crystal",
    "owners": [
      "gaia"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-gaia",
    "fact": "和蓋亞一起啟動光之力量。"
  },
  {
    "id": "device-agul",
    "name": "藍寶鐲",
    "device": "藍寶鐲",
    "deviceKey": "藍寶鐲",
    "deviceKind": "wrist",
    "owners": [
      "agul"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-agul",
    "fact": "和亞格一起啟動光之力量。"
  },
  {
    "id": "device-neos",
    "name": "星辰器",
    "device": "星辰器",
    "deviceKey": "星辰器",
    "deviceKind": "spark",
    "owners": [
      "neos"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-neos",
    "fact": "和雷歐斯一起啟動光之力量。"
  },
  {
    "id": "device-cosmos",
    "name": "日月同輝",
    "device": "日月同輝",
    "deviceKey": "日月同輝",
    "deviceKind": "spark",
    "owners": [
      "cosmos"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-cosmos",
    "fact": "和高斯一起啟動光之力量。"
  },
  {
    "id": "device-justice",
    "name": "正義之槍",
    "device": "正義之槍",
    "deviceKey": "正義之槍",
    "deviceKind": "spark",
    "owners": [
      "justice"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-justice",
    "fact": "和正義一起啟動光之力量。"
  },
  {
    "id": "device-nexus",
    "name": "進化信徒",
    "device": "進化信徒",
    "deviceKey": "進化信徒",
    "deviceKind": "spark",
    "owners": [
      "nexus"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-nexus",
    "fact": "和納克斯一起啟動光之力量。"
  },
  {
    "id": "device-max",
    "name": "馬克斯火花",
    "device": "馬克斯火花",
    "deviceKey": "馬克斯火花",
    "deviceKind": "wrist",
    "owners": [
      "max"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-max",
    "fact": "和馬克斯一起啟動光之力量。"
  },
  {
    "id": "device-hikari",
    "name": "騎士氣息",
    "device": "騎士氣息",
    "deviceKey": "騎士氣息",
    "deviceKind": "wrist",
    "owners": [
      "hikari"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-hikari",
    "fact": "和希卡利一起啟動光之力量。"
  },
  {
    "id": "device-ginga",
    "name": "銀河火花",
    "device": "銀河火花",
    "deviceKey": "銀河火花",
    "deviceKind": "spark",
    "owners": [
      "ginga"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ginga",
    "fact": "和銀河一起啟動光之力量。"
  },
  {
    "id": "device-victory",
    "name": "勝利聖槍",
    "device": "勝利聖槍",
    "deviceKey": "勝利聖槍",
    "deviceKind": "lance",
    "owners": [
      "victory"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-victory",
    "fact": "和勝利一起啟動光之力量。"
  },
  {
    "id": "device-x",
    "name": "X 終端",
    "device": "X 終端",
    "deviceKey": "X 終端",
    "deviceKind": "terminal",
    "owners": [
      "x"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-x",
    "fact": "和X一起啟動光之力量。"
  },
  {
    "id": "device-orb",
    "name": "歐布圓環",
    "device": "歐布圓環",
    "deviceKey": "歐布圓環",
    "deviceKind": "orb",
    "owners": [
      "orb"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-orb",
    "fact": "和歐布一起啟動光之力量。"
  },
  {
    "id": "device-geed",
    "name": "捷德昇華器",
    "device": "捷德昇華器",
    "deviceKey": "捷德昇華器",
    "deviceKind": "terminal",
    "owners": [
      "geed"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-geed",
    "fact": "和捷德一起啟動光之力量。"
  },
  {
    "id": "device-rosso",
    "name": "羅布迴轉儀",
    "device": "羅布迴轉儀",
    "deviceKey": "羅布迴轉儀",
    "deviceKind": "gyro",
    "owners": [
      "rosso",
      "blu"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-rosso",
    "fact": "和羅索一起啟動光之力量。"
  },
  {
    "id": "device-grigio",
    "name": "羅布迴轉儀（美劍版）",
    "device": "羅布迴轉儀（美劍版）",
    "deviceKey": "羅布迴轉儀（美劍版）",
    "deviceKind": "gyro",
    "owners": [
      "grigio"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultrawoman-grigio",
    "fact": "和格麗喬一起啟動光之力量。"
  },
  {
    "id": "device-taiga",
    "name": "大河火花",
    "device": "大河火花",
    "deviceKey": "大河火花",
    "deviceKind": "wrist",
    "owners": [
      "taiga",
      "titas",
      "fuma"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-taiga",
    "fact": "和大河一起啟動光之力量。"
  },
  {
    "id": "device-ribut",
    "name": "GUTS 閃光棒（地球訓練時）",
    "device": "GUTS 閃光棒（地球訓練時）",
    "deviceKey": "GUTS 閃光棒",
    "deviceKind": "gun",
    "owners": [
      "ribut",
      "trigger"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ribut",
    "fact": "和利布特一起啟動光之力量。"
  },
  {
    "id": "device-decker",
    "name": "超級 D 閃光劍",
    "device": "超級 D 閃光劍",
    "deviceKey": "超級 D 閃光劍",
    "deviceKind": "terminal",
    "owners": [
      "decker"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-decker",
    "fact": "和德卡一起啟動光之力量。"
  },
  {
    "id": "device-blazar",
    "name": "布雷薩手鐲",
    "device": "布雷薩手鐲",
    "deviceKey": "布雷薩手鐲",
    "deviceKind": "wrist",
    "owners": [
      "blazar"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-blazar",
    "fact": "和布雷薩一起啟動光之力量。"
  },
  {
    "id": "device-arc",
    "name": "ARC 昇華器",
    "device": "ARC 昇華器",
    "deviceKey": "ARC 昇華器",
    "deviceKind": "cube",
    "owners": [
      "arc"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-arc",
    "fact": "和雅克一起啟動光之力量。"
  },
  {
    "id": "device-omega",
    "name": "奧米加頭鏢＋奧米加星石",
    "device": "奧米加頭鏢＋奧米加星石",
    "deviceKey": "奧米加頭鏢＋奧米加星石",
    "deviceKind": "boomerang",
    "owners": [
      "omega"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-omega",
    "fact": "和奧米加一起啟動光之力量。"
  },
  {
    "id": "device-teo",
    "name": "Teo Crystar",
    "device": "Teo Crystar",
    "deviceKey": "Teo Crystar",
    "deviceKind": "pendant",
    "owners": [
      "teo"
    ],
    "kind": "變身器",
    "source": "https://tsuburaya-prod.com/heroes/ultraman-teo",
    "fact": "和Teo一起啟動光之力量。"
  },
  {
    "id": "zero-neo",
    "name": "Ultra Zero Eye NEO",
    "device": "Ultra Zero Eye NEO",
    "deviceKey": "Ultra Zero Eye NEO",
    "deviceKind": "boomerang",
    "owners": [
      "zero"
    ],
    "kind": "變身器",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛",
    "fact": "Ultra Zero Eye NEO是傑洛的變身器。"
  },
  {
    "id": "zero-bracelet",
    "name": "究極手鐲",
    "device": "究極手鐲",
    "deviceKey": "究極手鐲",
    "deviceKind": "wrist",
    "owners": [
      "zero"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛",
    "fact": "究極手鐲是傑洛的力量道具。"
  },
  {
    "id": "orb-calibur",
    "name": "歐布聖劍",
    "device": "歐布聖劍",
    "deviceKey": "歐布聖劍",
    "deviceKind": "lance",
    "owners": [
      "orb"
    ],
    "kind": "變身器兼武器",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb",
    "fact": "歐布聖劍是歐布的變身器兼武器。"
  },
  {
    "id": "orb-cards",
    "name": "超人融合卡片",
    "device": "超人融合卡片",
    "deviceKey": "超人融合卡片",
    "deviceKind": "terminal",
    "owners": [
      "orb"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb",
    "fact": "超人融合卡片是歐布的力量道具。"
  },
  {
    "id": "geed-capsules",
    "name": "超人膠囊",
    "device": "超人膠囊",
    "deviceKey": "超人膠囊",
    "deviceKind": "crystal",
    "owners": [
      "geed"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed",
    "fact": "超人膠囊是捷德的力量道具。"
  },
  {
    "id": "geed-finalizer",
    "name": "Giga Finalizer",
    "device": "Giga Finalizer",
    "deviceKey": "Giga Finalizer",
    "deviceKind": "lance",
    "owners": [
      "geed"
    ],
    "kind": "變身器兼武器",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed",
    "fact": "Giga Finalizer是捷德的變身器兼武器。"
  },
  {
    "id": "z-access",
    "name": "超人存取卡",
    "device": "超人存取卡",
    "deviceKey": "超人存取卡",
    "deviceKind": "terminal",
    "owners": [
      "z"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z",
    "fact": "超人存取卡是傑特的力量道具。"
  },
  {
    "id": "z-medals",
    "name": "超人勳章",
    "device": "超人勳章",
    "deviceKey": "超人勳章",
    "deviceKind": "badge",
    "owners": [
      "z"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z",
    "fact": "超人勳章是傑特的力量道具。"
  },
  {
    "id": "z-beliarok",
    "name": "貝利亞黃昏",
    "device": "貝利亞黃昏",
    "deviceKey": "貝利亞黃昏",
    "deviceKind": "lance",
    "owners": [
      "z"
    ],
    "kind": "武器",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z",
    "fact": "貝利亞黃昏是傑特的武器。"
  },
  {
    "id": "trigger-key",
    "name": "GUTS 超人鑰匙",
    "device": "GUTS 超人鑰匙",
    "deviceKey": "GUTS 超人鑰匙",
    "deviceKind": "spark",
    "owners": [
      "trigger"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger",
    "fact": "GUTS 超人鑰匙是特利卡的力量道具。"
  },
  {
    "id": "trigger-arms",
    "name": "圓環之臂",
    "device": "圓環之臂",
    "deviceKey": "圓環之臂",
    "deviceKind": "lance",
    "owners": [
      "trigger"
    ],
    "kind": "武器",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger",
    "fact": "圓環之臂是特利卡的武器。"
  },
  {
    "id": "decker-card",
    "name": "超人次元卡",
    "device": "超人次元卡",
    "deviceKey": "超人次元卡",
    "deviceKind": "terminal",
    "owners": [
      "decker"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker",
    "fact": "超人次元卡是德卡的力量道具。"
  },
  {
    "id": "decker-sword",
    "name": "德卡盾劍",
    "device": "德卡盾劍",
    "deviceKey": "德卡盾劍",
    "deviceKind": "lance",
    "owners": [
      "decker"
    ],
    "kind": "武器",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker",
    "fact": "德卡盾劍是德卡的武器。"
  },
  {
    "id": "arc-cube",
    "name": "雅克方塊",
    "device": "雅克方塊",
    "deviceKey": "雅克方塊",
    "deviceKind": "cube",
    "owners": [
      "arc"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼",
    "fact": "雅克方塊是雅克的力量道具。"
  },
  {
    "id": "arc-solis",
    "name": "太陽裝甲方塊",
    "device": "太陽裝甲方塊",
    "deviceKey": "太陽裝甲方塊",
    "deviceKind": "cube",
    "owners": [
      "arc"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼",
    "fact": "太陽裝甲方塊是雅克的力量道具。"
  },
  {
    "id": "arc-luna",
    "name": "月亮裝甲方塊",
    "device": "月亮裝甲方塊",
    "deviceKey": "月亮裝甲方塊",
    "deviceKind": "cube",
    "owners": [
      "arc"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼",
    "fact": "月亮裝甲方塊是雅克的力量道具。"
  },
  {
    "id": "arc-galaxy",
    "name": "銀河裝甲方塊",
    "device": "銀河裝甲方塊",
    "deviceKey": "銀河裝甲方塊",
    "deviceKind": "cube",
    "owners": [
      "arc"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼",
    "fact": "銀河裝甲方塊是雅克的力量道具。"
  },
  {
    "id": "arc-sword",
    "name": "弧眼劍",
    "device": "弧眼劍",
    "deviceKey": "弧眼劍",
    "deviceKind": "lance",
    "owners": [
      "arc"
    ],
    "kind": "武器",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼",
    "fact": "弧眼劍是雅克的武器。"
  },
  {
    "id": "omega-meteor",
    "name": "奧米加星石",
    "device": "奧米加星石",
    "deviceKey": "奧米加星石",
    "deviceKind": "crystal",
    "owners": [
      "omega"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA",
    "fact": "奧米加星石是奧米加的力量道具。"
  },
  {
    "id": "omega-rekiness",
    "name": "雷基尼斯星石",
    "device": "雷基尼斯星石",
    "deviceKey": "雷基尼斯星石",
    "deviceKind": "crystal",
    "owners": [
      "omega"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA",
    "fact": "雷基尼斯星石是奧米加的力量道具。"
  },
  {
    "id": "omega-trigaron",
    "name": "特萊加隆星石",
    "device": "特萊加隆星石",
    "deviceKey": "特萊加隆星石",
    "deviceKind": "crystal",
    "owners": [
      "omega"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA",
    "fact": "特萊加隆星石是奧米加的力量道具。"
  },
  {
    "id": "omega-valgeness",
    "name": "瓦爾基涅斯星石",
    "device": "瓦爾基涅斯星石",
    "deviceKey": "瓦爾基涅斯星石",
    "deviceKind": "crystal",
    "owners": [
      "omega"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA",
    "fact": "瓦爾基涅斯星石是奧米加的力量道具。"
  },
  {
    "id": "omega-gamedon",
    "name": "加美頓星石",
    "device": "加美頓星石",
    "deviceKey": "加美頓星石",
    "deviceKind": "crystal",
    "owners": [
      "omega"
    ],
    "kind": "力量道具",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA",
    "fact": "加美頓星石是奧米加的力量道具。"
  }
];
const MOVES = [
  {
    "id": "move-1",
    "heroId": "tiga",
    "name": "哉佩利敖光線",
    "kind": "beam",
    "formId": "multi",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王迪卡"
  },
  {
    "id": "move-2",
    "heroId": "tiga",
    "name": "迪拉修姆光流",
    "kind": "burst",
    "formId": "power",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王迪卡"
  },
  {
    "id": "move-3",
    "heroId": "tiga",
    "name": "蘭帕爾特光彈",
    "kind": "beam",
    "formId": "sky",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王迪卡"
  },
  {
    "id": "move-4",
    "heroId": "tiga",
    "name": "閃耀哉佩利敖光線",
    "kind": "beam",
    "formId": "tiga-glitter",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王迪卡"
  },
  {
    "id": "move-5",
    "heroId": "dyna",
    "name": "索爾捷特光線",
    "kind": "beam",
    "formId": "dyna-flash",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王帝納"
  },
  {
    "id": "move-6",
    "heroId": "dyna",
    "name": "加爾奈特轟炸",
    "kind": "burst",
    "formId": "dyna-strong",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王帝納"
  },
  {
    "id": "move-7",
    "heroId": "dyna",
    "name": "立波留姆光波",
    "kind": "beam",
    "formId": "dyna-miracle",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王帝納"
  },
  {
    "id": "move-8",
    "heroId": "gaia",
    "name": "光子冰刀",
    "kind": "ring",
    "formId": "gaia-v1",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王蓋亞"
  },
  {
    "id": "move-9",
    "heroId": "gaia",
    "name": "量子流線",
    "kind": "beam",
    "formId": "gaia-v2",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王蓋亞"
  },
  {
    "id": "move-10",
    "heroId": "gaia",
    "name": "光子流線",
    "kind": "beam",
    "formId": "gaia-sv",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王蓋亞"
  },
  {
    "id": "move-11",
    "heroId": "cosmos",
    "name": "滿月光波",
    "kind": "calm",
    "formId": "cosmos-luna",
    "source": "https://zh.wikipedia.org/zh-tw/高斯·奥特曼"
  },
  {
    "id": "move-12",
    "heroId": "cosmos",
    "name": "Naybuster 光線",
    "kind": "beam",
    "formId": "cosmos-corona",
    "source": "https://zh.wikipedia.org/zh-tw/高斯·奥特曼"
  },
  {
    "id": "move-13",
    "heroId": "cosmos",
    "name": "高斯謬姆光線",
    "kind": "beam",
    "formId": "cosmos-eclipse",
    "source": "https://zh.wikipedia.org/zh-tw/高斯·奥特曼"
  },
  {
    "id": "move-14",
    "heroId": "zero",
    "name": "傑洛集束射線",
    "kind": "beam",
    "formId": "zero-base",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-15",
    "heroId": "zero",
    "name": "Strong Corona Zero Burning",
    "kind": "burst",
    "formId": "zero-strong",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-16",
    "heroId": "zero",
    "name": "奇蹟傑洛頭鏢",
    "kind": "ring",
    "formId": "zero-luna",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-17",
    "heroId": "zero",
    "name": "Final Ultimate Zero",
    "kind": "beam",
    "formId": "zero-ultimate",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-18",
    "heroId": "zero",
    "name": "Shining Emerium Slash",
    "kind": "ring",
    "formId": "zero-shining",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-19",
    "heroId": "zero",
    "name": "Twin Giga Break",
    "kind": "burst",
    "formId": "zero-beyond",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-20",
    "heroId": "z",
    "name": "傑斯帝姆光線",
    "kind": "beam",
    "formId": "z-original",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "move-21",
    "heroId": "z",
    "name": "傑斯帝姆邁射光",
    "kind": "beam",
    "formId": "z-alpha",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "move-22",
    "heroId": "z",
    "name": "傑斯帝姆升龍拳",
    "kind": "burst",
    "formId": "z-beta",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "move-23",
    "heroId": "z",
    "name": "傑斯帝姆驅動",
    "kind": "beam",
    "formId": "z-gamma",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "move-24",
    "heroId": "z",
    "name": "傑斯帝姆光輪",
    "kind": "ring",
    "formId": "z-delta",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Z"
  },
  {
    "id": "move-25",
    "heroId": "trigger",
    "name": "哉佩利敖光線",
    "kind": "beam",
    "formId": "trigger-multi",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "move-26",
    "heroId": "trigger",
    "name": "迪拉修姆光流",
    "kind": "burst",
    "formId": "trigger-power",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "move-27",
    "heroId": "trigger",
    "name": "蘭帕爾特光彈",
    "kind": "beam",
    "formId": "trigger-sky",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "move-28",
    "heroId": "trigger",
    "name": "閃耀哉佩利敖光線",
    "kind": "beam",
    "formId": "trigger-eternity",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "move-29",
    "heroId": "trigger",
    "name": "真實哉佩利敖光線",
    "kind": "beam",
    "formId": "trigger-truth",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Trigger"
  },
  {
    "id": "move-30",
    "heroId": "decker",
    "name": "賽魯傑德光線",
    "kind": "beam",
    "formId": "decker-flash",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker"
  },
  {
    "id": "move-31",
    "heroId": "decker",
    "name": "德魯涅德烈破",
    "kind": "beam",
    "formId": "decker-strong",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker"
  },
  {
    "id": "move-32",
    "heroId": "decker",
    "name": "雷亞琉特波動",
    "kind": "beam",
    "formId": "decker-miracle",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker"
  },
  {
    "id": "move-33",
    "heroId": "decker",
    "name": "戴謬德光線",
    "kind": "beam",
    "formId": "decker-dynamic",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Decker"
  },
  {
    "id": "move-34",
    "heroId": "arc",
    "name": "雅克終結光線",
    "kind": "beam",
    "formId": "arc-base",
    "source": "https://zh.wikipedia.org/zh-tw/亚刻奥特曼"
  },
  {
    "id": "move-35",
    "heroId": "omega",
    "name": "雷特克魯特光線",
    "kind": "beam",
    "formId": "omega-base",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王OMEGA"
  },
  {
    "id": "move-36",
    "heroId": "geed",
    "name": "毀滅爆裂",
    "kind": "beam",
    "formId": "geed-primitive",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "move-37",
    "heroId": "geed",
    "name": "Strike Boost",
    "kind": "burst",
    "formId": "geed-solid",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "move-38",
    "heroId": "geed",
    "name": "Atmos Impact",
    "kind": "beam",
    "formId": "geed-acro",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "move-39",
    "heroId": "geed",
    "name": "Big Burst Away",
    "kind": "burst",
    "formId": "geed-magnificent",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "move-40",
    "heroId": "geed",
    "name": "Royal End",
    "kind": "beam",
    "formId": "geed-royal",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "move-41",
    "heroId": "geed",
    "name": "Crescent Final Geed",
    "kind": "beam",
    "formId": "geed-ultimate",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "move-42",
    "heroId": "geed",
    "name": "Wrecking Phoenix",
    "kind": "beam",
    "formId": "geed-galaxy",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Geed"
  },
  {
    "id": "move-43",
    "heroId": "orb",
    "name": "Orb Supreme Calibur",
    "kind": "beam",
    "formId": "orb-origin",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "move-45",
    "heroId": "orb",
    "name": "Stobium Dynamite",
    "kind": "burst",
    "formId": "orb-burnmite",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "move-46",
    "heroId": "orb",
    "name": "Trident Slash",
    "kind": "ring",
    "formId": "orb-hurricane",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "move-47",
    "heroId": "orb",
    "name": "Zedcium 光線",
    "kind": "beam",
    "formId": "orb-thunder",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "move-48",
    "heroId": "orb",
    "name": "Trinitium 光輪",
    "kind": "ring",
    "formId": "orb-trinity",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王Orb"
  },
  {
    "id": "move-49",
    "heroId": "ultraman",
    "name": "斯派修姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman"
  },
  {
    "id": "move-50",
    "heroId": "seven",
    "name": "艾梅利姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraseven"
  },
  {
    "id": "move-52",
    "heroId": "mebius",
    "name": "梅比姆射線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-mebius"
  },
  {
    "id": "move-53",
    "heroId": "zoffy",
    "name": "M87 光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/zoffy"
  },
  {
    "id": "move-54",
    "heroId": "jack",
    "name": "斯派修姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-jack"
  },
  {
    "id": "move-55",
    "heroId": "ace",
    "name": "梅塔利姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ace"
  },
  {
    "id": "move-56",
    "heroId": "taro",
    "name": "斯特利姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-taro"
  },
  {
    "id": "move-57",
    "heroId": "leo",
    "name": "雷歐飛踢",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-leo"
  },
  {
    "id": "move-58",
    "heroId": "astra",
    "name": "兄弟合體光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/astra"
  },
  {
    "id": "move-59",
    "heroId": "king",
    "name": "尊王閃光",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-king"
  },
  {
    "id": "move-61",
    "heroId": "mother-of-ultra",
    "name": "治癒之光",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/mother-of-ultra"
  },
  {
    "id": "move-62",
    "heroId": "80",
    "name": "沙庫修姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-80"
  },
  {
    "id": "move-63",
    "heroId": "yullian",
    "name": "雙重力量",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/yullian"
  },
  {
    "id": "move-64",
    "heroId": "joneus",
    "name": "普拉尼姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-joneus"
  },
  {
    "id": "move-68",
    "heroId": "great",
    "name": "燃燒電漿",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-great"
  },
  {
    "id": "move-69",
    "heroId": "powered",
    "name": "超級斯派修姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-powered"
  },
  {
    "id": "move-70",
    "heroId": "agul",
    "name": "光子粉碎機",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-agul"
  },
  {
    "id": "move-71",
    "heroId": "neos",
    "name": "新馬格紐姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-neos"
  },
  {
    "id": "move-72",
    "heroId": "ultraseven-21",
    "name": "雷吉亞射線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraseven-21"
  },
  {
    "id": "move-73",
    "heroId": "justice",
    "name": "維克托利姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-justice"
  },
  {
    "id": "move-74",
    "heroId": "nexus",
    "name": "十字光線風暴",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-nexus"
  },
  {
    "id": "move-75",
    "heroId": "max",
    "name": "馬克修姆加農",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-max"
  },
  {
    "id": "move-76",
    "heroId": "xenon",
    "name": "傑諾尼姆加農",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-xenon"
  },
  {
    "id": "move-77",
    "heroId": "hikari",
    "name": "騎士射線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-hikari"
  },
  {
    "id": "move-78",
    "heroId": "ginga",
    "name": "銀河十字光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ginga"
  },
  {
    "id": "move-79",
    "heroId": "victory",
    "name": "勝利射線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-victory"
  },
  {
    "id": "move-80",
    "heroId": "x",
    "name": "扎納帝姆光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-x"
  },
  {
    "id": "move-81",
    "heroId": "orb",
    "name": "斯派利敖光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-orb"
  },
  {
    "id": "move-82",
    "heroId": "rosso",
    "name": "烈焰球",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-rosso"
  },
  {
    "id": "move-83",
    "heroId": "blu",
    "name": "水流射線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-blu"
  },
  {
    "id": "move-84",
    "heroId": "grigio",
    "name": "格麗喬治癒",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultrawoman-grigio"
  },
  {
    "id": "move-85",
    "heroId": "taiga",
    "name": "斯特利姆爆裂",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-taiga"
  },
  {
    "id": "move-86",
    "heroId": "titas",
    "name": "普拉尼姆爆裂",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-titas"
  },
  {
    "id": "move-87",
    "heroId": "fuma",
    "name": "極星光波手裏劍",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-fuma"
  },
  {
    "id": "move-88",
    "heroId": "ribut",
    "name": "加拉克西姆爆裂",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-ribut"
  },
  {
    "id": "move-90",
    "heroId": "regulos",
    "name": "宇宙幻獸拳",
    "kind": "burst",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-regulos"
  },
  {
    "id": "move-91",
    "heroId": "blazar",
    "name": "螺旋光矛",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-blazar"
  },
  {
    "id": "move-92",
    "heroId": "teo",
    "name": "Teocium 光線",
    "kind": "beam",
    "formId": null,
    "source": "https://tsuburaya-prod.com/heroes/ultraman-teo"
  },
  {
    "id": "move-zero-extra-0",
    "heroId": "zero",
    "name": "艾梅利姆切割",
    "kind": "beam",
    "formId": "zero-base",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-zero-extra-1",
    "heroId": "zero",
    "name": "傑洛頭鏢突擊",
    "kind": "ring",
    "formId": "zero-base",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-zero-extra-2",
    "heroId": "zero",
    "name": "傑洛飛踢",
    "kind": "burst",
    "formId": "zero-base",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-zero-extra-3",
    "heroId": "zero",
    "name": "傑洛雙擊",
    "kind": "beam",
    "formId": "zero-base",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  },
  {
    "id": "move-zero-extra-4",
    "heroId": "zero",
    "name": "電漿火花斬",
    "kind": "ring",
    "formId": "zero-base",
    "source": "https://zh.wikipedia.org/zh-tw/超人力霸王傑洛"
  }
];
const MONSTERS = [
  {
    "id": "gomora",
    "name": "哥摩拉",
    "tag": "突進",
    "pattern": "rush",
    "friendly": false,
    "fact": "頭上的彎角和長尾巴，是牠醒目的特徵。",
    "source": "https://tsuburaya-prod.com/encyclopedia/gomora",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "baltan",
    "name": "巴爾坦星人",
    "tag": "分身",
    "pattern": "clone",
    "friendly": false,
    "fact": "大鉗子、蟬一樣的臉，還會分身。",
    "source": "https://tsuburaya-prod.com/encyclopedia/baltan",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "zetton",
    "name": "傑頓",
    "tag": "屏障",
    "pattern": "armor",
    "friendly": false,
    "fact": "黑色身體配橘色發光部位，是經典強敵。",
    "source": "https://tsuburaya-prod.com/encyclopedia/zetton",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "red-king",
    "name": "雷德王",
    "tag": "重裝",
    "pattern": "armor",
    "friendly": false,
    "fact": "粗壯的身體，擅長用強大的力氣。",
    "source": "https://tsuburaya-prod.com/encyclopedia/red-king",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "eleking",
    "name": "艾雷王",
    "tag": "電流",
    "pattern": "electric",
    "friendly": false,
    "fact": "頭上有兩支角，長尾巴能釋放電流。",
    "source": "https://tsuburaya-prod.com/encyclopedia/eleking",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "king-joe",
    "name": "金古橋",
    "tag": "重裝",
    "pattern": "armor",
    "friendly": false,
    "fact": "由宇宙機器組合而成的巨大機器人。",
    "source": "https://tsuburaya-prod.com/encyclopedia/king-joe",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "neronga",
    "name": "內隆嘎",
    "tag": "隱形",
    "pattern": "clone",
    "friendly": false,
    "fact": "能隱藏身影，也喜歡吸收電力。",
    "source": "https://tsuburaya-prod.com/encyclopedia/neronga",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "bemular",
    "name": "貝姆拉",
    "tag": "突進",
    "pattern": "rush",
    "friendly": false,
    "fact": "早期就登場的宇宙怪獸，嘴巴可以發出能量。",
    "source": "https://tsuburaya-prod.com/encyclopedia/bemular",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "dada",
    "name": "達達",
    "tag": "分身",
    "pattern": "clone",
    "friendly": false,
    "fact": "黑白花紋的宇宙人，臉孔會變化。",
    "source": "https://tsuburaya-prod.com/encyclopedia/dada",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "gubila",
    "name": "古維拉",
    "tag": "鑽地",
    "pattern": "burrow",
    "friendly": false,
    "fact": "鼻尖像鑽頭，既能游泳也能鑽地。",
    "source": "https://tsuburaya-prod.com/encyclopedia/gubila",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "telesdon",
    "name": "泰萊斯通",
    "tag": "鑽地",
    "pattern": "burrow",
    "friendly": false,
    "fact": "在地底生活的怪獸，有長長的尖嘴。",
    "source": "https://tsuburaya-prod.com/encyclopedia/telesdon",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "antlar",
    "name": "安東拉",
    "tag": "磁力",
    "pattern": "electric",
    "friendly": false,
    "fact": "像大甲蟲，頭上有巨大的鉗子。",
    "source": "https://tsuburaya-prod.com/encyclopedia/antlar",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "bemstar",
    "name": "貝姆斯塔",
    "tag": "飛行",
    "pattern": "flight",
    "friendly": false,
    "fact": "身體像大鳥，腹部還有吸收能量的器官。",
    "source": "https://tsuburaya-prod.com/encyclopedia/bemstar",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "twin-tail",
    "name": "雙尾怪",
    "tag": "突進",
    "pattern": "rush",
    "friendly": false,
    "fact": "有兩條長尾巴，身體造型像倒過來的蝦。",
    "source": "https://tsuburaya-prod.com/encyclopedia/twin-tail",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "gudon",
    "name": "古敦",
    "tag": "突進",
    "pattern": "rush",
    "friendly": false,
    "fact": "雙手像長鞭，是雙尾怪的天敵。",
    "source": "https://tsuburaya-prod.com/encyclopedia/gudon",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "black-king",
    "name": "布萊克王",
    "tag": "重裝",
    "pattern": "armor",
    "friendly": false,
    "fact": "黑色的怪獸，額頭長著金色大角。",
    "source": "https://tsuburaya-prod.com/encyclopedia/black-king",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "birdon",
    "name": "巴頓",
    "tag": "飛行",
    "pattern": "flight",
    "friendly": false,
    "fact": "像巨大鳥類，翅膀和尖嘴很醒目。",
    "source": "https://tsuburaya-prod.com/encyclopedia/birdon",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "tyrant",
    "name": "泰蘭特",
    "tag": "重裝",
    "pattern": "armor",
    "friendly": false,
    "fact": "集合多種怪獸特徵的暴君怪獸。",
    "source": "https://tsuburaya-prod.com/encyclopedia/tyrant",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "pigmon",
    "name": "皮古蒙",
    "tag": "救援",
    "pattern": "friendly",
    "friendly": true,
    "fact": "會幫助人類的友善小怪獸。",
    "source": "https://tsuburaya-prod.com/encyclopedia/pigmon",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "kanegon",
    "name": "卡內貢",
    "tag": "救援",
    "pattern": "friendly",
    "friendly": true,
    "fact": "嘴巴像拉鍊，最喜歡吃硬幣。",
    "source": "https://tsuburaya-prod.com/encyclopedia/kanegon",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "golza",
    "name": "哥爾贊",
    "tag": "突進",
    "pattern": "rush",
    "friendly": false,
    "fact": "迪卡故事裡登場，額頭能釋放光線。",
    "source": "https://tsuburaya-prod.com/encyclopedia/golza",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "melba",
    "name": "美爾巴",
    "tag": "飛行",
    "pattern": "flight",
    "friendly": false,
    "fact": "展開翅膀在空中飛行的古代怪獸。",
    "source": "https://tsuburaya-prod.com/encyclopedia/melba",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "gan-q",
    "name": "加恩Q",
    "tag": "分身",
    "pattern": "clone",
    "friendly": false,
    "fact": "最醒目的特徵，是身體中央的大眼睛。",
    "source": "https://tsuburaya-prod.com/encyclopedia/gan-q",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "bazanga",
    "name": "巴贊加",
    "tag": "突進",
    "pattern": "rush",
    "friendly": false,
    "fact": "布雷薩故事中的強敵，雙臂有發射器官。",
    "source": "https://tsuburaya-prod.com/encyclopedia/bazanga",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "gedos",
    "name": "蓋多斯",
    "tag": "游泳",
    "pattern": "burrow",
    "friendly": false,
    "fact": "住在水裡，頭頂像有小燈，喜歡吃魚。",
    "source": "https://tsuburaya-prod.com/encyclopedia/gedos",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "gamedon",
    "name": "加美頓",
    "tag": "重裝",
    "pattern": "armor",
    "friendly": false,
    "fact": "有堅硬甲殼，會旋轉背上的鰭。",
    "source": "https://tsuburaya-prod.com/encyclopedia/gamedon",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "rekiness",
    "name": "雷基尼斯",
    "tag": "合作",
    "pattern": "friendly",
    "friendly": true,
    "fact": "奧米加的流星怪獸夥伴，擅長念動能力。",
    "source": "https://tsuburaya-prod.com/encyclopedia/rekiness",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "trigaron",
    "name": "特萊加隆",
    "tag": "合作",
    "pattern": "friendly",
    "friendly": true,
    "fact": "奧米加的流星怪獸夥伴，力量與速度都很強。",
    "source": "https://tsuburaya-prod.com/encyclopedia/trigaron",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "valgeness",
    "name": "瓦爾基涅斯",
    "tag": "合作",
    "pattern": "friendly",
    "friendly": true,
    "fact": "奧米加的流星怪獸夥伴，能操控元素力量。",
    "source": "https://tsuburaya-prod.com/encyclopedia/valgeness",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  },
  {
    "id": "pucchi",
    "name": "Pucchi",
    "tag": "救援",
    "pattern": "friendly",
    "friendly": true,
    "fact": "Teo 故事中的溫柔小怪獸，喜歡甜甜圈。",
    "source": "https://tsuburaya-prod.com/encyclopedia/pucchi",
    "wiki": "https://zh.wikipedia.org/zh-tw/超人力霸王怪兽列表"
  }
];
const BADGES = [
  {id:'first',name:'勇氣的第一步',emoji:'🌱',description:'完成任何一個小任務',goal:1},
  {id:'quiz',name:'英雄小博士',emoji:'🏅',description:'完成一次猜猜我是誰',goal:1},
  {id:'forms',name:'型態觀察家',emoji:'🌈',description:'完成一次型態猜猜看',goal:1},
  {id:'device',name:'變身器達人',emoji:'⚡',description:'完成一次變身器猜謎',goal:1},
  {id:'battle',name:'地球守護者',emoji:'🛡️',description:'完成一次怪獸對戰',goal:1},
  {id:'coop',name:'宇宙最佳拍檔',emoji:'🏆',description:'兄弟一起完成合作任務',goal:1},
  {id:'memory',name:'超強記憶力',emoji:'🧩',description:'完成一次翻牌配對',goal:1},
  {id:'stars',name:'閃閃發光的你',emoji:'🌟',description:'累積獲得 50 顆星星',goal:50},
  {id:'explorer',name:'光之國探險家',emoji:'🚀',description:'完成全部六種任務',goal:6}
];
const GAMES = [
  {id:'quiz',title:'猜猜我是誰',copy:'看看英雄的模樣，你認得他嗎？',tag:'觀察小任務',meta:'認識英雄 · 動動小腦袋',bg:'#dcece5',tagColor:'#6d9382'},
  {id:'forms',title:'型態猜猜看',copy:'顏色變了！找出超人的新力量。',tag:'眼力大挑戰',meta:'型態變化 · 發現超能力',bg:'#e8e5f1',tagColor:'#9a84b4'},
  {id:'device',title:'這是誰的變身器？',copy:'神奇的道具，藏著變身的秘密！',tag:'變身小專家',meta:'認識道具 · 配對找答案',bg:'#f3e9ce',tagColor:'#b8a063'},
  {id:'battle',title:'變身！怪獸對戰',copy:'選擇你的英雄，勇敢守護地球！',tag:'勇氣出任務',meta:'單人冒險 · 鍵盤也能玩',bg:'#f2e1d6',tagColor:'#c18c70'},
  {id:'coop',title:'兄弟合體出任務',copy:'一人一份力量，合作就是最強！',tag:'兩個人更好玩',meta:'雙人合作 · 一起發射光線',bg:'#dde9cf',tagColor:'#8c9f6b'},
  {id:'reaction',title:'兄弟反應特訓',copy:'真假訊號、輪流接力，挑戰你們的默契！',tag:'全新反應挑戰',meta:'三種難度 · 記憶與合作',bg:'#d8e9f6',tagColor:'#5588ab'},
  {id:'flight',title:'雙人星際飛行',copy:'左右閃隕石，一起收集閃亮星光！',tag:'街機出發',meta:'雙人駕駛 · 三段速度',bg:'#dbe4fa',tagColor:'#617fba'},
  {id:'circuit',title:'光能接線',copy:'轉轉管道，讓光抵達太空基地。',tag:'動腦小工程師',meta:'空間推理 · 提示與復原',bg:'#f7e8cc',tagColor:'#af8d50'},
  {id:'memory',title:'英雄翻翻樂',copy:'翻開小卡片，找出變身好搭檔。',tag:'記憶力練習',meta:'翻牌配對 · 慢慢想沒關係',bg:'#dceae6',tagColor:'#7a9d91'}
];
let saved = {};
try { saved = JSON.parse(localStorage.getItem('ultra-base-v1') || '{}') || {}; } catch {}
const state = {
  player: ['little','big','together'].includes(saved.player) ? saved.player : 'little',
  sound: saved.sound !== false,
  stars: Number.isFinite(Number(saved.stars)) ? Math.min(999999,Math.max(0,Math.floor(Number(saved.stars)))) : 0,
  completed: Object.fromEntries(GAMES.map(g=>[g.id,Number.isFinite(Number(saved.completed?.[g.id]))?Math.min(999999,Math.max(0,Math.floor(Number(saved.completed[g.id])))):0])),
  collection:Array.isArray(saved.collection)?[...new Set(saved.collection.filter(id=>MONSTERS.some(m=>m.id===id)))]:[],
  team:Array.isArray(saved.team)&&saved.team.length===2&&saved.team.every(id=>HEROES.some(h=>h.id===id))?saved.team:['tiga','zero'],
  questRuns:Number.isFinite(Number(saved.questRuns))?Math.min(99999,Math.max(0,Math.floor(Number(saved.questRuns)))):0,
  page:'home', game:null, token:0, timers:new Set(), toastTimer:null, audio:null
};
function save(){try{localStorage.setItem('ultra-base-v1',JSON.stringify({player:state.player,sound:state.sound,stars:state.stars,completed:state.completed,collection:state.collection,team:state.team,questRuns:state.questRuns}));}catch{}}
function hasBadge(id){if(id==='first')return Object.values(state.completed).some(n=>n>0);if(id==='stars')return state.stars>=50;if(id==='explorer')return GAMES.filter(g=>['quiz','forms','device','battle','coop','memory'].includes(g.id)).every(g=>state.completed[g.id]>0);return state.completed[id]>0;}
function updateChrome(){
  $('#star-total').textContent = state.stars;
  $('#badge-count').textContent = BADGES.filter(b=>hasBadge(b.id)).length;
  $('#sound-button').innerHTML = icon(state.sound?'sound':'mute');
  $('#sound-button').setAttribute('aria-label',state.sound?'關閉聲音':'開啟聲音');
  $('#sound-button').setAttribute('aria-pressed',String(state.sound));
  $$('.nav-item').forEach(el=>{el.classList.toggle('active',el.dataset.nav===state.page);el.setAttribute('aria-current',el.dataset.nav===state.page?'page':'false');});
}
function later(fn,ms){const token=state.token;const timer=setTimeout(()=>{state.timers.delete(timer);if(token===state.token)fn();},ms);state.timers.add(timer);return timer;}
function leave(){document.body.classList.remove('playing-battle');releaseHeld();state.token++;state.timers.forEach(clearTimeout);state.timers.clear();stopVoice();state.game=null;}
function navigate(page,focus=true){
  leave();state.page=page;updateChrome();
  $('#breadcrumb-text').textContent = page==='home'?'今天，也一起閃閃發光！':page==='heroes'?'認識一起守護地球的朋友':'每一份勇氣，都值得收藏';
  if(page==='heroes')renderHeroes();else if(page==='badges')renderBadges();else renderHome();
  if(focus){window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});}
}
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function heroImage(h, cls='', alt=true){return `<img class="${cls}" src="assets/${h.id}.png" alt="${alt?h.name:''}" draggable="false">`;}
function city(){return `<div class="city" aria-hidden="true"><svg viewBox="0 0 900 140" preserveAspectRatio="none"><g fill="currentColor"><path d="M0 100h32V64h44v76H0Zm64 40V88h24V51h26v89Zm44 0V70h41v70Zm35 0V30h19V15h4v15h20v110Zm35 0V86h45v54Zm38 0V60h33v80Zm28 0V88h38v52Zm33 0V44h44v96Zm35 0V75h28v65Zm22 0V53h48v87Zm40 0V12h10V0h3v12h16v128Zm22 0V69h44v71Zm38 0V50h31v90Zm24 0V82h48v58Zm40 0V37h38v103Zm32 0V60h30v80Zm23 0V18h13V5h5v13h17v122Zm28 0V66h34v74Zm27 0V42h48v98Zm40 0V76h37v64Zm30 0V30h31v110Zm23 0V94h41v46Zm35 0V57h31v83Zm26 0V81h39v59Zm31 0V65h32v75Zm25 0V91h34v49Z"/></g><path d="M20 86h8m12-9h8m29 27h9m12-37h8m56-21h8m-8 16h8m112 7h10m-10 14h10m73 0h10m65-11h9m93-16h8m-8 14h8m80-26h8m54 17h9m-9 13h9m73-27h9m-9 15h9" stroke="#f5f8df" stroke-width="5"/></svg></div>`;}
function formFigure(form,cls='form-picture'){
  const armored=/armor|ultimate|beyond|solis|luna|galaxy|gamedon|rekiness|trigaron|valgeness/.test(form.id)&&form.heroId!=='cosmos';
  const marks=(armored?`<path d="m40 65 17-4 8 19-18 12-12-9Zm70 0-17-4-8 19 18 12 12-9Z" fill="${form.second}" stroke="#f2e6b2" stroke-width="3"/>`:'')+(form.heroId==='gaia'&&form.id!=='gaia-v1'?'<path d="m48 66 27 21 27-21-6 25-21 13-21-13Z" fill="#393e48"/>':'')+(form.heroId==='zero'?'<path d="m62 17-5-16-8 23m39-7 5-16 8 23" fill="#dfe9e3" stroke="#779996" stroke-width="2"/>':'');
  return `<svg class="${cls}" viewBox="0 0 150 240" aria-label="${HEROES.find(h=>h.id===form.heroId)?.short||'英雄'}${form.name}配色示意圖" role="img"><defs><linearGradient id="silver-${form.id}" x1="0" x2="1"><stop stop-color="#b8c7c5"/><stop offset=".5" stop-color="#f9fcf6"/><stop offset="1" stop-color="#b1c1be"/></linearGradient></defs><g stroke="#627d7844" stroke-width="1.1"><path d="m52 125-11 89 20 3 14-76 14 76 20-3-11-89" fill="${form.color}"/><path d="m45 185-4 29-8 14q-1 7 23 3l6-16 6-28m17 0 5 28 6 16q24 4 23-3l-9-14-5-29" fill="url(#silver-${form.id})"/><path d="M47 63Q75 49 103 63l8 38-13 39H52l-13-39Z" fill="${form.color}"/><path d="m75 73 28-10-8 24-20 13-20-13-8-24Z" fill="#ded3a1"/><path d="m75 81 26-17-6 13-20 14-20-14-6-13Z" fill="#f4f4df"/><path d="m75 100 20-13-9 42 12 11H52l12-11-9-42Z" fill="url(#silver-${form.id})"/><path d="M47 63Q34 58 28 81l-9 47 13 4 15-33m56-36q13-5 19 18l9 47-13 4-15-33" fill="${form.second}"/><path d="m22 110-5 22q-4 15 8 14l9-14 6-20m70 0 7 20 9 14q12 1 8-14l-5-22" fill="url(#silver-${form.id})"/><path d="M52 28Q53 7 75 9q22-2 23 19l-4 22-19 17-19-17Z" fill="url(#silver-${form.id})"/><path d="m67 16 8-15 8 15-8 24Z" fill="#e9ddad"/><path d="m56 30 15 7-5 10-11-5Zm38 0-15 7 5 10 11-5Z" fill="#fff1b0"/><path d="m70 54 5 2 5-2-2 5h-6Z" fill="#809a94"/><circle cx="75" cy="81" r="6" fill="#77cbd4" stroke="#faf6d0" stroke-width="3"/>${marks}</g></svg>`;
}
function devicePicture(hero,cls='device-picture'){
  const id=hero.drawingId||hero.id;
  let drawing='';
  if(id==='ultraman')drawing='<rect x="64" y="35" width="32" height="151" rx="14" fill="#c4d1ce"/><rect x="61" y="25" width="38" height="45" rx="15" fill="#f48365"/><path d="M70 83h20v65H70Z" fill="#e8eee5"/><path d="M75 84h10v65H75Z" fill="#ecbb65"/><path d="M65 164h30v8H65" fill="#6e8e83"/><circle cx="80" cy="49" r="9" fill="#fff3ba"/>';
  else if(id==='seven'||id==='zero')drawing=`<path d="m22 69 58 17 58-17-9 41-49 13-49-13Z" fill="${id==='zero'?'#638caa':'#d2695a'}"/><path d="m28 72 51 15 53-15-10 28-42 13-42-13Z" fill="#d3ded8"/><path d="m38 79 34 10-7 15-25-8Zm84 0-34 10 7 15 25-8Z" fill="${id==='zero'?'#d0eaba':'#edc371'}"/><path d="M74 86h12v29H74Z" fill="#71988e"/>${id==='zero'?'<path d="M29 72 40 37l22 44m67-9-9-35-24 44" fill="#dce4df"/>':''}<path d="m81 117-9 12 18 41 15-6Z" fill="${id==='zero'?'#648fab':'#cf6c60'}"/>`;
  else if(id==='tiga')drawing='<path d="M69 94h22v93H69Z" fill="#d4ded7"/><path d="M74 103h12v64H74Z" fill="#9a7e99"/><path d="M80 22 48 55l-8 56 28-15 12-28 12 28 28 15-8-56Z" fill="#d9b25f"/><path d="m80 30-23 30-8 33 19-13 12-31 12 31 19 13-8-33Z" fill="#e9dfaa"/><path d="m80 47-8 33 8 23 8-23Z" fill="#b2e3d6"/><path d="M65 178h30v10q-15 10-30 0Z" fill="#d3aa57"/>';
  else if(id==='z')drawing='<path d="M38 38 123 62l-15 25-34-8-8 109-28-4 11-111-20-9Z" fill="#6f8f9c"/><path d="m46 42 73 23-10 11-51-9-6 16-14-6Z" fill="#d9e3dd"/><path d="m57 94 42 7-4 45-45-7Z" fill="#8bc9d1"/><circle cx="69" cy="121" r="14" fill="#d4e8da"/><path d="m62 112 15 2-18 17 16 2" stroke="#7097a9" stroke-width="4" fill="none"/><path d="m45 162 20 4-2 16-19-3Z" fill="#b3d7c5"/>';
  else if(id==='mebius')drawing='<path d="m42 77 76 8-10 66-73-10Z" fill="#be735e"/><path d="m41 90 76 4-6 42-73-3Z" fill="#d9bd74"/><path d="m40 99 71 3-3 23-69-1Z" fill="#8d6276"/><path d="M81 35 55 75l9 35 14 20 15-23 8-31Z" fill="#debd63"/><path d="m80 49-14 29 11 34 13-31Z" fill="#b6e6d7"/><path d="m80 56-5 26 4 19 6-20Z" fill="#e5f9d8"/>';
  else {
    const metal='#d1dedb',gold='#e5c47c',glow='#8edbd5',accent=hero.color;
    const shapes={
      none:`<path d="m80 30 15 48 45 20-45 20-15 50-15-50-45-20 45-20Z" fill="${gold}"/><circle cx="80" cy="98" r="16" fill="${glow}"/>`,
      ring:`<circle cx="80" cy="126" r="42" fill="none" stroke="${gold}" stroke-width="15"/><path d="m80 35 26 32-26 25-26-25Z" fill="${glow}"/>`,
      badge:`<path d="m80 30 14 43 45 1-36 28 12 47-35-27-35 27 12-47-36-28 45-1Z" fill="${gold}"/><circle cx="80" cy="89" r="16" fill="${glow}"/>`,
      pendant:`<path d="M42 21q38 62 76 0" fill="none" stroke="${metal}" stroke-width="8"/><path d="m80 66 27 41-27 55-27-55Z" fill="${gold}"/><path d="m80 80 15 27-15 36-15-36Z" fill="${glow}"/>`,
      wrist:`<rect x="26" y="68" width="108" height="76" rx="20" fill="${metal}"/><rect x="36" y="84" width="88" height="42" rx="12" fill="${gold}"/><path d="m80 45 22 53-22 39-22-39Z" fill="${glow}"/>`,
      orb:`<circle cx="80" cy="78" r="44" fill="none" stroke="${gold}" stroke-width="13"/><path d="M67 119h26v67H67Z" fill="${metal}"/>`,
      gyro:`<path d="m80 24 45 70-45 72-45-72Z" fill="${metal}"/><path d="M36 60h88v65H36Z" fill="${gold}"/><circle cx="80" cy="92" r="26" fill="${glow}"/>`,
      cube:`<path d="m80 26 36 21v43L80 111 44 90V47Z" fill="${glow}"/><path d="m80 26 0 42 36-21M44 47l36 21v43" fill="none" stroke="${gold}" stroke-width="6"/><path d="M65 113h30v72H65Z" fill="${metal}"/>`,
      boomerang:`<path d="m14 37 66 50 66-50-15 83-51 25-51-25Z" fill="#c4655f"/><path d="m80 82 21 24-21 33-21-33Z" fill="${glow}"/>`,
      terminal:`<rect x="43" y="31" width="74" height="155" rx="20" fill="${metal}"/><rect x="52" y="54" width="56" height="74" rx="9" fill="${glow}"/><circle cx="80" cy="153" r="13" fill="${gold}"/>`,
      gun:`<path d="M30 36h95v47H76l-10 99H36l10-99H30Z" fill="${metal}"/><path d="M44 48h70v23H44Z" fill="${glow}"/><path d="m52 102 18 3-6 53-18-3Z" fill="${gold}"/>`,
      lance:`<path d="m80 18 37 66-25 24v80H68v-80L43 84Z" fill="${gold}"/><path d="m80 34 18 43-18 18-18-18Z" fill="${glow}"/>`,
      crystal:`<path d="m80 26 34 70-34 72-34-72Z" fill="${glow}"/><path d="M61 158h38v28H61Z" fill="${metal}"/>`,
      spark:`<rect x="66" y="72" width="28" height="112" rx="10" fill="${metal}"/><path d="m80 22 31 38-31 52-31-52Z" fill="${gold}"/><path d="m80 34 17 27-17 30-17-30Z" fill="${glow}"/>`
    };
    drawing=shapes[hero.deviceKind]||shapes.none;
  }
  return `<svg class="${cls}" viewBox="0 0 160 210" role="img" aria-label="${hero.device}示意圖"><g stroke="#56776b33" stroke-width="1.5" stroke-linejoin="round">${drawing}</g><path d="m23 27 3 9 9 3-9 3-3 9-3-9-9-3 9-3Zm109 119 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#f5d584"/></svg>`;
}
function monster(cls='monster-picture',variant=0){
 const m=typeof variant==='object'?variant:MONSTERS[variant]||MONSTERS[0];
 return `<img class="${cls}" src="assets/monster-${m.id}.png" alt="${m.name}" draggable="false">`;
}

function cardArt(game){
  if(game.id==='flight')return '<div class="arcade-card-art">✦<br>🚀 🚀</div>';
  if(game.id==='circuit')return '<div class="arcade-card-art">☀ ━ ┓<br>　 ┏ ┛<br>　 ┗ 🚩</div>';
  if(game.id==='quiz')return heroImage(HEROES[0],'card-hero',false)+'<span class="question-bubble">?</span>';
  if(game.id==='forms')return FORMS.slice(0,3).map(f=>formFigure(f,'form-figure')).join('');
  if(game.id==='device')return devicePicture(HEROES[2],'art-device');
  if(game.id==='battle')return heroImage(HEROES[2],'card-hero',false)+monster('art-monster')+'<span class="vs">VS</span>';
  if(game.id==='reaction')return heroImage(HEROES[2],'card-hero',false)+heroImage(HEROES[3],'card-hero second',false)+'<span class="question-bubble">⚡</span>';
  if(game.id==='coop')return heroImage(HEROES[3],'card-hero',false)+heroImage(HEROES[4],'card-hero second',false);
  return '<div class="mini-memory"><span>✦</span><span>?</span></div>';
}
function cardTitle(game){return game.id==='device'?'這是誰的<span class="keep-word">變身器？</span>':game.title;}
function renderHome(){
  main.innerHTML=`<section class="page-intro"><div><p class="eyebrow">WELCOME TO THE LAND OF LIGHT</p><h1>小英雄，歡迎回來！<span>👋</span></h1><p class="intro-sub">今天想和超人力霸王，一起展開什麼冒險呢？</p></div><div class="today">${icon('sun')} 每一天都是冒險日</div></section>
  <section class="hero-banner" aria-label="一起守護地球"><div class="hero-copy"><span class="pill">${icon('sparkle')} 專屬你們的宇宙冒險</span><h2>小小英雄，<br><em>大大冒險！</em></h2><p>猜猜英雄、發現力量，再一起變身。<br>光之國的下一位小英雄，就是你！</p><button class="primary" data-action="start" data-game="coop">${icon('play')} 一起變身，出任務！ ${icon('arrow')}</button></div><div class="hero-art" aria-hidden="true"><div class="hero-disk"></div><div class="orbit"></div>${heroImage(HEROES[2],'tiga',false)}${heroImage(HEROES[3],'zero',false)}<span class="floating-label"><b>✦</b> 勇氣 + 合作 = 無限力量</span><span class="art-star s1">✧</span><span class="art-star s2">✦</span><span class="art-star s3">✧</span></div>${city()}<span class="banner-corner">LET'S SHINE TOGETHER ✦</span></section>
  ${questHome()}<section class="player-strip" aria-label="選擇玩家模式"><div class="strip-label">今天誰來玩？<span>選一個適合你的模式</span></div><div class="player-options">${[
    ['little','👦🏻','弟弟模式','4 歲・圖片提示多一點'],['big','🧑🏻','哥哥模式','6 歲・挑戰多一點'],['together','🤝','兄弟一起','雙人・合作最好玩']
  ].map(([id,face,title,sub])=>`<button class="player-button ${state.player===id?'selected':''}" data-action="player" data-player="${id}" aria-pressed="${state.player===id}"><span class="player-face">${face}</span><span><b>${title}</b><small>${sub}</small></span><span class="check-dot">✓</span></button>`).join('')}</div></section>
  <section aria-labelledby="game-heading"><div class="section-title"><h2 id="game-heading">選一個小冒險 <small>每一次嘗試，都會更厲害一點</small></h2><button class="text-button" data-action="help">怎麼玩？ ${icon('info')}</button></div><div class="game-grid">${GAMES.map((g,i)=>`<button class="game-card" data-action="start" data-game="${g.id}" style="--card-bg:${g.bg};--tag-color:${g.tagColor}" aria-label="${g.title}，${g.copy}"><div class="card-art"><span class="card-tag">${g.id==='coop'?'✦ ':''}${g.tag}</span><span class="card-number">0${i+1}</span>${cardArt(g)}</div><div class="card-detail"><h3>${cardTitle(g)}</h3><p>${g.copy}</p><div class="card-bottom"><span>${g.meta}</span>${icon('arrow')}</div></div></button>`).join('')}</div></section>
  <p class="welcome-note">${icon('heart')} 不用比快，也不怕答錯。勇敢試試看，就是最棒的小英雄！</p>`;
}
function screenHead(title,copy,tag=''){return `<div class="screen-head"><button class="back-button" data-action="home" aria-label="回冒險大廳">${icon('back')}</button><div><h1>${title}</h1><p>${copy}</p></div>${tag?`<span class="round-tag">${tag}</span>`:''}</div>`;}
const ERAS={all:'全部英雄',classic:'經典・昭和',heisei:'平成夥伴',new:'新生代',latest:'最新英雄'};
let catalogueFilter='all',catalogueSearch='',encyclopediaTab='heroes';
const ROLES={balance:'✦ 平衡',power:'💪 力量',speed:'💨 速度',guard:'🛡 守護',calm:'💙 慈愛'};
function heroForms(h){return FORMS.filter(f=>f.heroId===h.id);}
function activeForm(g,i){return FORMS.find(f=>f.id===g.forms?.[i])||null;}
function deviceQuestion(d){const h=HEROES.find(h=>h.id===d.owners[0]);return {...h,device:d.name,deviceKey:d.deviceKey,deviceKind:d.deviceKind,deviceId:d.id,drawingId:d.id.startsWith('device-')?h.id:d.id,owners:d.owners};}
function libraryTabs(){return `<div class="encyclopedia-tabs" role="group" aria-label="選擇百科">${[['heroes','英雄',HEROES],['forms','型態',FORMS],['devices','道具',DEVICES],['moves','必殺技',MOVES],['monsters','怪獸',MONSTERS]].map(([id,label,items])=>`<button class="secondary ${encyclopediaTab===id?'selected':''}" data-action="encyclopedia-tab" data-tab="${id}" aria-pressed="${encyclopediaTab===id}">${label} ${items.length}</button>`).join('')}</div>`;}
function sourceLink(url){return `<a class="hero-source" href="${url}" target="_blank" rel="noopener noreferrer">家長閱讀：資料來源 ↗</a>`;}
function moveSymbol(m){return {beam:'⚡',ring:'◎',burst:'💥',calm:'💙'}[m.kind]||'✦';}
function catalogueTools(){return `<section class="catalogue-tools" aria-label="尋找英雄"><div class="era-tabs">${Object.entries(ERAS).map(([id,label])=>`<button class="era-tab ${catalogueFilter===id?'selected':''}" data-action="hero-filter" data-filter="${id}" aria-pressed="${catalogueFilter===id}">${label}</button>`).join('')}</div><label class="hero-search-label">找找你的英雄 <input id="hero-search" type="search" placeholder="例如：傑洛、Teo、2025" autocomplete="off" maxlength="60"></label><p id="hero-count" role="status"></p></section>`;}
function filterHeroCards(){
 const query=catalogueSearch.trim().toLocaleLowerCase();let count=0;
 $$('[data-hero-card]').forEach(el=>{const h=HEROES.find(h=>h.id===el.dataset.heroCard);const show=(catalogueFilter==='all'||h.era===catalogueFilter)&&`${h.name} ${h.short} ${h.en} ${h.year}`.toLocaleLowerCase().includes(query);el.hidden=!show;if(show)count++;});
 $$('.era-tab').forEach(el=>{const active=el.dataset.filter===catalogueFilter;el.classList.toggle('selected',active);el.setAttribute('aria-pressed',String(active));});
 if($('#hero-count'))$('#hero-count').textContent=count?`找到 ${count} 位光之夥伴`:'這裡還找不到，換個名字或選「全部英雄」看看！';
}
function restoreHeroTools(){if($('#hero-search'))$('#hero-search').value=catalogueSearch;filterHeroCards();}
function renderHeroes(){if(encyclopediaTab!=='heroes'){renderExtraLibrary();return;}main.innerHTML=libraryTabs()+screenHead('英雄大百科','從經典夥伴到 2026 年 Teo，一起認識光之英雄。',`${HEROES.length} 位光之夥伴`)+catalogueTools()+`<div class="hero-library">${[...HEROES].sort((a,b)=>b.year-a.year).map(h=>`<article class="library-card" data-hero-card="${h.id}"><div class="library-image" style="--hero-bg:${h.color}">${heroImage(h)}</div><h2>${h.short}</h2><span class="english-name">${h.en}</span><span class="hero-year">${h.year} 年登場 · ${ERAS[h.era]}</span><p>${h.fact}<br><b>變身方式：</b>${h.device}<br><b>代表招式：</b>${h.move}</p><button class="read-button" data-action="read-hero" data-id="${h.id}">${icon('sound')} 聽聽英雄的故事</button><a class="hero-source" href="${h.source}" target="_blank" rel="noopener noreferrer">家長閱讀：官方百科 ↗</a></article>`).join('')}</div><p class="catalogue-note">收錄圓谷官方英雄百科目前列出的 53 位角色（查核：2026/10/15）。年代為登場年份分組，型態與合體角色不另外計數。Teo 保留官方英文名稱；中文譯名因地區可能不同。</p>`;restoreHeroTools();}
function renderExtraLibrary(){
 const rows={forms:FORMS,devices:DEVICES,moves:MOVES,monsters:MONSTERS}[encyclopediaTab];
 const titles={forms:'七彩型態研究室',devices:'變身道具寶庫',moves:'必殺技實驗室',monsters:'怪獸好朋友圖鑑'};
 main.innerHTML=libraryTabs()+screenHead(titles[encyclopediaTab],'看圖片、聽故事，再把喜歡的夥伴帶進冒險！',`${rows.length} 個發現`)+`<div class="extra-library">${rows.map(x=>{
  const h=HEROES.find(h=>h.id===(x.heroId||x.owners?.[0]));
  let visual,copy,action;
  if(encyclopediaTab==='forms'){visual=formFigure(x);copy=`${h.short} · ${ROLES[x.role]}<br>${x.hint}<br>招式：${x.move}`;action=`<button class="read-button" data-action="try-form" data-id="${x.id}">變成這個型態！</button>`;}
  else if(encyclopediaTab==='devices'){visual=devicePicture(deviceQuestion(x));copy=`${x.kind} · ${x.owners.map(id=>HEROES.find(h=>h.id===id).short).join('、')}<br>${x.fact}`;action='';}
  else if(encyclopediaTab==='moves'){visual=`<div class="move-symbol ${x.kind}">${moveSymbol(x)}</div>${heroImage(h,'move-owner')}`;copy=`${h.short}的招式<br>${{beam:'集中光線',ring:'旋轉光輪',burst:'爆發力量',calm:'溫柔的光'}[x.kind]} · 遊戲演出分類`;action=`<button class="read-button" data-action="try-move" data-id="${x.id}">帶著這招出發！</button>`;}
  else{visual=monster('monster-library-image',x);copy=`${x.friendly?'💚 友善夥伴':'✦ '+x.tag+'挑戰'}<br>${x.fact}`;action=`<button class="read-button" data-action="try-monster" data-id="${x.id}">${x.friendly?'一起幫助牠！':'和牠玩挑戰！'}</button>`;}
  return `<article class="extra-card"><div class="extra-visual">${visual}</div><h2>${x.name}</h2><p>${copy}</p>${action}<button class="read-button" data-action="read-entry" data-id="${x.id}" data-tab="${encyclopediaTab}">♫ 聽聽小故事</button>${sourceLink(x.source)}</article>`;
 }).join('')}</div><p class="catalogue-note">型態與道具圖為簡化配色示意，辨識時請一起看名稱；不是官方造型複製圖。招式動畫與力量加成是本遊戲的趣味設計。中文譯名可能因地區不同，沒有確定譯名時保留原名。資料查核：2026/10/15。</p>`;
}
function renderBadges(){main.innerHTML=stickerBook()+screenHead('我的小成就','每一份勇氣，都會變成一顆閃亮的星星。')+`<div class="star-summary"><span>★</span><div><strong>${state.stars} <small style="font-size:14px">顆冒險星星</small></strong><p>已收集 ${BADGES.filter(b=>hasBadge(b.id)).length} / ${BADGES.length} 枚徽章，一起慢慢收集吧！</p></div></div><div class="badge-grid">${BADGES.map(b=>`<article class="achievement ${hasBadge(b.id)?'earned':'locked'}"><div class="medal">${b.emoji}</div><h2>${b.name}</h2><p>${b.description}</p><span class="status-label">${hasBadge(b.id)?'✓ 已獲得・你好棒！':'等待你的冒險'}</span></article>`).join('')}</div><p class="badge-help">星星與徽章會保存在這個瀏覽器裡，不用登入。</p>`;}
function startGame(mode){
  leave();state.page='home';updateChrome();window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});
  $('#breadcrumb-text').textContent=GAMES.find(g=>g.id===mode).title;
  if(['quiz','forms','device'].includes(mode))startQuiz(mode);else if(mode==='reaction')reactionSetup();else if(mode==='flight')flightSetup();else if(mode==='circuit')circuitBegin();else if(mode==='memory')startMemory();else startSelection(mode==='coop');
}
function startQuiz(mode){
  const pool = mode==='forms'?FORMS:mode==='device'?DEVICES.filter(d=>d.kind!=='武器').map(deviceQuestion):HEROES;
  const deck = shuffle(pool);
  while(deck.length<5)deck.push(...shuffle(pool));
  state.game={type:'quiz',mode,deck:deck.slice(0,5),index:0,answered:false,options:[],stars:0};
  nextQuiz();
}
function nextQuiz(){
  const g=state.game;if(!g||g.type!=='quiz')return;stopVoice();
  if(g.index>=5){finish(g.mode,10,'五顆勇氣，五次小小進步！','你已經完成 5 道題目。每次觀察，都讓你更認識英雄。');return;}
  g.answered=false;
  const q=g.deck[g.index], easy=state.player!=='big',pool=g.mode==='forms'?FORMS.filter(f=>f.heroId===q.heroId):HEROES;
  g.options=shuffle([q,...shuffle(pool.filter(x=>x.id!==q.id&&(g.mode!=='device'||x.deviceKey!==q.deviceKey&&!(q.owners||[q.id]).includes(x.id)))).slice(0,(easy||g.mode==='forms')?2:3)]);
  const title=g.mode==='quiz'?'這位光之英雄是誰呢？':g.mode==='forms'?`${HEROES.find(h=>h.id===q.heroId).short}變成了哪一種型態？`:'這個力量道具，是誰的好搭檔？';
  const visual=g.mode==='quiz'?heroImage(q,'',false):g.mode==='forms'?`<div class="form-question-owner">${heroImage(HEROES.find(h=>h.id===q.heroId),'form-owner')}<span>${HEROES.find(h=>h.id===q.heroId).short}<small>型態配色示意</small></span></div>${formFigure(q).replace(/aria-label="[^"]*"/,'aria-label="型態配色示意圖"')}`:devicePicture(q).replace(/aria-label="[^"]*"/,'aria-label="變身道具示意圖"')+`<span class="device-name-label">觀察道具的形狀</span>`;
  main.innerHTML=screenHead(GAMES.find(x=>x.id===g.mode).title,'慢慢看、慢慢想，答錯也可以再試一次。',`${easy?'暖身':'進階'}挑戰 · ${g.index+1} / 5`)+`<section class="panel center"><div class="quiz-progress" aria-label="第 ${g.index+1} 題，共 5 題">${Array.from({length:5},(_,i)=>`<span class="${i<g.index?'done':i===g.index?'current':''}"></span>`).join('')}</div><h2 class="question-title">${title}</h2><div class="question-visual">${visual}</div><p class="quiz-hint">✦ ${quizHint(g.mode)}</p><div class="quiz-options ${g.options.length===4?'four':''}">${g.options.map((o,i)=>`<button class="answer" data-action="answer" data-index="${i}"><span class="key-hint">${i+1}</span>${easy&&g.mode!=='forms'?heroImage(o):''}<span>${g.mode==='forms'?o.name:o.short}</span></button>`).join('')}</div><div class="feedback" id="feedback" role="status" aria-live="polite"></div><div class="quiz-toolbar"><span>${iconInlineKeyboard()} 也可以按數字 1～${g.options.length} 選答案</span><button class="read-button" data-action="read-question">${icon('sound')} 聽聽題目</button></div></section>`;
  if(easy)speakQuestion();
}
function iconInlineKeyboard(){return '⌨';}
function quizHint(mode){return mode==='forms'?'觀察身上的顏色和花紋，再選一個型態。':mode==='device'?'觀察道具的形狀，再找找它的主人。':'看看英雄的模樣，再選一個答案。';}
function speakQuestion(){const g=state.game;if(!g||g.type!=='quiz')return;const question=g.mode==='forms'?'圖片裡是哪一種型態？':g.mode==='device'?'這個變身道具，是哪位英雄的？':'圖片裡是哪一位英雄？';speak(question+'。'+quizHint(g.mode));}
function answer(index){
  const g=state.game;if(!g||g.type!=='quiz'||g.answered)return;const q=g.deck[g.index],o=g.options[index];if(!o)return;
  const btn=$$('[data-action="answer"]')[index];
  if(o.id!==q.id){btn.classList.add('wrong');$('#feedback').textContent='很接近了，再仔細看看！你可以的。';tone('try');speak('再仔細看看，你可以的！');return;}
  g.answered=true;btn.classList.remove('wrong');btn.classList.add('correct');$$('[data-action="answer"]').forEach(b=>b.disabled=true);g.stars++;
  $('#feedback').innerHTML=`<span>✦ 答對了！${g.mode==='forms'?q.description:`這是${q.name}！`}</span><button class="primary" data-action="next-question">${g.index===4?'領取星星':'下一題'} ${icon('arrow')}</button>`;
  playCue('correct',g.mode==='forms'?q.description:`這是${q.name}！`);$('#feedback').scrollIntoView?.({block:'nearest',behavior:'instant'});
}
function selectionExtras(g){
 const h=HEROES[g.selected[g.pilot]],forms=heroForms(h),m=MONSTERS.find(m=>m.id===g.monsterId)||MONSTERS[0];
 return `<section class="loadout"><h3>🌈 ${h.short}的型態</h3><p>先選力量！對戰中也能按 D${g.coop?'／J':''} 切換。</p><div class="loadout-options">${forms.length?forms.map(f=>`<button class="form-choice ${g.forms[g.pilot]===f.id?'selected':''}" data-action="pick-form" data-id="${f.id}" aria-pressed="${g.forms[g.pilot]===f.id}"><span style="background:${f.color}" class="form-dot"></span><b>${f.name}</b><small>${ROLES[f.role]}</small></button>`).join(''):'<span class="pill">✦ 基本型態，光之力量準備好了！</span>'}</div><h3>🦖 今天和誰出任務？</h3><p>${m.name} · ${m.friendly?'幫助好朋友，一起送暖！':m.tag+'小挑戰'}<br>${m.fact}</p><div class="monster-select">${MONSTERS.map(x=>`<button class="monster-choice ${g.monsterId===x.id?'selected':''}" data-action="pick-monster" data-id="${x.id}" aria-pressed="${g.monsterId===x.id}">${monster('monster-thumb',x)}<b>${x.name}</b><small>${x.friendly?'💚 友善夥伴':x.tag+'挑戰'}</small></button>`).join('')}</div></section>`;
}
function chosenMove(g){
 const form=activeForm(g,0);
 return MOVES.find(m=>m.id===g.moveId&&m.heroId===g.heroes[0].id)||MOVES.find(m=>m.heroId===g.heroes[0].id&&m.name===form?.move)||MOVES.find(m=>m.heroId===g.heroes[0].id)||{id:'practice',name:'守護之光（遊戲練習招式）',kind:'calm'};
}
function battleMoves(g){
 const rows=MOVES.filter(m=>m.heroId===g.heroes[0].id);
 return `<div class="battle-moves" id="battle-moves"><p>⚡ 選一招喜歡的必殺技${g.coop?'，和弟弟一起發射！':'！'}</p><div class="loadout-options">${rows.length?rows.map(m=>`<button class="move-choice ${chosenMove(g).id===m.id?'selected':''}" data-action="pick-move" data-id="${m.id}" aria-pressed="${chosenMove(g).id===m.id}">${moveSymbol(m)} ${m.name}</button>`).join(''):'<span class="pill">♥ 守護之光 · 遊戲練習招式</span>'}</div></div>`;
}
function updateMoveButtons(g){
 $$('[data-action="pick-move"]').forEach(el=>{const active=el.dataset.id===chosenMove(g).id;el.classList.toggle('selected',active);el.setAttribute('aria-pressed',String(active));});
}
function applyBattleForms(){
 const g=state.game;if(g?.type!=='battle')return;
 $$('.arena-hero').forEach((el,i)=>{const f=activeForm(g,i);el.style.filter=f?`drop-shadow(0 0 14px ${f.color})`:'';el.style.setProperty('--form-color',f?.color||'#7cc7d0');el.setAttribute('aria-label',`${g.heroes[i].short}・${f?.name||'基本型態'}`);const tag=$(`#form-label-${i}`);if(tag){tag.style.borderColor=f?.color||'#7cc7d0';tag.textContent=`${f?.name||'基本型態'} ${f?ROLES[f.role]:''}`;}});
}
function cycleForm(i){
 const g=state.game;if(g?.type!=='battle'||g.paused||g.firing||g.finished||i>=(g.coop?2:1))return;
 const rows=heroForms(g.heroes[i]);if(rows.length<2){toast('這位英雄的基本型態，已經充滿光之力量！');return;}
 const next=rows[(rows.findIndex(f=>f.id===g.forms[i])+1)%rows.length];g.forms[i]=next.id;if(i===0)g.moveId=null;
 $(`#form-label-${i}`).textContent=next.name;applyBattleForms();updateMoveButtons(g);tone('transform');
 $('#battle-message').textContent=`${g.heroes[i].short}・${next.name}！${next.hint}`;
}
function beginChallenge(g){
 g.challengeSolved=false;const p=g.monster.pattern;
 const message={rush:'怪獸突進！按護盾，一起保護城市！',electric:'電流來囉！按護盾，變成守護型更安心！',armor:'重裝挑戰！換力量型再攻擊，可多得能量！',flight:'怪獸飛高了！換速度型再攻擊，可多得能量！',clone:'分身出現了！找出亮著星星的本尊！',burrow:'怪獸躲起來了！找到亮著星星的位置！',friendly:`${g.monster.name}想要你的幫忙！點亮星星，送出溫暖！`}[p];
 $('#battle-message').textContent=message;$('.arena-status').textContent=g.monster.friendly?'♥ 一起幫助好朋友':'✦ 小挑戰開始！';playCue('challenge');
 if(['clone','burrow','friendly'].includes(p)){
  g.targetIndex=Math.floor(Math.random()*3);const el=document.createElement('div');el.className='challenge-targets';
  el.innerHTML=Array.from({length:3},(_,i)=>`<button data-action="challenge-target" data-index="${i}" aria-label="${i===g.targetIndex?'亮著星星的正確位置':'再觀察一下這個位置'}">${i===g.targetIndex?(g.monster.id==='pucchi'?'🍩 ★':g.monster.id==='kanegon'?'🪙 ★':'🌟'):(p==='burrow'?'🪨':p==='friendly'?'☁':'?')}</button>`).join('');$('#arena').append(el);
 }
}
function challengeTarget(i){
 const g=state.game;if(g?.type!=='battle'||g.paused||g.firing||!g.warning||g.challengeSolved)return;
 if(i!==g.targetIndex){$('#battle-message').textContent='再看看亮著星星的那一個！不怕答錯喔！';return;}
 g.challengeSolved=true;$('.challenge-targets')?.remove();g.energy[0]=Math.min(4,g.energy[0]+1);if(g.coop)g.energy[1]=Math.min(4,g.energy[1]+1);
 updateEnergy();$('#battle-message').textContent=g.monster.friendly?'好朋友開心了！送你們一格愛心能量！':'找到本尊了！送你們一格光之能量！';playCue('correct');
}

const QUEST_PLACES=[
 {id:'forest',name:'森林找朋友',emoji:'🌳',task:'collect',copy:'朋友迷路了！收集三顆光之星，幫牠找到回家的路。',pool:['pigmon','pucchi','kanegon']},
 {id:'coast',name:'海岸追蹤隊',emoji:'🌊',task:'track',copy:'怪獸躲起來了！觀察腳印，找出三次正確的位置。',pool:['gubila','telesdon','gedos']},
 {id:'space',name:'宇宙分身謎',emoji:'🪐',task:'clone',copy:'分身擋住航線！找到三次真正的夥伴，再發射光線。',pool:['baltan','dada','neronga']}
];
function questHome(){return `<section class="quest-launch" aria-label="星星救援旅程"><div><span class="pill">🌟 新冒險 · 三站故事</span><h2>出發！星星救援隊</h2><p>森林找朋友 → 海岸追蹤 → 宇宙分身<br>每完成一站，就能帶回一張怪獸貼紙！</p><div class="quest-launch-actions"><button class="primary" data-action="start-quest">🚀 ${state.player==='together'?'兄弟一起':'小英雄'}，直接出發！</button><button class="secondary" data-action="start" data-game="${state.player==='together'?'coop':'battle'}">先挑我的英雄</button></div></div><button class="sticker-teaser" data-action="badges" aria-label="打開怪獸貼紙簿"><span>📒</span><b>我的怪獸貼紙簿</b><small>${state.collection.length} / ${MONSTERS.length} 位冒險夥伴</small></button></section>`;}
function newQuest(){return {stage:0,route:QUEST_PLACES.map(p=>shuffle(p.pool)[0])};}
function startQuest(useTeam=false){
 const selection=useTeam&&state.game?.type==='selection'?state.game:null;
 const coop=selection?selection.coop:state.player==='together';
 const heroes=selection?selection.selected.map(i=>HEROES[i]):state.team.map(id=>HEROES.find(h=>h.id===id));
 const forms=selection?selection.forms:heroes.map(h=>heroForms(h)[0]?.id||null);
 state.team=heroes.map(h=>h.id);save();leave();state.page='home';updateChrome();state.game={type:'quest-map',coop,heroes,forms,quest:newQuest()};
 renderQuestMap();main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
}
function questSteps(q){return `<ol class="quest-route" aria-label="救援旅程">${QUEST_PLACES.map((p,i)=>`<li class="${i<q.stage?'done':i===q.stage?'current':''}"><span>${i<q.stage?'✓':p.emoji}</span><b>${p.name}</b><small>${i<q.stage?'完成啦！':i===q.stage?'這一站出發':'下一站'}</small></li>`).join('')}</ol>`;}
function renderQuestMap(){
 const g=state.game;if(g?.type!=='quest-map')return;
 main.innerHTML=screenHead('星星救援隊，集合！','先找朋友，再追蹤腳印，最後破解宇宙分身。','三站小旅程')+`<section class="panel center quest-map"><div class="quest-map-art" aria-hidden="true">🌳 ✨ 🌊 ✨ 🪐</div>${questSteps(g.quest)}<div class="quest-team">${g.heroes.slice(0,g.coop?2:1).map(h=>`<div>${heroImage(h)}<b>${h.short}</b></div>`).join('')}</div><p>這次的救援夥伴是 <b>${MONSTERS.find(m=>m.id===g.quest.route[0]).name}</b>！<br>不用比快，準備好了就一起出發。</p><button class="primary" data-action="quest-transform">✦ 我的英雄，準備變身！</button><button class="secondary" data-action="start" data-game="${g.coop?'coop':'battle'}">換一組英雄</button></section>`;
 playCue('rescue');
}
function questTransform(){
 const g=state.game;if(g?.type!=='quest-map')return;
 state.game={...g,type:'transform',monsterId:g.quest.route[0],ready:[false,false],busy:false};renderTransform();
}
function questEnvironment(g){if(!g.quest)return '';const p=QUEST_PLACES[g.quest.stage];return `<div class="quest-scenery ${p.id}" aria-hidden="true">${p.id==='forest'?'<span>🌳</span><span>🌿</span><span>🌳</span>':p.id==='coast'?'<span>🌊</span><span>🐚</span><span>🌊</span>':'<span>🪐</span><span>✧</span><span>🌙</span>'}</div>`;}
function questObjective(g){if(!g.quest)return '';const p=QUEST_PLACES[g.quest.stage];return `<section class="quest-objective"><span>${p.emoji}</span><div><b>第 ${g.quest.stage+1} 站：${p.name}</b><p>${p.copy}</p><strong id="quest-task-status" role="status">${'☆ '.repeat(3)} 0 / 3</strong></div></section>`;}
function renderQuestTargets(){
 const g=state.game;if(g?.type!=='battle'||!g.quest||g.questFound>=3)return;
 $('.quest-targets')?.remove();const p=QUEST_PLACES[g.quest.stage];const targets=document.createElement('div');targets.className='quest-targets '+p.task;
 g.questTarget=Math.floor(Math.random()*3);
 targets.innerHTML=Array.from({length:3},(_,i)=>`<button data-action="quest-target" data-index="${i}" aria-label="${p.task==='collect'?'收集第 '+(i+1)+' 顆光之星':i===g.questTarget?'找到了！正確的線索':'再觀察這個線索'}" ${p.task==='collect'&&g.questPicked.includes(i)?'disabled':''}>${p.task==='clone'?monster('clone-thumb',g.monster):''}<span>${p.task==='collect'?g.questPicked.includes(i)?'✓':'🌟':i===g.questTarget?p.task==='track'?'🐾 ★':'🌟':p.task==='track'?'🪨':'?'}</span></button>`).join('');$('#arena').append(targets);
}
function questTarget(i){
 const g=state.game;if(g?.type!=='battle'||!g.quest||g.paused||g.firing||g.finished||g.questFound>=3||i<0||i>2)return;
 const p=QUEST_PLACES[g.quest.stage];
 if(p.task==='collect'&&g.questPicked.includes(i))return;
 if(p.task!=='collect'&&i!==g.questTarget){$('#battle-message').textContent='再看看星星或腳印的提示！慢慢找，沒關係。';tone('try');return;}
 g.questPicked.push(i);g.questFound++;
 for(let j=0;j<(g.coop?2:1);j++)g.energy[j]=Math.min(4,g.energy[j]+1);
 updateEnergy();$('#quest-task-status').textContent='★ '.repeat(g.questFound)+'☆ '.repeat(3-g.questFound)+` ${g.questFound} / 3`;
 if(g.questFound===3){$('.quest-targets')?.remove();$('#battle-message').textContent='三個線索都找到了！集滿能量，送出光之力量！';playCue('correct');}
 else{renderQuestTargets();$('#battle-message').textContent=`找到了 ${g.questFound} 個！還有 ${3-g.questFound} 個小發現！`;tone('success');}
 showBattlePop('★ 找到了！',g.coop?1:0);
}
function rememberMonster(m){if(!m||state.collection.includes(m.id))return false;state.collection.push(m.id);save();return true;}
function stickerBook(){return `<section class="sticker-book"><div class="section-title"><h2>📒 我的怪獸貼紙簿 <small>${state.collection.length} / ${MONSTERS.length} 位冒險夥伴</small></h2></div><p>完成對戰或救援，就能帶回夥伴貼紙。沒有重複抽卡，想找誰就和誰出任務！</p><div class="sticker-grid">${MONSTERS.map(m=>{const got=state.collection.includes(m.id);return `<button class="sticker ${got?'collected':''}" data-action="try-monster" data-id="${m.id}" aria-label="${m.name}，${got?'已收集':'還沒一起出任務'}">${got?monster('sticker-image',m):'<span class="sticker-mystery">?</span>'}<b>${m.name}</b><small>${got?'✓ 一起冒險過':'找牠出任務 ↗'}</small></button>`;}).join('')}</div></section>`;}
function questCheckpoint(g){
 const next={...g.quest,stage:g.quest.stage+1};
 if(next.stage>=3){state.questRuns++;save();finish(g.coop?'coop':'battle',g.coop?25:20,'三站救援，全部成功！','森林、海岸與宇宙都有你們的光！貼紙已經收進小英雄的冒險簿。');return;}
 const fresh=rememberMonster(g.monster);
 const setup={coop:g.coop,heroes:g.heroes,forms:[...g.forms],quest:next,monsterId:next.route[next.stage]};
 leave();state.game={type:'quest-checkpoint',setup};
 main.innerHTML=screenHead('這一站，任務完成！','先收好貼紙，再往下一站出發。')+`<section class="panel center checkpoint">${questSteps(next)}<div class="earned-sticker">${monster('sticker-image',g.monster)}<b>${g.monster.name}</b><small>${fresh?'✨ 新夥伴貼紙！':'💚 老朋友又見面了！'}</small></div><h2>下一站：${QUEST_PLACES[next.stage].name}</h2><p>${QUEST_PLACES[next.stage].copy}</p><button class="primary" data-action="quest-next">🚀 準備好了，繼續旅程！</button><button class="secondary" data-action="home">先休息一下</button></section>`;
 confetti();playCue('victory');main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
}
function questNext(){const g=state.game;if(g?.type!=='quest-checkpoint')return;const setup=g.setup;leave();beginBattle(setup);main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
// Every contact owns its lifetime. A second finger never replaces the first.
const heldPointers=new Map(), touchClicks=new WeakMap();
const directActions=new Set(['attack','shield','beam','cycle-form','transform','reaction-input','flight-move']);
function releaseHeld(event){
 const ids=event&&Number.isFinite(event.pointerId)?[event.pointerId]:[...heldPointers.keys()];
 for(const id of ids){const press=heldPointers.get(id);if(!press)continue;heldPointers.delete(id);if(touchClicks.has(press.button))touchClicks.set(press.button,performance.now()+1500);press.active=false;press.button.classList.remove('contact-down');try{if(press.button.hasPointerCapture?.(id))press.button.releasePointerCapture(id);}catch{}}
}
function directControl(button){const i=Number(button.dataset.index);switch(button.dataset.action){case 'attack':attack(i);break;case 'shield':shield(i);break;case 'beam':fireBeam();break;case 'cycle-form':cycleForm(i);break;case 'transform':transform(i);break;case 'reaction-input':reactionInput(i,button.dataset.kind);break;case 'flight-move':flightMove(i,Number(button.dataset.dir));break;}}
function holdAttack(event){
 const button=event.target.closest('[data-action]');if(!button||button.disabled||!directActions.has(button.dataset.action)||event.button!==0||$('#info-dialog').open)return;
 const touch=event.pointerType==='touch'||event.pointerType==='pen';
 if(!touch&&button.dataset.action!=='attack')return;
 releaseHeld(event);const press={active:true,button,index:Number(button.dataset.index),token:state.token};heldPointers.set(event.pointerId,press);button.classList.add('contact-down');
 try{button.setPointerCapture?.(event.pointerId);}catch{}
 if(touch){event.preventDefault();touchClicks.set(button,performance.now()+1500);directControl(button);}
 if(button.dataset.action!=='attack')return;
 function repeat(){const g=state.game;if(!press.active)return;if(press.token!==state.token||g?.type!=='battle'||g.paused||g.firing||g.finished){releaseHeld({pointerId:event.pointerId});return;}attack(press.index);later(repeat,190);}
 later(repeat,300);
}
function showBattlePop(text,i=0){const g=state.game;if(g?.type!=='battle')return;$('#arena').querySelector(i?'.battle-pop.second':'.battle-pop:not(.second)')?.remove();const pop=document.createElement('span');pop.className='battle-pop '+(i?'second':'');pop.textContent=text;$('#arena').append(pop);later(()=>pop.remove(),800);}

function startSelection(coop){
  state.game={type:'selection',coop,selected:[2,3],forms:['multi','zero-base'],monsterId:MONSTERS[(state.completed[coop?'coop':'battle']||0)%MONSTERS.length].id,pilot:0};
  renderSelection();
}
function renderSelection(){
  const g=state.game;if(!g||g.type!=='selection')return;
  main.innerHTML=screenHead(g.coop?'兄弟合體出任務':'變身！怪獸對戰','先選一位最喜歡的英雄，再一起把勇氣準備好。',g.coop?'雙人合作':'單人冒險')+`<section class="panel center"><h2 class="select-title">${g.coop?'哥哥和弟弟，選好你們的英雄！':'今天想變身成哪一位英雄？'}</h2><p class="select-copy">${g.coop?'兩個人都準備好，光之力量就會加倍！':'沒有倒數時間，準備好了再出發就好。'}</p>${g.coop?`<div class="player-options" style="max-width:500px;margin:22px auto 0">${['哥哥的英雄','弟弟的英雄'].map((s,i)=>`<button class="player-button ${g.pilot===i?'selected':''}" data-action="pilot" data-index="${i}"><span><b>${s}</b><small>已選擇：${HEROES[g.selected[i]].short}</small></span><span class="check-dot">✓</span></button>`).join('')}</div>`:''}${catalogueTools()}<div class="hero-select">${HEROES.map((h,i)=>`<button data-hero-card="${h.id}" class="pick-hero ${g.selected[g.pilot]===i?'selected':''}" data-action="pick-hero" data-index="${i}" aria-pressed="${g.selected[g.pilot]===i}">${heroImage(h)}${h.short}</button>`).join('')}</div>${g.coop?'<button class="secondary reaction-entry" data-action="start" data-game="reaction">⚡ 想挑戰默契？玩兄弟反應特訓 →</button>':''}${selectionExtras(g)}<div class="coop-hint">${g.coop?'<span>哥哥：<kbd>A</kbd> 攻擊 <kbd>S</kbd> 護盾</span><span>弟弟：<kbd>L</kbd> 攻擊 <kbd>K</kbd> 護盾</span>':'<span><kbd>A</kbd> / <kbd>←</kbd> 攻擊 <kbd>S</kbd> / <kbd>↓</kbd> 護盾</span>'}<span><kbd>空白鍵</kbd> ${g.coop?'合體':'必殺'}光線</span></div><p class="select-copy">也可以點畫面上的大按鈕，不用鍵盤也能玩。</p><button class="primary" data-action="prepare-transform">${icon('sparkle')} 英雄選好了，準備變身！ ${icon('arrow')}</button><button class="secondary quest-team-button" data-action="quest-with-team">🌍 用這組英雄玩三站救援！</button></section>`;
  restoreHeroTools();
}
function prepareTransform(){
  const old=state.game;if(!old||old.type!=='selection')return;
  state.team=old.selected.map(i=>HEROES[i].id);save();
  state.game={type:'transform',coop:old.coop,heroes:old.selected.map(i=>HEROES[i]),forms:old.forms,monsterId:old.monsterId,moveId:old.moveId,quest:old.quest,ready:[false,false],busy:false};renderTransform();
}
function renderTransform(){
  const g=state.game;if(!g||g.type!=='transform')return;
  main.innerHTML=screenHead('把勇氣，變成光！','拿出你的想像力變身器，一起喊出英雄的名字。')+`<section class="transform-panel center"><span class="pill">✦ 光之力量・準備啟動</span><div style="display:flex;justify-content:center;gap:25px;max-width:100%">${g.heroes.slice(0,g.coop?2:1).map((h,i)=>`<div style="min-width:0">${devicePicture(h)}<p>${g.coop?['哥哥','弟弟'][i]+'的':''}${h.device}</p><button class="primary" data-action="transform" data-index="${i}" ${g.ready[i]?'disabled':''}>${g.ready[i]?'✓ 準備好了':`變身！${h.short}！`}${g.coop?` ${i===0?'A':'L'}`:''}</button></div>`).join('')}</div><h2>${g.coop?'一起變身，一起守護！':'你的光，準備好了嗎？'}</h2><p>${g.coop?'兩人各按一下變身按鈕，或按 A 與 L。':'按變身按鈕，或按 A／空白鍵出發！'}</p></section>`;
  window.scrollTo({top:0,behavior:'instant'});speak(g.coop?'哥哥和弟弟，一起按下變身按鈕吧！':`準備好了嗎？一起變身成${g.heroes[0].short}！`);
}
function transform(index){
  const g=state.game;if(!g||g.type!=='transform'||g.busy||index>=(g.coop?2:1)||g.ready[index])return;
  g.ready[index]=true;tone('transform');
  if(!g.ready[0]||(g.coop&&!g.ready[1])){renderTransform();return;}
  g.busy=true;$('.transform-panel').classList.add('is-transforming');
  $('.transform-panel').innerHTML=`<span class="pill">✦ 變身成功</span><div style="display:flex;gap:15px">${g.heroes.slice(0,g.coop?2:1).map(h=>heroImage(h)).join('')}</div><h2>${g.coop?'兄弟的光，一起出發！':`${g.heroes[0].short}，登場！`}</h2><p>勇氣已充滿，準備守護地球！</p>`;
  playCue('transform');
  later(()=>beginBattle(g),1250);
}
function beginBattle(setup){
  document.body.classList.add('playing-battle');
  state.game={type:'battle',coop:setup.coop,heroes:setup.heroes,forms:setup.forms||[],monster:MONSTERS.find(m=>m.id===setup.monsterId)||MONSTERS[0],moveId:setup.moveId||null,quest:setup.quest||null,questFound:0,questPicked:[],helpGiven:[false,false],hp:100,round:(state.completed[setup.coop?'coop':'battle']||0)%3,energy:[0,0],last:[-Infinity,-Infinity],shieldUntil:[0,0],paused:false,warning:false,warnElapsed:0,nextWarning:6500,warningLimit:state.player==='big'?3500:6000,lastTick:performance.now(),elapsed:0,finished:false,firing:false,beamRemaining:0};
  renderBattle();if(state.game.quest){state.game.nextWarning=Infinity;renderQuestTargets();}if(document.hidden)pauseBattle(true);battleTick();
}
function renderBattle(){
  const g=state.game;if(!g||g.type!=='battle')return;
  main.innerHTML=screenHead(g.monster.friendly?'好朋友救援隊':g.coop?'兄弟合體出任務':'地球守護大作戰',g.monster.friendly?'把愛心送給夥伴，集滿能量，一起點亮友善之光！':g.coop?'哥哥和弟弟各自集滿能量，再按空白鍵發射合體光線！':'攻擊集氣、護盾守護，能量滿了就能發射必殺光線！')+`<section class="panel"><div style="display:flex;align-items:center;gap:10px"><span class="pill">✦ ${g.round+1} 號訓練場 · ${g.monster.friendly?'友善救援':g.coop?'最佳拍檔':'勇氣練習'}</span><button class="pause-button" data-action="pause">Ⅱ 暫停</button></div><div class="battle-board"><div class="battle-stage">${questObjective(g)}<div class="arena ${g.quest?'quest-arena '+QUEST_PLACES[g.quest.stage].id:''}" id="arena"><span class="arena-status">☀ 城市安全・英雄就位</span><div class="monster-label">${g.monster.name} · ${g.monster.friendly?'友善救援':g.monster.tag+'挑戰'}<div class="hp-bar" role="progressbar" aria-label="${g.monster.friendly?'還需要的幫助':'怪獸能量'}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${g.hp}"><i id="enemy-hp" style="width:${g.hp}%"></i></div></div>${city()}${questEnvironment(g)}${heroImage(g.heroes[0],'arena-hero',false)}${g.coop?heroImage(g.heroes[1],'arena-hero hero-two',false):''}<span class="arena-vs">${g.monster.friendly?'♥':'VS'}</span>${monster('arena-monster',g.monster)}</div></div><div class="battle-actions"><div class="battle-message" id="battle-message" role="status" aria-live="polite">${g.coop?'一人一份能量，準備一起發光！':g.monster.friendly?'把愛心送給好朋友！每次幫忙都能集氣。':'勇敢出擊！每次攻擊都會累積能量。'}</div><div class="battle-dock"><div class="battle-controls">${Array.from({length:g.coop?2:1},(_,i)=>`<div class="pilot-controls"><strong>${g.coop?['哥哥','弟弟'][i]+'・':''}${g.heroes[i].short}<small class="current-form" id="form-label-${i}">${activeForm(g,i)?.name||'基本型態'}</small></strong><div class="energy-cells" id="energy-${i}" aria-label="能量 0 / 4">${'<span></span>'.repeat(4)}</div><button class="attack-button" data-action="attack" data-index="${i}">${g.monster.id==='pucchi'?'🍩 送點心':g.monster.id==='kanegon'?'🪙 送硬幣':g.monster.friendly?'♥ 幫助牠':'✦ 攻擊'} <kbd>${i?'L':'A'}</kbd></button><button class="shield-button" data-action="shield" data-index="${i}">◇ 護盾 <kbd>${i?'K':'S'}</kbd></button><button class="form-button" data-action="cycle-form" data-index="${i}">🌈 換型態 <kbd>${i?'J':'D'}</kbd></button></div>`).join('')}</div><button class="primary combo-button" id="combo-button" data-action="beam" disabled>⚡ ${g.monster.friendly?'友善之光':g.coop?'兄弟合體光線':'必殺光線'} <kbd>空白鍵</kbd></button></div>${battleMoves(g)}<p class="memory-caption">長按攻擊也能集氣。${g.monster.friendly?'集滿 4 格愛心，送出友善之光！大家互相幫忙。':g.coop?'兩位英雄的能量都滿 4 格，合體光線就準備好了。':'集滿 4 格能量，發射光線！護盾可以擋住怪獸的能量波。'}</p></div></div></section>`;
  window.scrollTo({top:0,behavior:'instant'});updateEnergy();applyBattleForms();if(!state.cue||state.cue.paused)playCue(g.monster.friendly?'rescue':'ready');
}
function battleTick(){
  const g=state.game;if(!g||g.type!=='battle'||g.finished)return;
  const now=performance.now(),dt=Math.min(now-g.lastTick,200);g.lastTick=now;
  if(!g.paused&&g.firing){g.beamRemaining-=dt;if(g.beamRemaining<=0){resolveBeam();if(state.game!==g)return;}}
  if(!g.paused&&!g.firing){
    g.elapsed+=dt;
    if(!g.warning&&g.elapsed>=g.nextWarning){g.warning=true;g.warnElapsed=0;beginChallenge(g);}
    if(g.warning){g.warnElapsed+=dt;if(g.warnElapsed>=g.warningLimit){const protectedAll=g.challengeSolved||(g.shieldUntil[0]>now&&(!g.coop||g.shieldUntil[1]>now));$('.challenge-targets')?.remove();$('#battle-message').textContent=protectedAll?'挑戰成功！你們合作得很好！':'光之國一起來幫忙！下次再試試，大家都平安。';$('.arena-status').textContent='☀ 城市安全・繼續加油';g.warning=false;g.nextWarning=g.elapsed+8500;if(protectedAll&&!g.challengeSolved){g.energy[0]=Math.min(4,g.energy[0]+1);if(g.coop)g.energy[1]=Math.min(4,g.energy[1]+1);updateEnergy();tone('success');}}}
  }
  later(battleTick,100);
}
function updateEnergy(){
  const g=state.game;if(!g||g.type!=='battle')return;
  g.energy.slice(0,g.coop?2:1).forEach((n,i)=>{const el=$(`#energy-${i}`);if(!el)return;el.setAttribute('aria-label',`能量 ${n} / 4`);el.innerHTML=Array.from({length:4},(_,j)=>`<span class="${j<n?'full':''}"></span>`).join('');});
  const ready=g.energy[0]>=4&&(!g.coop||g.energy[1]>=4);$('#arena')?.classList.toggle('energy-ready',ready);const taskReady=!g.quest||g.questFound>=3;$('#combo-button').disabled=!ready||g.paused||g.firing||!taskReady;
  $$('[data-action="attack"],[data-action="shield"],[data-action="cycle-form"],[data-action="pick-move"],[data-action="quest-target"]').forEach(el=>el.disabled=g.paused||g.firing||(el.dataset.action==='quest-target'&&g.quest&&QUEST_PLACES[g.quest.stage].task==='collect'&&g.questPicked.includes(Number(el.dataset.index))));
  if(g.quest&&g.questFound<3)$('#combo-button').textContent=`🌟 先找到 ${3-g.questFound} 個線索，再送出光！`;else $('#combo-button').innerHTML=`⚡ ${g.monster.friendly?'友善之光':g.coop?'兄弟合體光線':'必殺光線'} <kbd>空白鍵</kbd>`;
  if(ready&&taskReady&&!g.warning&&!g.firing)$('#battle-message').textContent=g.coop?'兩份勇氣都充滿了！按空白鍵，一起發射！':'能量充滿！按空白鍵發射必殺光線！';
}
function updateHp(){const g=state.game;$('#enemy-hp').style.width=`${g.hp}%`;$('.hp-bar').setAttribute('aria-valuenow',g.hp);}
function attack(i){
  const g=state.game;if(!g||g.type!=='battle'||g.paused||g.finished||g.firing||i>=(g.coop?2:1))return;
  const now=performance.now();if(now-g.last[i]<(activeForm(g,i)?.role==='speed'?140:180))return;g.last[i]=now;
  if(g.warning&&!g.challengeSolved&&['armor','flight'].includes(g.monster.pattern)&&activeForm(g,i)?.role===(g.monster.pattern==='armor'?'power':'speed')){g.challengeSolved=true;g.energy[i]=Math.min(4,g.energy[i]+1);$('#battle-message').textContent='型態用對了！多送一格能量！';}
  if(g.coop&&g.energy[i]===4&&g.energy[1-i]<4&&!g.helpGiven[i]){g.helpGiven[i]=true;g.energy[1-i]++;updateEnergy();showBattlePop('🤝 送你一格！',1-i);$('#battle-message').textContent=`${i?'弟弟':'哥哥'}把一格能量送給夥伴！`;tone('success');return;}
  g.energy[i]=Math.min(4,g.energy[i]+1);showBattlePop(g.monster.friendly?'♥ +1 愛心':'✦ +1 能量',i);g.hp=Math.max(1,g.hp-(activeForm(g,i)?.role==='power'?3:2));updateEnergy();updateHp();tone('attack');
  const actor=$$('.arena-hero')[i];actor.classList.remove('punch');void actor.offsetWidth;actor.classList.add('punch');$('.arena-monster').classList.remove('hit');void $('.arena-monster').offsetWidth;$('.arena-monster').classList.add('hit');
  if(g.energy[i]===4&&!g.warning&&!(g.energy[0]>=4&&(!g.coop||g.energy[1]>=4)))$('#battle-message').textContent=`${i?'弟弟':'哥哥'}的能量滿了！幫另一位英雄加油吧！`;
}
function shield(i){
  const g=state.game;if(!g||g.type!=='battle'||g.paused||g.finished||g.firing||i>=(g.coop?2:1))return;
  const now=performance.now();if(g.shieldUntil[i]>now+g.warningLimit-300)return;
  g.shieldUntil[i]=now+g.warningLimit+(activeForm(g,i)?.role==='guard'?5000:2000);
  const el=document.createElement('div');el.className=`shield-bubble ${i?'second':''}`;$('#arena').append(el);later(()=>el.remove(),1000);tone('shield');
  $('#battle-message').textContent=g.coop?`${i?'弟弟':'哥哥'}的護盾開啟！我們互相保護。`:'光之護盾開啟！你正在保護城市。';
}
function fireBeam(){
  const g=state.game;if(!g||g.type!=='battle'||(g.quest&&g.questFound<3)||g.paused||g.finished||g.firing||g.energy[0]<4||(g.coop&&g.energy[1]<4))return;
  releaseHeld();g.firing=true;g.beamRemaining=900;g.energy=[0,0];g.hp=Math.max(0,g.hp-(g.monster.friendly&&activeForm(g,0)?.role==='calm'?64:52));updateEnergy();updateHp();
  $$('.battle-pop').forEach(el=>el.remove());$('#arena').classList.add('is-firing');const move=chosenMove(g);const el=document.createElement('div');el.className='beam '+(g.monster.friendly?'calm':move.kind);$('#arena').append(el);const label=document.createElement('strong');label.className='beam-announcement';label.textContent=g.monster.friendly?'♥ 友善之光！':g.coop?'兄弟合體！':move.name+'！';$('#arena').append(label);tone('beam');
  $('#battle-message').textContent=g.monster.friendly?'送出友善的光！夥伴越來越安心了！':`${g.coop?'兄弟合體！':''}${move.name}！`;playCue(g.monster.friendly?'kindness':'beam');
}
function resolveBeam(){
  const g=state.game;if(!g||g.type!=='battle')return;
  $('.beam')?.remove();$('.beam-announcement')?.remove();$('#arena')?.classList.remove('is-firing');g.firing=false;
  if(g.hp<=0){g.finished=true;if(g.quest){questCheckpoint(g);return;}if(g.monster.friendly){finish(g.coop?'coop':'battle',g.coop?15:10,'好朋友救援成功！',`你們幫助了${g.monster.name}，大家一起成為好朋友！`);return;}finish(g.coop?'coop':'battle',g.coop?15:10,g.coop?'兄弟齊心，地球平安！':'勇敢的小英雄，任務成功！',g.coop?'哥哥和弟弟互相幫忙，用合作的光守護了城市。':'你的勇氣充滿光之力量，城市裡的大家都在為你歡呼！');}
  else{updateEnergy();$('#battle-message').textContent=g.monster.friendly?'好朋友收到你的心意了！再一起幫忙一次吧！':'怪獸的能量變少了！再一起集氣一次吧！';}
}
function pauseBattle(value){
  const g=state.game;if(!g||g.type!=='battle'||g.finished)return;
  const shouldPause=value===undefined?!g.paused:value;if(g.paused===shouldPause)return;g.paused=shouldPause;if(g.paused)releaseHeld();$('#arena').classList.toggle('is-paused',g.paused);
  if(g.paused){g.pauseAt=performance.now();stopVoice();const el=document.createElement('div');el.className='battle-paused';el.innerHTML='<strong>小英雄休息一下</strong><span>準備好了，我們再繼續。</span><button class="primary" data-action="pause">▶ 繼續冒險</button>';$('#arena').append(el);}
  else{const delta=performance.now()-g.pauseAt;g.shieldUntil=g.shieldUntil.map(t=>t? t+delta:0);$('.battle-paused')?.remove();g.lastTick=performance.now();}
  const button=$('.pause-button');button.textContent=g.paused?'▶ 繼續':'Ⅱ 暫停';updateEnergy();
}
const REACTION_LEVELS=[
 {name:'暖身隊',rounds:8,windows:[2800,3800],copy:'看圖反應與輪流接力，先熟悉按鈕。'},
 {name:'勇氣隊',rounds:10,windows:[1800,2800],copy:'加入假訊號！雲朵時先等等，星光亮起才出手。'},
 {name:'超能隊',rounds:12,windows:[1300,2200],copy:'假訊號加記憶接力，記住四個動作的順序！'}
];
function reactionSetup(level=1){
 leave();state.page='home';state.game={type:'reaction-setup',level};updateChrome();
 main.innerHTML=screenHead('兄弟反應特訓','看訊號、選動作、互相接力！','全新合作挑戰')+`<section class="panel reaction-setup center"><div class="reaction-team">${state.team.map(id=>heroImage(HEROES.find(h=>h.id===id))).join('')}<span>⚡</span></div><h2>這次，挑戰你們的默契！</h2><p>⚡ 星光 → 發光　🛡 護盾 → 守護<br>☁ 雲朵 → 先等等，別被假訊號騙了！</p><div class="reaction-levels">${REACTION_LEVELS.map((l,i)=>`<button class="${i===level?'selected':''}" data-action="reaction-level" data-index="${i}" aria-pressed="${i===level}"><b>${['🌱','🚀','🌌'][i]} ${l.name} · ${l.rounds} 回合</b><span>${l.copy}</span></button>`).join('')}</div><p>哥哥：A 發光／S 守護　弟弟：L 發光／K 守護<br>反應快可收集節奏星；慢一點也能完成，答錯就再試！</p><button class="primary" data-action="reaction-begin">✦ 雙人特訓，開始！</button></section>`;
 window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});
}
function reactionBegin(){
 const setup=state.game;if(setup?.type!=='reaction-setup')return;const level=setup.level;
 leave();state.game={type:'reaction',level,round:0,clock:0,lastTick:performance.now(),paused:false,phase:'',phaseLeft:0,streak:0,best:0,quick:0,samples:[[],[]]};
 main.innerHTML=screenHead('兄弟反應特訓','⚡ 發光　🛡 守護　☁ 先等等',REACTION_LEVELS[level].name)+`<section class="reaction-board"><div class="reaction-hud"><strong id="reaction-progress"></strong><span id="reaction-stars">★ 節奏星 0</span><button class="secondary" data-action="reaction-pause">Ⅱ 暫停</button></div><div class="reaction-stage" id="reaction-stage"><div class="reaction-scene" aria-hidden="true">${state.team.map(id=>heroImage(HEROES.find(h=>h.id===id))).join('')}<span>✦</span></div><h2 id="reaction-rule"></h2><div id="reaction-signals" class="reaction-signals"></div><p id="reaction-message" role="status"></p><div class="reaction-pause" hidden><strong>休息一下，默契不會跑掉！</strong><button class="primary" data-action="reaction-pause">▶ 繼續特訓</button></div></div><div class="reaction-controls">${['哥哥','弟弟'].map((n,i)=>`<section><h3>${n}的操作</h3><button data-action="reaction-input" data-index="${i}" data-kind="light"><small>${n}</small>⚡ 發光 <kbd>${i?'L':'A'}</kbd></button><button data-action="reaction-input" data-index="${i}" data-kind="shield"><small>${n}</small>🛡 守護 <kbd>${i?'K':'S'}</kbd></button><p id="reaction-pilot-${i}">準備好了！</p></section>`).join('')}</div><p class="reaction-note">看清楚再按，不用一直連打。暫停可休息，慢慢完成也有冒險星星！</p></section>`;
 reactionRound();tone('flip');reactionTick();window.scrollTo({top:0,behavior:'instant'});main.focus({preventScroll:true});
}
function reactionRound(){
 const g=state.game;if(g?.type!=='reaction')return;
 if(g.round>=REACTION_LEVELS[g.level].rounds){
  const stats=g.samples.map((s,i)=>`${i?'弟弟':'哥哥'}平均 ${Math.round(s.reduce((a,b)=>a+b,0)/(s.length||1))}ms`);const level=g.level;
  finish('reaction',g.round+g.quick,'默契升級！兄弟特訓完成！',`${g.round} 回合成功，收集 ${g.quick} 顆節奏星！最佳連續合作 ${g.best} 回合。<br>${stats.join(' · ')}<br>這是自己的練習紀錄，不用和別人比快。`);
  state.game.reactionLevel=level;return;
 }
 const kinds=g.level===0?['parallel','relay']:g.level===1?['parallel','relay','lure']:['parallel','relay','lure','memory'];
 g.kind=kinds[g.round%kinds.length];const first=Math.random()<.5?0:1,actions=[Math.random()<.5?'light':'shield',Math.random()<.5?'light':'shield'];
 g.steps=[{pilot:first,action:actions[first]},{pilot:1-first,action:actions[1-first]}];
 if(g.kind==='parallel'||g.kind==='lure')g.steps.sort((a,b)=>a.pilot-b.pilot);
 if(g.kind==='memory')g.steps.push({pilot:first,action:actions[first]==='light'?'shield':'light'},{pilot:1-first,action:actions[1-first]==='light'?'shield':'light'});
 g.done=[];g.errors=0;g.early=false;g.roundQuick=true;g.phase='preview';g.phaseLeft=g.kind==='memory'?2600:900;g.turnStart=g.clock;
 $('#reaction-stage').classList.remove('reaction-win');$('#reaction-progress').textContent=`第 ${g.round+1} / ${REACTION_LEVELS[g.level].rounds} 回合`;
 $('#reaction-rule').textContent={parallel:'雙人出擊！各自看訊號',relay:'輪流接力！按照左到右的順序',lure:'真假星光！雲朵時先等等',memory:'記憶接力！先記住四個動作'}[g.kind];
 $('#reaction-message').textContent=g.kind==='memory'?'先記住順序，訊號藏起來後再接力！':'準備觀察，訊號還沒亮起！';reactionSignals();
 for(let i=0;i<2;i++)$(`#reaction-pilot-${i}`).textContent='準備觀察';
}
function reactionSignals(){
 const g=state.game;if(g?.type!=='reaction')return;const concealed=g.kind==='memory'&&g.phase==='live';
 $('#reaction-signals').innerHTML=g.steps.map((s,i)=>`<div class="reaction-signal ${g.done.includes(i)?'done':''} ${g.phase==='live'&&!g.done.includes(i)&&(g.kind==='parallel'||g.kind==='lure'||i===g.done.length)?'active':''}"><b>${g.kind==='parallel'||g.kind==='lure'?'':(i+1)+'. '}${s.pilot?'弟弟':'哥哥'}</b><span>${g.done.includes(i)?'✓':g.phase==='lure'?'☁':concealed?'?':g.phase==='preview'&&g.kind!=='memory'?'✧':s.action==='light'?'⚡':'🛡'}</span><small>${g.done.includes(i)?'完成！':g.phase==='lure'?'先等等':concealed?'想想剛才的動作':g.phase==='preview'&&g.kind!=='memory'?'準備':s.action==='light'?'發光':'守護'}</small></div>`).join('');
}
function reactionLive(){const g=state.game;g.phase='live';g.turnStart=g.clock;$('#reaction-message').textContent=g.kind==='memory'?'訊號藏起來了！按剛才的順序接力！':g.kind==='relay'?`${g.steps[0].pilot?'弟弟':'哥哥'}先出手，另一位等接力！`:'真正的訊號亮起！兩人各自出手！';reactionSignals();tone('signal');}
function reactionTick(){
 const g=state.game;if(g?.type!=='reaction')return;const now=performance.now(),dt=Math.min(200,Math.max(0,now-g.lastTick));g.lastTick=now;
 if(!g.paused){g.clock+=dt;if(g.phase!=='live'){
  g.phaseLeft-=dt;if(g.phaseLeft<=0){
   if(g.phase==='preview'){if(g.kind==='lure'){g.phase='lure';g.phaseLeft=900+Math.random()*900;$('#reaction-message').textContent='☁ 這是假訊號！先等等，別按喔！';reactionSignals();}else reactionLive();}
   else if(g.phase==='lure')reactionLive();else if(g.phase==='reward'){g.round++;reactionRound();}
  }
 }}
 if(state.game===g)later(reactionTick,50);
}
function reactionInput(pilot,action){
 const g=state.game;if(g?.type!=='reaction'||g.paused||![0,1].includes(pilot)||!['light','shield'].includes(action))return;
 if(g.phase==='lure'){if(!g.early){g.early=true;g.errors++;g.streak=0;$('#reaction-message').textContent='被雲朵騙到啦！先停手，等真正的星光。';tone('try');}return;}
 if(g.phase!=='live')return;
 const parallel=g.kind==='parallel'||g.kind==='lure';const index=parallel?g.steps.findIndex((s,i)=>s.pilot===pilot&&!g.done.includes(i)):g.done.length;
 if(index<0)return;const target=g.steps[index];
 if(target.pilot!==pilot||target.action!==action){g.errors++;g.streak=0;g.roundQuick=false;$('#reaction-message').textContent=target.pilot!==pilot?'還沒輪到你！等夥伴完成再接力。':'動作不一樣喔！再看一次訊號，試試看。';tone('try');if(g.kind==='memory'){g.done=[];g.phase='preview';g.phaseLeft=2600;reactionSignals();}return;}
 const elapsed=Math.max(0,g.clock-g.turnStart);g.samples[pilot].push(elapsed);if(elapsed>REACTION_LEVELS[g.level].windows[pilot])g.roundQuick=false;
 g.done.push(index);$(`#reaction-pilot-${pilot}`).textContent=`✓ ${elapsed}ms · ${g.done.length===g.steps.length?'合作成功！':'好棒！'}`;tone('attack');
 if(!parallel)g.turnStart=g.clock;reactionSignals();
 if(g.done.length===g.steps.length){g.phase='reward';g.phaseLeft=700;g.streak=g.errors?0:g.streak+1;g.best=Math.max(g.best,g.streak);const fast=g.roundQuick&&!g.errors;if(fast)g.quick++;$('#reaction-stars').textContent=`★ 節奏星 ${g.quick} · 連續合作 ${g.streak}`;$('#reaction-message').textContent=fast?'漂亮！兩份力量都接上了，節奏星 +1！':'合作完成！慢慢觀察也能成功！';$('#reaction-stage').classList.add('reaction-win');tone('success');}
 else if(!parallel)$('#reaction-message').textContent=`接力！換${g.steps[g.done.length].pilot?'弟弟':'哥哥'}出手。`;
}
function reactionPause(force){
 const g=state.game;if(g?.type!=='reaction')return;g.paused=force===undefined?!g.paused:force;g.lastTick=performance.now();if(g.paused)stopVoice();$('#reaction-stage').classList.toggle('is-paused',g.paused);$('.reaction-pause').hidden=!g.paused;
 $$('[data-action="reaction-input"]').forEach(b=>b.disabled=g.paused);$('.reaction-hud [data-action="reaction-pause"]').textContent=g.paused?'▶ 繼續':'Ⅱ 暫停';
}

const FLIGHT_LEVELS=[{name:'小小駕駛',ms:3200},{name:'勇敢飛行',ms:2400},{name:'王牌機師',ms:1700}];
function flightSetup(level=state.player==='big'?1:0){
 if(!FLIGHT_LEVELS[level])return;state.game={type:'flight-setup',level};
 main.innerHTML=screenHead('雙人星際飛行','一人一艘飛船，各有自己的三條航道。','街機合作')+`<section class="panel center"><div class="arcade-card-art">🚀 ✦ 🚀</div><h2>看準星光，閃開隕石！</h2><p>✦ 收星光加分　☄ 隕石會被護盾擋住<br>兩人都收星光，就能累積合作連擊！<br>每趟 12 波；碰到隕石也能繼續冒險。</p><div class="reaction-levels">${FLIGHT_LEVELS.map((x,i)=>`<button data-action="flight-level" data-index="${i}" class="${i===level?'selected':''}" aria-pressed="${i===level}"><b>${x.name}</b><span>每波 ${(x.ms/1000).toFixed(1)} 秒</span></button>`).join('')}</div><p>哥哥 A／D 向左／右　弟弟 J／L 向左／右<br>平板直接按各自的大按鈕，雙手可以同時操作。</p><button class="primary" data-action="flight-begin">🚀 出發，守護星空！</button></section>`;
}
function flightBegin(level){
 if(!FLIGHT_LEVELS[level])return;
 state.game={type:'flight',level,lanes:[1,1],wave:0,score:[0,0],bumps:[0,0],combo:0,best:0,paused:false,last:performance.now(),elapsed:0,resolved:false};
 main.innerHTML=screenHead('雙人星際飛行','✦ 星光要接住　☄ 隕石要閃開',FLIGHT_LEVELS[level].name)+`<section class="flight-board"><div class="reaction-hud"><strong id="flight-progress"></strong><span id="flight-score"></span><button class="secondary" data-action="arcade-pause">Ⅱ 暫停</button></div><div class="flight-stage" id="flight-stage"><div class="flight-tracks">${['哥哥','弟弟'].map((n,i)=>`<section class="flight-track"><b>${n}的航道</b><div class="flight-lanes">${[0,1,2].map(j=>`<div class="flight-lane"><span class="flight-object" id="flight-object-${i}-${j}"></span></div>`).join('')}</div><div class="flight-ship" id="flight-ship-${i}">${heroImage(HEROES.find(h=>h.id===state.team[i]),'',false)}<span>🚀</span></div></section>`).join('')}</div><p id="flight-message" role="status">準備出發！</p><div class="reaction-pause" hidden><strong>飛船停好了，休息一下！</strong><button class="primary" data-action="arcade-pause">▶ 繼續飛行</button></div></div><div class="flight-controls">${['哥哥','弟弟'].map((n,i)=>`<section><h3>${n}駕駛台</h3><div>${[-1,1].map(d=>`<button data-action="flight-move" data-index="${i}" data-dir="${d}" aria-label="${n}向${d<0?'左':'右'}">${d<0?'◀':'▶'} <kbd>${i?(d<0?'J':'L'):(d<0?'A':'D')}</kbd></button>`).join('')}</div></section>`).join('')}</div><p class="reaction-note">在物件抵達飛船前換航道。星光在閃亮的航道；兩人同時接住可連擊！</p></section>`;
 flightWave();flightTick();
}
function flightWave(){const g=state.game;if(g?.type!=='flight')return;g.wave++;g.elapsed=0;g.resolved=false;g.targets=[Math.floor(Math.random()*3),Math.floor(Math.random()*3)];
 for(let i=0;i<2;i++)for(let j=0;j<3;j++){const e=$(`#flight-object-${i}-${j}`);e.textContent=j===g.targets[i]?'✦':'☄';e.className='flight-object '+(j===g.targets[i]?'star':'rock');}
 $('#flight-progress').textContent=`第 ${g.wave} / 12 波`;$('#flight-message').textContent=g.wave===1?'先看星光在哪一條！':'下一波來了，準備換航道！';flightPaint();}
function flightPaint(){const g=state.game;if(g?.type!=='flight')return;g.lanes.forEach((lane,i)=>{$(`#flight-ship-${i}`).style.left=`${(lane+.5)*100/3}%`;});$('#flight-score').textContent=`✦ ${g.score[0]+g.score[1]}　合作連擊 ${g.combo}`;}
function flightMove(i,dir){const g=state.game;if(g?.type!=='flight'||g.paused||g.resolved||![0,1].includes(i)||![-1,1].includes(dir))return;const next=Math.max(0,Math.min(2,g.lanes[i]+dir));if(next===g.lanes[i])return;g.lanes[i]=next;flightPaint();tone('flip');}
function flightTick(){const g=state.game;if(g?.type!=='flight')return;const now=performance.now(),dt=Math.min(100,now-g.last);g.last=now;if(!g.paused){g.elapsed+=dt;const ms=FLIGHT_LEVELS[g.level].ms;$('#flight-stage').style.setProperty('--fall',Math.min(1,g.elapsed/ms));
 if(g.elapsed>=ms&&!g.resolved){g.resolved=true;const hits=g.lanes.map((lane,i)=>lane===g.targets[i]);hits.forEach((hit,i)=>{if(hit)g.score[i]++;else g.bumps[i]++;});g.combo=hits.every(Boolean)?g.combo+1:0;g.best=Math.max(g.best,g.combo);$('#flight-message').textContent=hits.every(Boolean)?`✨ 合作成功！${g.combo} 連擊！`:hits.some(Boolean)?'接到星光了！另一艘的護盾也安全擋住隕石。':'🛡 護盾保護成功！下一波再一起接星光。';tone(hits.some(Boolean)?'success':'shield');flightPaint();}
 if(g.elapsed>=ms+850){if(g.wave===12){const level=g.level;finish('flight',12+Math.floor((g.score[0]+g.score[1])/2),'星際雙人任務完成！',`哥哥收集 ${g.score[0]} 顆、弟弟收集 ${g.score[1]} 顆星光；最佳合作連擊 ${g.best} 次！`);state.game.flightLevel=level;return;}flightWave();}}
 later(flightTick,50);}
function arcadePause(force=false){const g=state.game;if(g?.type!=='flight'||force&&g.paused)return;g.paused=force||!g.paused;releaseHeld();g.last=performance.now();$('.flight-stage .reaction-pause').hidden=!g.paused;$$('[data-action="flight-move"]').forEach(b=>b.disabled=g.paused);$('.reaction-hud [data-action="arcade-pause"]').textContent=g.paused?'▶ 繼續':'Ⅱ 暫停';if(g.paused)stopVoice();}
// Pipe masks: north=1, east=2, south=4, west=8. A monotone path guarantees a solution.
function pipeRotate(mask){return ((mask<<1)&15)|(mask>>3);}
function circuitBegin(){state.game={type:'circuit',round:0,hints:0};circuitNext();}
function circuitNext(){const g=state.game;if(g?.type!=='circuit'||g.round&&!g.solved)return;if(g.round===3){finish('circuit',15,'光能工程師，接線成功！',`你們完成三座基地的光能接線，使用 ${g.hints} 次提示。仔細觀察、一起想，就能找到路！`);return;}
 const n=state.player==='big'&&g.round>0?4:3;g.n=n;g.round++;g.solved=false;g.history=[];g.path=[0];let r=0,c=0;while(r<n-1||c<n-1){if(r===n-1||c<n-1&&Math.random()<.5)c++;else r++;g.path.push(r*n+c);}
 g.answer=Array.from({length:n*n},()=>[5,10,3,6,12,9][Math.floor(Math.random()*6)]);
 g.path.forEach((cell,k)=>{const prev=k?g.path[k-1]:-1,next=k<g.path.length-1?g.path[k+1]:n*n;const inbound=k===0?8:prev===cell-1?8:1,outbound=k===g.path.length-1?2:next===cell+1?2:4;g.answer[cell]=inbound|outbound;});
 g.tiles=g.answer.map(mask=>{for(let j=0,t=Math.floor(Math.random()*4);j<t;j++)mask=pipeRotate(mask);return mask;});if(circuitConnected(g))g.tiles[0]=pipeRotate(g.tiles[0]);g.initial=[...g.tiles];circuitRender();}
function circuitReach(g){const seen=new Set([0]),queue=g.tiles[0]&8?[0]:[];if(!queue.length)return new Set();for(let k=0;k<queue.length;k++){const cell=queue[k],r=Math.floor(cell/g.n),c=cell%g.n;for(const [bit,opp,dr,dc]of[[1,4,-1,0],[2,8,0,1],[4,1,1,0],[8,2,0,-1]]){const nr=r+dr,nc=c+dc,next=nr*g.n+nc;if(nr>=0&&nc>=0&&nr<g.n&&nc<g.n&&(g.tiles[cell]&bit)&&(g.tiles[next]&opp)&&!seen.has(next)){seen.add(next);queue.push(next);}}}return seen;}
function circuitConnected(g){return Boolean((g.tiles[g.tiles.length-1]&2)&&circuitReach(g).has(g.tiles.length-1));}
function circuitRender(){const g=state.game;if(g?.type!=='circuit')return;
 main.innerHTML=screenHead('光能接線','點一下管道，順時針轉 90 度。把 ☀ 接到 🚩！',`第 ${g.round} / 3 座基地`)+`<section class="panel center circuit-board"><p>☀ 從左上角進入，🚩 從右下角右邊出去。<br>亮起的管道代表光已經抵達，沒有時間限制。</p><div class="circuit-frame" style="--dummy:${g.n*2}"><span class="circuit-source" aria-hidden="true">☀</span><div class="circuit-grid" style="--size:${g.n}">${g.tiles.map((_,i)=>`<button data-action="circuit-turn" data-index="${i}" aria-label="第 ${Math.floor(i/g.n)+1} 列第 ${i%g.n+1} 格管道"></button>`).join('')}</div><span class="circuit-exit" aria-hidden="true">🚩</span></div><p id="circuit-message" role="status">試試轉動左上角，讓太陽的光進來！</p><div class="circuit-tools"><button class="secondary" data-action="circuit-undo">↶ 復原一步</button><button class="secondary" data-action="circuit-hint">💡 幫我轉一步</button><button class="secondary" data-action="circuit-reset">⟳ 這關重來</button></div><button class="primary" data-action="circuit-next" hidden>${g.round===3?'🏆 完成任務':'🚀 前往下一座基地'}</button></section>`;circuitPaint();}
function circuitPaint(){const g=state.game,lit=circuitReach(g);$$('[data-action="circuit-turn"]').forEach((b,i)=>{b.classList.toggle('lit',lit.has(i));b.disabled=g.solved;const mask=g.tiles[i];b.innerHTML=`<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${[[1,'M50 0V50'],[2,'M50 50H100'],[4,'M50 50V100'],[8,'M0 50H50']].filter(([bit])=>mask&bit).map(([,d])=>d).join(' ')}"/><circle cx="50" cy="50" r="9"/></svg>`;b.setAttribute('aria-label',`第 ${Math.floor(i/g.n)+1} 列第 ${i%g.n+1} 格，開口朝${[[1,'上'],[2,'右'],[4,'下'],[8,'左']].filter(([bit])=>mask&bit).map(([,n])=>n).join('、')}，${lit.has(i)?'已亮起':'未亮起'}`);});$('[data-action="circuit-undo"]').disabled=!g.history.length||g.solved;$('[data-action="circuit-hint"]').disabled=g.solved;$('[data-action="circuit-reset"]').disabled=g.solved;}
function circuitTurn(i){const g=state.game;if(g?.type!=='circuit'||g.solved||!Number.isInteger(i)||i<0||i>=g.tiles.length)return;g.history.push([...g.tiles]);g.tiles[i]=pipeRotate(g.tiles[i]);tone('flip');circuitCheck();}
function circuitCheck(){const g=state.game;if(circuitConnected(g)){g.solved=true;$('#circuit-message').textContent='✨ 光能接通了！你們找到通往基地的路！';$('[data-action="circuit-next"]').hidden=false;tone('success');}circuitPaint();}
function circuitHint(){const g=state.game;if(g?.type!=='circuit'||g.solved)return;const i=g.path.find(i=>g.tiles[i]!==g.answer[i]);if(i===undefined)return;g.hints++;circuitTurn(i);if(!g.solved)$('#circuit-message').textContent='💡 幫忙轉了一步！觀察亮起的路，再接下一格。';}
function circuitUndo(){const g=state.game;if(g?.type!=='circuit'||g.solved||!g.history.length)return;g.tiles=g.history.pop();$('#circuit-message').textContent='回到上一步，換個方向試試！';circuitPaint();}
function circuitReset(){const g=state.game;if(g?.type!=='circuit'||g.solved)return;g.tiles=[...g.initial];g.history=[];$('#circuit-message').textContent='回到這關最初的管道，慢慢觀察再出發！';circuitPaint();}

function startMemory(){
  const count=state.player==='big'?6:4,seen=new Set(),unique=shuffle(DEVICES.filter(d=>d.kind!=='武器')).map(deviceQuestion).filter(h=>{if(seen.has(h.id))return false;seen.add(h.id);return true;}),selected=shuffle(unique).slice(0,count);
  state.game={type:'memory',mode:'memory',cards:shuffle(selected.flatMap(h=>[{id:h.id,kind:'hero',hero:h},{id:h.id,kind:'device',hero:h}])),flipped:[],matched:[],locked:false,pairs:count,tries:0};
  main.innerHTML=screenHead('英雄翻翻樂','找出「英雄」和「他的變身器」，配成一對！',`${count} 組好搭檔`)+`<section class="panel center"><h2 class="question-title">誰和誰，是變身好搭檔？</h2><p class="select-copy">先翻兩張看看，不一樣也沒關係。</p><div class="memory-board">${state.game.cards.map((c,i)=>`<button class="memory-card" data-action="flip" data-index="${i}" aria-label="第 ${i+1} 張卡片，尚未翻開"><img class="card-back-icon" src="assets/emblem.svg" alt=""></button>`).join('')}</div><p class="memory-caption" id="memory-status" role="status" aria-live="polite">已找到 0 / ${count} 組好搭檔</p><button class="read-button" data-action="memory-help">${icon('sound')} 聽聽怎麼玩</button></section>`;
  speak('找找看，哪位英雄和哪個變身器是一對？點兩張卡片，翻開看看吧！');
}
function flip(index){
  const g=state.game;if(!g||g.type!=='memory'||g.locked||g.flipped.includes(index)||g.matched.includes(index)||!g.cards[index])return;
  g.flipped.push(index);const card=g.cards[index],el=$$('[data-action="flip"]')[index];el.classList.add('flipped');el.innerHTML=(card.kind==='hero'?heroImage(card.hero):devicePicture(card.hero))+`<span>${card.kind==='hero'?card.hero.short:card.hero.device}</span>`;el.setAttribute('aria-label',`${card.kind==='hero'?card.hero.short:card.hero.device}，已翻開`);tone('flip');speak(card.kind==='hero'?card.hero.short:card.hero.device);
  if(g.flipped.length<2)return;
  g.locked=true;g.tries++;const [a,b]=g.flipped;
  if(g.cards[a].id===g.cards[b].id){g.matched.push(a,b);g.flipped=[];[a,b].forEach(i=>{const e=$$('[data-action="flip"]')[i];e.classList.add('matched');e.disabled=true;});$('#memory-status').textContent=`✦ 找到好搭檔！已完成 ${g.matched.length/2} / ${g.pairs} 組`;tone('success');if(g.matched.length===g.cards.length){later(()=>finish('memory',12,'記憶小英雄，配對成功！','你把每位英雄的變身器都找回來了，觀察力真棒！'),900);}else{g.locked=false;}}
  else{$('#memory-status').textContent='還不是同一組，記住位置，再試一次！';later(()=>{[a,b].forEach(i=>{const e=$$('[data-action="flip"]')[i];e.classList.remove('flipped');e.innerHTML='<img class="card-back-icon" src="assets/emblem.svg" alt="">';e.setAttribute('aria-label',`第 ${i+1} 張卡片，尚未翻開`);});g.flipped=[];g.locked=false;},1600);}
}
function finish(mode,stars,title,copy){
  const journey=Boolean(state.game?.quest);const defeated=state.game?.type==='battle'?state.game.monster:null;const freshSticker=rememberMonster(defeated);
  leave();state.game={type:'result',mode};const before=BADGES.filter(b=>hasBadge(b.id)).length;
  state.stars+=stars;state.completed[mode]=(state.completed[mode]||0)+1;save();updateChrome();
  const earned=BADGES.filter(b=>hasBadge(b.id)).length-before;
  main.innerHTML=screenHead('冒險完成','把這份勇氣，收藏在小英雄的心裡。')+`<section class="panel result"><div class="result-symbol">${['coop','reaction'].includes(mode)?'🏆':'🌟'}</div><p class="eyebrow">MISSION COMPLETE</p><h2>${title}</h2><p>${copy}<br>${earned?`還獲得了 ${earned} 枚新徽章，快去收藏看看吧！`:'每一次勇敢嘗試，都值得給自己一個大大的擁抱。'}</p>${defeated?`<div class="earned-sticker">${monster('sticker-image',defeated)}<b>${defeated.name}</b><small>${freshSticker?'✨ 新夥伴貼紙！':'💚 又和朋友冒險了！'}</small></div>`:''}<div class="result-stars">★ +${stars} 顆冒險星星</div><div class="result-actions"><button class="primary" data-action="${journey?'start-quest':'start'}" data-game="${mode}">${journey?'再出發，找新朋友！':'再玩一次'} ${icon('arrow')}</button><button class="secondary" data-action="home">回冒險大廳</button><button class="secondary" data-action="badges">看看我的徽章</button></div></section>`;
  confetti();playCue('victory');main.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});
}
let voiceEpoch=0,voiceTimer=null,speechActive=false;
const activeTones=new Set();
function speak(text){
  if(!state.sound||document.hidden||!('speechSynthesis'in window))return;
  stopVoice();const epoch=voiceEpoch;
  voiceTimer=setTimeout(()=>{voiceTimer=null;if(epoch!==voiceEpoch||!state.sound||document.hidden)return;
    const utterance=new SpeechSynthesisUtterance(text);utterance.lang='zh-TW';utterance.rate=1.02;utterance.pitch=1.18;
    const voices=speechSynthesis.getVoices();const voice=voices.find(v=>/zh[-_]TW/i.test(v.lang)&&/Flo|Sandy|Meijia|美佳/i.test(v.name))||voices.find(v=>/zh[-_]TW/i.test(v.lang))||voices.find(v=>/^zh/i.test(v.lang));if(voice)utterance.voice=voice;
    speechActive=true;const done=()=>{if(epoch===voiceEpoch)speechActive=false;};utterance.onend=done;utterance.onerror=done;speechSynthesis.speak(utterance);
  },150);
}
function stopVoice(){
  voiceEpoch++;clearTimeout(voiceTimer);voiceTimer=null;speechActive=false;
  if(state.cue){state.cue.pause();state.cue.currentTime=0;state.cue=null;}
  if('speechSynthesis'in window)speechSynthesis.cancel();
  for(const node of activeTones){try{node.stop();}catch{}}activeTones.clear();
}
const CUES={welcome:'小英雄，出發囉！光之力量，啟動！',correct:'答對了！太棒了，你觀察得很仔細！',transform:'變身！光之力量，全開！',ready:'小英雄準備好了！一起守護地球！',beam:'光之力量！發射！',rescue:'救援隊，出動！把溫暖的光，送給好朋友！',kindness:'友善之光！耶！我們一起幫助了好朋友！',victory:'耶！任務成功！擊個掌，你們超棒！',challenge:'注意囉！小挑戰來了，仔細看！'};
function cueUrl(id){return `assets/voice-${id}.mp3?v=1.6.0`;}
function playCue(id,after=''){
  if(!state.sound||document.hidden)return;stopVoice();const epoch=voiceEpoch;
  // Start in the click/key handler for tablet media policies; the cheer file contains its opening pause.
  if(!window.Audio){speak(CUES[id]+(after?'。'+after:''));return;}
  const clip=new window.Audio(cueUrl(id));state.cue=clip;clip.volume=.85;
  clip.addEventListener('ended',()=>{if(epoch!==voiceEpoch||state.cue!==clip)return;state.cue=null;if(after)speak(after);});
  clip.play().catch(()=>{if(epoch===voiceEpoch&&state.cue===clip){state.cue=null;speak(CUES[id]+(after?'。'+after:''));}});
}
let lastToneAt=-Infinity;
function tone(type){
  if(!state.sound||voiceTimer!==null||speechActive||(state.cue&&!state.cue.paused))return;
  try{
    const C=window.AudioContext||window.webkitAudioContext;if(!C)return;state.audio ||= new C();if(state.audio.state==='suspended')state.audio.resume();
    const now=state.audio.currentTime;if(type==='attack'&&now-lastToneAt<.075)return;lastToneAt=now;
    // Replace the previous accent instead of letting rapid taps stack into a loud chord.
    for(const old of activeTones){try{old.stop();}catch{}}activeTones.clear();
    const profile={
      success:[[523,0,.20],[659,.07,.22],[784,.14,.24],[1047,.21,.25]],
      try:[[440,0,.13],[392,.10,.18]],transform:[[262,0,.16,524],[392,.08,.18,784],[784,.18,.28,1047]],
      attack:[[210,0,.12,90],[840,.025,.08,420]],shield:[[440,0,.28,660],[880,.025,.28,990]],
      beam:[[160,0,.28,800],[320,.09,.32,1280]],warning:[[440,0,.12],[554,.16,.16]],
      flip:[[660,0,.09,880],[1320,.025,.09]],victory:[[523,0,.22],[659,.10,.24],[784,.20,.24],[1047,.30,.36]],
      signal:[[784,0,.13],[1175,.07,.17]]
    }[type]||[[660,0,.14]];
    for(const [hz,offset,duration,to] of profile){for(const [harmonic,volume] of [[1,.042],[2,.009]]){
      const o=state.audio.createOscillator(),gain=state.audio.createGain(),t=now+offset;o.type=type==='attack'||type==='beam'?'triangle':'sine';o.frequency.setValueAtTime(hz*harmonic,t);if(to)o.frequency.exponentialRampToValueAtTime(to*harmonic,t+duration*.8);
      gain.gain.setValueAtTime(0,t);gain.gain.linearRampToValueAtTime(volume,t+.008);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(gain);gain.connect(state.audio.destination);activeTones.add(o);o.onended=()=>{activeTones.delete(o);o.disconnect();gain.disconnect();};o.start(t);o.stop(t+duration+.015);
    }}
  }catch{}
}
function toast(text){clearTimeout(state.toastTimer);$('#toast').textContent=text;$('#toast').classList.add('visible');state.toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),2800);}
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const box=$('#confetti');box.innerHTML='';for(let i=0;i<45;i++){const el=document.createElement('i');el.style.cssText=`left:${Math.random()*100}%;background:${['#efbc61','#9cc6a4','#e89475','#c6b5d6'][i%4]};--drift:${Math.random()*250-125}px;animation-delay:${Math.random()*.7}s;`;box.append(el);}later(()=>box.innerHTML='',3500);}
function showHelp(){
 releaseHeld();pauseBattle(true);reactionPause(true);arcadePause(true);
  $('#dialog-content').innerHTML=`<span class="pill">給爸爸媽媽的小筆記</span><h2>陪孩子，一起變成光。</h2><p>這是為 4 歲與 6 歲小朋友設計的家庭同樂基地，全繁體中文、沒有廣告，也不需要帳號。</p><ul><li><b>弟弟模式：</b>三個選項、英雄圖片提示、語音讀題；翻牌配對四組。</li><li><b>哥哥模式：</b>增加至四個選項，自己觀察線索；翻牌配對六組。型態題固定最多三個選項，選項來自同一位英雄。</li><li><b>兄弟合作：</b>哥哥按 A 攻擊、S 護盾；弟弟按 L 攻擊、K 護盾。兩人的能量滿了，按空白鍵發射光線。</li><li><b>街機與動腦：</b>星際飛行哥哥 A／D、弟弟 J／L 左右移動，Esc 暫停；每位玩家有自己的三條航道。光能接線點一下轉 90 度，接通太陽與旗幟；可提示、復原、重來。</li><li><b>平板也能玩：</b>雙人按鈕支援多指同時操作；按鈕區不會拖曳或縮放，頁面其他地方仍能滑動。直接點大按鈕。猜題可按數字鍵，對戰按 Esc 暫停，切換分頁會自動暫停。</li><li><b>星星救援旅程：</b>從首頁直接出發，三站各找三個線索，完成後收怪獸貼紙。貼紙簿在「我的小成就」。長按攻擊能集氣；兄弟一人滿格後，可多按一下，送夥伴一格能量，每人每場一次。</li><li>兄弟反應特訓有三種難度：看訊號、輪流接力、真假星光與記憶接力；A／S 是哥哥，L／K 是弟弟，Esc 暫停。反應快可收節奏星，慢慢完成也有獎勵。</li><li>猜謎與接線可以慢慢想，答錯再試；飛行可選三種速度。星星在完成任務後發放，保存在目前瀏覽器。</li><li>聲音可在右上角切換。歡呼使用隨遊戲下載的「活力教練」聲音；讀題使用裝置的中文聲音。<button class="secondary" data-action="voice-preview">♫ 試聽活力教練</button></li></ul><p>使用本機可用的繁體中文字型顯示（macOS 以蘋方體為主）。角色圖片取自 <a href="https://tsuburaya-prod.com/heroes" target="_blank" rel="noopener">圓谷製作官方英雄大百科</a>；怪獸圖片也來自圓谷官方百科；型態與道具為簡化配色示意。<br>對戰按 D／J 換型態。力量型攻擊更強、速度型集氣更快、守護型護盾更久、慈愛型擅長救援。怪獸的挑戰玩法是家庭遊戲設計。這是家庭自用的非官方粉絲作品，角色權利屬原權利人。</p><button class="primary" data-action="close-help">準備好了，一起玩！</button>`;
  $('#info-dialog').showModal();
}

document.addEventListener('click',event=>{
  const nav=event.target.closest('[data-nav]');if(nav){navigate(nav.dataset.nav);return;}
  const el=event.target.closest('[data-action]');if(!el||el.disabled)return;if(event.detail!==0&&(touchClicks.get(el)||0)>performance.now()){event.preventDefault();return;}const action=el.dataset.action,index=Number(el.dataset.index);
  if(action==='flight-level')flightSetup(index);
  else if(action==='flight-begin')flightBegin(state.game?.level??0);
  else if(action==='flight-move')flightMove(index,Number(el.dataset.dir));
  else if(action==='arcade-pause')arcadePause();
  else if(action==='circuit-turn')circuitTurn(index);
  else if(action==='circuit-hint')circuitHint();
  else if(action==='circuit-undo')circuitUndo();
  else if(action==='circuit-reset')circuitReset();
  else if(action==='circuit-next')circuitNext();
  else if(action==='reaction-level'){if(state.game?.type==='reaction-setup'&&REACTION_LEVELS[index])reactionSetup(index);}
  else if(action==='reaction-begin')reactionBegin();
  else if(action==='reaction-input')reactionInput(index,el.dataset.kind);
  else if(action==='reaction-pause')reactionPause();
  else if(action==='start-quest')startQuest();
  else if(action==='quest-with-team')startQuest(true);
  else if(action==='quest-transform')questTransform();
  else if(action==='quest-next')questNext();
  else if(action==='quest-target')questTarget(index);
  else if(action==='home')navigate('home');
  else if(action==='badges')navigate('badges');
  else if(action==='start'){if(el.dataset.game==='reaction'&&state.game?.type==='result')reactionSetup(state.game.reactionLevel??1);else if(el.dataset.game==='flight'&&state.game?.type==='result')flightSetup(state.game.flightLevel??0);else startGame(el.dataset.game);}
  else if(action==='player'){state.player=el.dataset.player;save();renderHome();tone('flip');toast(state.player==='little'?'弟弟模式：一起慢慢看、慢慢玩！':state.player==='big'?'哥哥模式：小英雄，來挑戰看看！':'兄弟模式：兩份勇氣，一起發光！');}
  else if(action==='encyclopedia-tab'){encyclopediaTab=el.dataset.tab;renderHeroes();}
  else if(action==='read-entry'){stopVoice();const rows={forms:FORMS,devices:DEVICES,moves:MOVES,monsters:MONSTERS}[el.dataset.tab];const x=rows.find(x=>x.id===el.dataset.id);speak(`${x.name}。${x.description||x.fact||'光之力量，準備發射！'}`);}
  else if(action==='try-monster'){const id=el.dataset.id;startGame('battle');state.game.monsterId=id;renderSelection();}
  else if(action==='try-form'||action==='try-move'){const x=(action==='try-form'?FORMS:MOVES).find(x=>x.id===el.dataset.id);startGame('battle');state.game.selected[0]=HEROES.findIndex(h=>h.id===x.heroId);state.game.forms[0]=action==='try-form'?x.id:x.formId;state.game.moveId=action==='try-move'?x.id:null;renderSelection();}
  else if(action==='pick-form'){if(state.game?.type==='selection'){state.game.forms[state.game.pilot]=el.dataset.id;renderSelection();}}
  else if(action==='pick-monster'){if(state.game?.type==='selection'){state.game.monsterId=el.dataset.id;renderSelection();}}
  else if(action==='cycle-form')cycleForm(index);
  else if(action==='pick-move'){const g=state.game;if(g?.type==='battle'&&!g.paused&&!g.firing){g.moveId=el.dataset.id;updateMoveButtons(g);}}
  else if(action==='challenge-target')challengeTarget(index);
  else if(action==='voice-preview'){state.sound=true;save();updateChrome();playCue('welcome');}
  else if(action==='hero-filter'){catalogueFilter=el.dataset.filter;filterHeroCards();}
  else if(action==='help')showHelp();
  else if(action==='close-help')$('#info-dialog').close();
  else if(action==='read-hero'){const h=HEROES.find(h=>h.id===el.dataset.id);speak(`${h.name}。${h.fact}。變身器是${h.device}。必殺技是${h.move}。`);}
  else if(action==='read-question'){if(!state.sound)toast('先按右上角喇叭，開啟聲音喔！');else{stopVoice();speakQuestion();}}
  else if(action==='answer')answer(index);
  else if(action==='next-question'){if(state.game?.type==='quiz'&&state.game.answered){state.game.index++;nextQuiz();}}
  else if(action==='pilot'){if(state.game?.type==='selection'){state.game.pilot=index;renderSelection();}}
  else if(action==='pick-hero'){if(state.game?.type==='selection'){state.game.selected[state.game.pilot]=index;state.game.forms[state.game.pilot]=heroForms(HEROES[index])[0]?.id||null;state.game.moveId=null;tone('flip');renderSelection();}}
  else if(action==='prepare-transform')prepareTransform();
  else if(action==='transform')transform(index);
  else if(action==='attack')attack(index);
  else if(action==='shield')shield(index);
  else if(action==='beam')fireBeam();
  else if(action==='pause')pauseBattle();
  else if(action==='flip')flip(index);
  else if(action==='memory-help'){if(state.sound)speak('找出英雄和他的變身器，配成一對。點兩張卡片翻開看看，不一樣就記住位置，下次再試一次！');else toast('點兩張卡片，找出英雄和他的變身器！');}
});
document.addEventListener('input',event=>{if(event.target.id==='hero-search'){catalogueSearch=event.target.value;filterHeroCards();}});
document.addEventListener('keydown',event=>{
  if($('#info-dialog').open||event.ctrlKey||event.altKey||event.metaKey||event.target.matches('input,textarea,select'))return;
  const g=state.game;if(!g)return;const key=event.key.toLowerCase();
  if(g.type==='flight'){if(['a','d','j','l','arrowleft','arrowright','escape'].includes(key)){event.preventDefault();if(event.repeat)return;if(key==='escape')arcadePause();else flightMove(['j','l'].includes(key)?1:0,['a','j','arrowleft'].includes(key)?-1:1);}return;}
  if(g.type==='reaction'){
    if(['a','s','l','k','escape'].includes(key)){event.preventDefault();if(event.repeat)return;if(key==='escape')reactionPause();else reactionInput(['l','k'].includes(key)?1:0,['a','l'].includes(key)?'light':'shield');}return;
  }
  if(g.type==='quiz'){
    if(/^[1-4]$/.test(key)){event.preventDefault();if(!event.repeat)answer(Number(key)-1);}
    if(key==='enter'&&g.answered&&!event.target.closest('button')){event.preventDefault();g.index++;nextQuiz();}
  }
  if(g.type==='transform'&&['a','l',' '].includes(key)){event.preventDefault();if(event.repeat)return;if(key==='l'&&g.coop)transform(1);else if(key!=='l')transform(0);}
  if(g.type==='battle'){
    if(['a','l','s','k',' ','arrowleft','arrowdown','escape','d','j'].includes(key))event.preventDefault();
    if(event.repeat){if(key==='a'||key==='arrowleft')attack(0);else if(key==='l'&&g.coop)attack(1);return;}
    if(g.quest&&/^[1-3]$/.test(key)){event.preventDefault();questTarget(Number(key)-1);return;}
    if(key==='escape')pauseBattle();else if(key==='d')cycleForm(0);else if(key==='j'&&g.coop)cycleForm(1);
    else if(key==='a'||key==='arrowleft')attack(0);else if(key==='l'&&g.coop)attack(1);else if(key==='s'||key==='arrowdown')shield(0);else if(key==='k'&&g.coop)shield(1);else if(key===' ')fireBeam();
  }
});
document.addEventListener('pointerdown',holdAttack);
document.addEventListener('pointerup',releaseHeld);
document.addEventListener('pointercancel',releaseHeld);
document.addEventListener('lostpointercapture',releaseHeld);
document.addEventListener('contextmenu',e=>{if(e.target.closest('.battle-dock,.reaction-controls,.flight-controls'))e.preventDefault();});
window.addEventListener('blur',releaseHeld);
document.addEventListener('visibilitychange',()=>{if(document.hidden){releaseHeld();pauseBattle(true);reactionPause(true);arcadePause(true);stopVoice();}});
$('#sound-button').addEventListener('click',()=>{state.sound=!state.sound;save();updateChrome();if(!state.sound){stopVoice();toast('聲音關閉，安靜玩也很開心。');}else{playCue('welcome');toast('聲音開啟！準備一起冒險。');}});
$('#fullscreen-button').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else toast('這個瀏覽器沒有提供全螢幕功能。');}catch{toast('可用瀏覽器的全螢幕選單放大遊戲。');}});
$('#help-button').addEventListener('click',showHelp);
$('.dialog-close').addEventListener('click',()=>$('#info-dialog').close());
$('#info-dialog').addEventListener('click',e=>{if(e.target===$('#info-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('.brand').addEventListener('click',e=>{e.preventDefault();navigate('home');});
window.addEventListener('hashchange',()=>{if(['#home','#heroes','#badges'].includes(location.hash))navigate(location.hash.slice(1));});
navigate(['heroes','badges'].includes(location.hash.slice(1))?location.hash.slice(1):'home',false);
