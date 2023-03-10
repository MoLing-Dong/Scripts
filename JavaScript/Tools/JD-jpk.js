/**
* @Created by Mol on 2022/02/18
* @description 网站模式转链
*/


const TelegramBot = require('node-telegram-bot-api')
const axios = require("axios")
/**
 * @param { String } BOT_TOKEN 你申请到的bot token
 * @description description...
 */

const BOT_TOKEN = ""; //

/**
 * @description 京品库http://www.jingpinku.com/
 * @param { string } APPID 您的京品库appid
 * @param { string } APPKEY 您的京品库appkey
 * @param { string } UNION_ID 您的京东联盟id
 */

const APPID = '';
const APPKEY = '';
const UNION_ID = '';


const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/^start/, async (msg) => {
    const { text } = msg;
    if (text.includes("jd") || text.includes("jingxi")) {
        let userShopUrl = text.split(" ")[1];
        const skuIds = userShopUrl.match(/\d+/)[0]
        let { data } = await jpkApi("get_union_search", { pageIndex: 1, keyword: skuIds })
        const productmsg = data.goods[0]
        let zhuanlian = await jpkApi("get_powerful_link", { union_id: UNION_ID, content: userShopUrl })
        console.log(zhuanlian);
        const toUserMsg = `${productmsg.skuName}\n预估获得返利：${productmsg.commissionInfo.commission}\n---------------------------\n链接${zhuanlian.content}`
        await bot.sendPhoto(msg.chat.id, productmsg.imageInfo.imageList[0].url,
            {
                caption: toUserMsg
            })
    }
    else {  //转链失败
        await bot.sendMessage(msg.chat.id, "转链失败");
    }

});


async function jpkApi(api, ...param) {
    const parmas =
    {
        appid: APPID, appkey: APPKEY,
    }
    Object.assign(parmas, param[0])
    let reqLink = new URL(`https://api.jingpinku.com/${api}/api?`);
    for (const vo of Object.keys(parmas)) {
        reqLink.searchParams.append(vo, parmas[vo]);
    }
    console.log(reqLink.href);
    const { data } = await axios.get(reqLink.href);
    return data

}




