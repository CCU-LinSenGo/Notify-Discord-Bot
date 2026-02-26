const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const soups = [
    "再撐一下，反正焦慮也不會自己交件。",
    "靈感不來沒關係，截止日會自己來。",
    "努力不一定會成功，但不努力一定很輕鬆。",
    "就算每天熬夜，進度也不會發亮，只會你的肝發亮。",
    "專題像個黑洞，吸走的不只是時間，還有你的靈魂。",
    "在哪裡跌倒，就在那裡躺下吧。",
    "如果撐不下去，就去照照鏡子，想想自己還能靠什麼吃飯。",
    "沒有過不去的坎，只有過完還有下一個坎。",
    "今天解決不了的事情，別著急，明天也一樣解決不了。",
    "所謂的 Deadline，就是 Dead 之前畫的那條 Line。",
    "只要你一直拖延，總有一天會發現... 時間真的不多了。",
    "你的專題進度，比你的髮際線退得還要慢。",
    "別灰心，人生就是起起落落落落落落落落。",
    "別人熬夜是為了夢想，你熬夜是因為白天都在摸魚。",
    "萬事起頭難，然後中間難，最後結尾也難。",
    "當你覺得自己快不行的時候，去看看你的專題，你會發現你真的不行。",
    "專題做不出來沒關係，至少你學會了面對現實。",
    "那些讓你痛苦的專題，最後... 也沒讓你變得比較強。",
    "與其抱怨指導教授，不如想想為什麼當初選了他。",
    "時間就像海綿裡的水，只要你願意擠... 還是沒多少能拿來做專題。",
    "你以為這是極限了？專題會告訴你，沒有最慘，只有更慘。",
    "就算程式跑不動，你的眼淚還是要自己擦。",
    "遇到 Bug 不要慌，喝杯咖啡，它還是在那裡等你。",
    "人生沒有彩排，每天都是現場直播，專題評鑑也是。",
    "休息是為了走更長的路，拖延是為了最後一天走投無路。"
];

function getRandomSoup() {
    const index = Math.floor(Math.random() * soups.length);
    return soups[index];
}

function getCountdownMessage(targetDateStr, tzName) {
    // targetDateStr format: 'YYYY-MM-DD'
    const now = dayjs().tz(tzName);

    // Create a dayjs object for the target date AT MIDNIGHT in the target timezone
    const target = dayjs.tz(targetDateStr, tzName).startOf('day');
    const today = now.startOf('day');

    const diffDays = target.diff(today, 'day');

    if (diffDays > 0) {
        const profMessages = [
            `同學們，距離專題系展還剩 ${diffDays} 天。進度沒問題吧？老師很期待喔。🙂`,
            `距離系展剩 ${diffDays} 天了，不要跟我說你的專案又跑不起來了，趕快修。☕`,
            `老師看了一下日曆，再 ${diffDays} 天就系展了。你們的文件寫完沒？我看是還沒。👓`,
            `同學們，倒數 ${diffDays} 天。不要再熬夜打遊戲了，專題能 Demo 才是真的。😮💨`,
            `剩 ${diffDays} 天。你的架構圖還是一團亂，今天下課來找我一下。📁`,
            `還有 ${diffDays} 天。我猜你們的功能只做了一半，另一半還在夢裡對吧？醒醒啊！🔔`,
            `距離系展只剩 ${diffDays} 天。別以為我不知道你們都在看著 ChatGPT 發呆，該動手寫了吧？🧐`,
            `這禮拜的進度報告呢？距離系展只剩 ${diffDays} 天，不要再跟我說下週會補上了。📝`
        ];
        const randomMsg = profMessages[Math.floor(Math.random() * profMessages.length)];
        return randomMsg;
    } else if (diffDays === 0) {
        return `今天就是專題系展！🎉（雖然你可能笑不出來）`;
    } else {
        return `專題系展已經過了 ${Math.abs(diffDays)} 天。👻`;
    }
}

function buildResponse() {
    const targetDateStr = process.env.TARGET_DATE || '2026-05-19';
    const tzName = process.env.TIMEZONE || 'Asia/Taipei';

    const dateMsg = getCountdownMessage(targetDateStr, tzName);
    const soupMsg = getRandomSoup();

    return `${dateMsg}\n「${soupMsg}」`;
}

module.exports = {
    getRandomSoup,
    getCountdownMessage,
    buildResponse
};
