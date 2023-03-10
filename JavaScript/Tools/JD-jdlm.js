/**
 * @Created by Mol on 2022/03/03
 * @description 网站模式转链
 */

const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const dayjs = require("dayjs");
const cryptojs = require("crypto-js");

/**
 * @description description...
 * @param { String } BOT_TOKEN 你申请到的bot token
 */

const BOT_TOKEN = "  "; //
/**
 * @description 官网申请
 * @param { String } APP_KEY appkey
 * @param { String } SECRETKEY secretkey
 * @param { String } ACCESS_TOKEN 根据API属性标签，如果需要授权，则此参数必传;如果不需要授权，则此参数不需要传
 * @param { String } SITE_ID 网站ID/APP ID
 */
const APP_KEY = "   ";
const SECRETKEY = "  ";
const ACCESS_TOKEN = "";
const SITE_ID = "  ";

/**
 * @description 京品库http://www.jingpinku.com/
 * @param { string } APPID 您的京品库appid
 * @param { string } APPKEY 您的京品库appkey
 * @param { string } UNION_ID 您的京东联盟id
 */

const APPID = "  ";
const APPKEY = "  ";
const UNION_ID = "  ";

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\.jd.com/, async (msg) => {
  // console.log(msg);
  const { text } = msg; //获取用户文本
  if (text.includes("jd") || text.includes("jingxi")) {
    try {
      let userMassageUrl = text;
      // console.log(userMassageUrl);
      let { data, message, code } = await JdlmApi(
        "jd.union.open.promotion.common.get",
        {
          promotionCodeReq: {
            materialId: userMassageUrl,
            siteId: SITE_ID,
          },
        }
      ); //京东联盟返利链接
      // console.log(code);
      if (code !== 200) {
        await bot.sendMessage(msg.chat.id, message);
        throw "商品信息错误";
      }
      const unionurl = data.clickURL; //京东联盟 转精品库
      const skuIds = userMassageUrl.match(/\d+/)[0]; //获取物料skuid
      const product_information = await JdlmApi(
        "jd.union.open.goods.promotiongoodsinfo.query",
        {
          skuIds: skuIds,
        }
      ); //京东联盟商品查询（非申请接口）
      // console.log(product_information);       //商品信息
      let { content: shortUrl } = await jpkApi("get_powerful_link", {
        union_id: UNION_ID,
        content: unionurl,
      });
      const { unitPrice, commisionRatioWl, imgUrl } = product_information[0];
      const toUserMsg = `当前价格${unitPrice}\n预计可得佣金${
        Math.floor(((unitPrice * commisionRatioWl) / 100) * 100) / 100
      }\n------------------------------\n购买链接${shortUrl}`;
      // await bot.sendMessage(msg.chat.id, toUserMsg);
      await bot.sendPhoto(msg.chat.id, imgUrl, {
        caption: toUserMsg,
      });
      console.log(toUserMsg);
    } catch (error) {
      console.log(error);
    }
  } else {
    //转链失败
    await bot.sendMessage(msg.chat.id, "转链失败");
  }
});

bot.onText(/^抽奖/, async (msg) => {
  const daymsg = await JdlmApi("jd.union.open.goods.jingfen.query", {
    goodsReq: {
      eliteId: "22",
      pageSize: randomNum(1, 5), //条数
      pageIndex: randomNum(1, 20), //页码
    },
  });
  for (i = 0; i < daymsg.length; i++) {
    let newMsg = `- - - - - - - - - - - - - - -\n📦 商品：${daymsg[i].skuName}\n`;
    for (j = 0; j < daymsg[i].couponInfo.couponList.length; j++) {
      newMsg += `- - - - - - - - - - - - - - -\n💵优惠：满${daymsg[i].couponInfo.couponList[j].quota}折扣${daymsg[i].couponInfo.couponList[j].discount}\n优惠券链接：${daymsg[i].couponInfo.couponList[j].link}\n`;
    }
    newMsg += `⭐️ 好评：${daymsg[i].goodCommentsShare}%\n`;
    // console.log(msg);
    await bot.sendMessage(msg.chat.id, newMsg);
    newMsg = "";
    // const youhuiquan = `${daymsg[0].skuName}\n优惠券链接：${daymsg[0].couponInfo.couponList[0].link}`
  }
});
/**
 * @description 京东联盟
 * @param { String } method API接口名称
 * 以下是业务参数
 * @param { object } param 业务参数===>>>对应不同Api
 */

async function JdlmApi(method, param) {
  // 实例化一个URL对象
  let product = new URL("https://api.jd.com/routerjson");
  //系统参数
  let parmas = {
    method,
    app_key: APP_KEY,
    timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    format: "json",
    v: "1.0",
    sign_method: "md5",
    "360buy_param_json": "",
  };
  parmas["360buy_param_json"] = JSON.stringify(param);
  let unSign = SECRETKEY;
  for (const vo of Object.keys(parmas).sort()) {
    unSign += vo + parmas[vo];
  }
  unSign += SECRETKEY;
  parmas["sign"] = cryptojs.MD5(unSign).toString().toUpperCase();
  for (const vo of Object.keys(parmas)) {
    product.searchParams.append(vo, parmas[vo]);
  }

  const { data } = await axios.get(product.href);
  const responce = method.replace(/\./g, "_") + "_responce";
  if (data[responce].getResult) {
    return JSON.parse(data[responce].getResult);
  } else if (data[responce].queryResult) {
    const queryResult = JSON.parse(data[responce].queryResult);
    if (queryResult.code === 200) {
      return queryResult.data;
    }
  }
}

/**
 * @Created by Mol on 2022/02/16
 * @description 精品库Api
 */

async function jpkApi(api, param) {
  const parmas = {
    appid: APPID,
    appkey: APPKEY,
  };
  Object.assign(parmas, param);
  let product = new URL(`https://api.jingpinku.com/${api}/api?`);
  for (const vo of Object.keys(parmas)) {
    product.searchParams.append(vo, parmas[vo]);
  }
  const { data } = await axios.get(product.href);
  return data;
}

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}
