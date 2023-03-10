/**
 * @Created by Mol on 2022/01/03
 * @description 节假日列表
 */

let festival_list = [
  ["春节", 2, 22],
  ["元旦", 1, 1],
  //   ["清明", 4, 5],
  ["劳动", 5, 1],
  ["国庆", 10, 1],
  ["圣诞", 12, 25],
  ["情人", 2, 14],
  ["妇女", 3, 1],
  ["植树", 3, 12],
  ["愚人", 4, 1],
];

const fishMan = new Date(),
  year = fishMan.getFullYear(),
  month = fishMan.getMonth() + 1,
  day = fishMan.getDate(),
  hour = fishMan.getHours();

let message = "";

function headInfo(hour) {
  let moment;
  if (hour >= 6 && hour < 12) {
    moment = "上午";
  } else if (hour >= 12 && hour < 18) {
    moment = "下午";
  } else if ((hour >= 18 && hour < 24) || hour < 6) {
    moment = "晚上";
  }

  message += `【摸鱼办】提醒您：${month}月${day}日${moment}好,摸鱼人！\n工作再累,一定不要忘记摸鱼哦！\n有事没事起身去茶水间,去厕所,去廊道走走别老在工位上坐着, 钱是老板的, 但命是自己的!`;
}
/**
 * @Created by Mol on 2023/02/12
 * @description 判断是否周末
 */

function weekend() {
  //获取今日星期
  let today = fishMan.getDay();
  today > 0 && today <= 5
    ? (info = `\n距离周末还有${6 - today}天\n`)
    : (info = `\n好好享受周末吧\n`);
  message += info;
}

/**
 * @Created by Mol on 2022/01/23
 * @description 判断是否过节
 */

function festival([chinese, festivalMonth, festivalDay]) {
  const startDate = Date.parse(fishMan);
  const newFestivalData = new Date(`${year},${festivalMonth},${festivalDay}`);
  const newFestivalDataNext = new Date(
    `${year + 1},${festivalMonth},${festivalDay}`
  );
  const endDate = Date.parse(newFestivalData);
  const endDateNext = Date.parse(newFestivalDataNext);
  const days = calculate(endDate) + 1;
  const daysNext = calculate(endDateNext) + 1;

  function calculate(endDate) {
    return Math.round((endDate - startDate) / (1 * 24 * 60 * 60 * 1000));
  }
  if (month == festivalMonth) {
    if (day == festivalDay) {
      info = `今天就是${chinese}节,好好享受！\n`;
    } else if (day < festivalDay) {
      info = `距离${chinese}节还有${days}天\n`;
    } else {
      info = `距离${chinese}节还有${daysNext}天\n`;
    }
  } else if (month > festivalMonth) {
    info = `距离${chinese}节还有${daysNext}天\n`;
  } else {
    info = `距离${chinese}节还有${days}天\n`;
  }
  message += info;
}

function last_message() {
  message += `上班是帮老板赚钱,摸鱼是赚老板的钱！最后,祝愿天下所有摸鱼人,都能愉快的渡过每一天…\n​`;
}
/**
 * @Created by Mol on 2022/01/23
 * @description 节日列表排序-冒泡排序
 */

function sort(arr) {
  arr.sort(([_, afterMonth, afterDay], [_1, beforeMonth, beforeDay]) => {
    if (
      afterMonth < beforeMonth ||
      (afterMonth === beforeMonth && afterDay < beforeDay)
    ) {
      return -1;
    }
  });
  //   console.log(arr);
  const now = new Date();
  const nowMonth = now.getMonth() + 1;
  const nowDay = now.getDate();

  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const [_, month, day] = arr[i];
    if (month > nowMonth || (month === nowMonth && day > nowDay)) {
      arr.unshift(...arr.splice(i, len - i));
      break;
    }
  }
  return arr;
}

function festivalAll() {
  festival_list.forEach((item) => festival(item));
}

(function () {
  headInfo(hour);
  weekend();
  sort(festival_list);
  festivalAll();
  last_message();
  console.log(message);
})();
