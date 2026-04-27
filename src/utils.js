const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const soups = [
    "每一個微小的進步，都是通往成功的階梯。老師相信你們！",
    "不要害怕犯錯，因為每一次的 Debug 都是成長的養分。",
    "就算進度緩慢，只要方向正確，總會到達終點。",
    "相信自己的潛力，你比想像中還要強大。",
    "今天的努力，是為了讓明天的自己感謝現在的你。",
    "遇到瓶頸時，深呼吸休息一下，轉個念頭會看到不一樣的風景。",
    "別忘了欣賞沿途的風景，專題不僅是結果，更是一段寶貴的歷程。",
    "無論結果如何，這段期間付出的汗水，都將成為你未來最堅實的底氣。",
    "與團隊並肩作戰的日子，會是你學生時期最美好的回憶。",
    "程式碼雖然冷冰冰，但你們投入的熱情會讓它充滿溫度。",
    "給自己一點掌聲，你有看到嗎？你已經比昨天的自己更進步了。",
    "慢慢來，比較快；穩紮穩打，每一步都算數。",
    "困難只是沿途的考驗，跨過去，就是一片海闊天空。",
    "累了就伸個懶腰、喝杯水，休息是為了積累更多向前的動力。",
    "即使是在深夜無人時的努力，知識與經驗都會成為你們的寶藏。",
    "不要忘記當初為何出發，保持初心，繼續堅定地走下去。",
    "你不需要很厲害才能開始，但你需要開始才會很厲害。",
    "每一次的挫折，都是在幫你調整到最完美的狀態。",
    "再堅持一下下，你們離心目中最理想的成果只差一步之遙了！",
    "用心寫下的每一行 Code，都會在最後綻放最美的花朵。加油！"
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
            `同學們，你們這段時間的努力老師都看在眼裡，繼續加油！💪`,
            `每一行程式碼都是你們成長的證明，老師以你們為榮！🌟`,
            `遇到困難很正常，重要的是你們沒有放棄，這就是最棒的地方！😊`,
            `同學們辛苦了！每一個小進步都值得被肯定，你們做得很好！🎉`,
            `老師相信你們一定能做出令自己驕傲的作品，繼續努力！🙌`,
            `不管過程多艱辛，完成那一刻的成就感絕對值得，老師為你們加油！🔥`,
            `你們的專題展現了真正的學習精神，老師期待看到你們的成果！✨`,
            `同學們，壓力大的時候記得互相支持，你們有一個很棒的團隊！🤝`
        ];
        const randomMsg = profMessages[Math.floor(Math.random() * profMessages.length)];
        return `# 距離專題系展還有 ${diffDays} 天\n${randomMsg}`;
    } else if (diffDays === 0) {
        return `# 🎉 今天就是專題系展！\n同學們，今天是你們大放異彩的日子，老師為你們感到驕傲！`;
    } else {
        return `# 專題系展已結束 ${Math.abs(diffDays)} 天\n辛苦了！這段旅程的每一步都讓你們變得更強。👏`;
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
