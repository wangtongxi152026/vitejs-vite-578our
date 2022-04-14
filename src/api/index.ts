import v from "../api/aes.js";
export const 获取资金面 = async (type: string) => {
  let result = await fetch(
    `http://x.10jqka.com.cn/gateway/iwc-web-business-center/strategy/findClassicByPage?page=1&per=999&topic=${encodeURIComponent(
      type
    )}`,
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "zh-CN,zh-TW;q=0.9,zh;q=0.8,en-GB;q=0.7,en;q=0.6",

        "upgrade-insecure-requests": "1",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );
  return result.json();
};

export const getDetail = async (
  query = "非st，非科创板，非退市，非停牌，流通市值大于5亿元，非同花顺，近1个月有>=1次的减持公告取反，总市值小于30亿元股价小于6元市盈率为正小于36倍日换手率大于2%"
) => {
  let result = await fetch("http://iwencai.com/customized/chart/get-robot-data", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh-TW;q=0.9,zh;q=0.8,en-GB;q=0.7,en;q=0.6",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      "hexin-v": v(),
      Referer:
        "http://iwencai.com/unifiedwap/result?w=%E9%9D%9Est%EF%BC%8C%E9%9D%9E%E7%A7%91%E5%88%9B%E6%9D%BF%EF%BC%8C%E9%9D%9E%E9%80%80%E5%B8%82%EF%BC%8C%E9%9D%9E%E5%81%9C%E7%89%8C%EF%BC%8C%E6%B5%81%E9%80%9A%E5%B8%82%E5%80%BC%E5%A4%A7%E4%BA%8E5%E4%BA%BF%E5%85%83%EF%BC%8C%E9%9D%9E%E5%90%8C%E8%8A%B1%E9%A1%BA%EF%BC%8C%E8%BF%911%E4%B8%AA%E6%9C%88%E6%9C%89%3E%3D1%E6%AC%A1%E7%9A%84%E5%87%8F%E6%8C%81%E5%85%AC%E5%91%8A%E5%8F%96%E5%8F%8D%EF%BC%8C%E6%80%BB%E5%B8%82%E5%80%BC%E5%B0%8F%E4%BA%8E30%E4%BA%BF%E5%85%83%E8%82%A1%E4%BB%B7%E5%B0%8F%E4%BA%8E6%E5%85%83%E5%B8%82%E7%9B%88%E7%8E%87%E4%B8%BA%E6%AD%A3%E5%B0%8F%E4%BA%8E36%E5%80%8D%E6%97%A5%E6%8D%A2%E6%89%8B%E7%8E%87%E5%A4%A7%E4%BA%8E2%25&querytype=stock&addSign=1648985739837",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: JSON.stringify({
      // question: '专业版触底反弹看涨股',
      question: query,
      perpage: 999,
      page: 1,
      secondary_intent: "stock",
      log_info: { input_type: "typewrite" },
      iwcpro: 1,
      source: "Ths_iwencai_Xuangu",
      version: "2.0",
      query_area: "",
      block_list: "",
      add_info: { urp: { scene: 1, company: 1, business: 1 }, contentType: "json", searchInfo: true },
    }),
    method: "POST",
  });

  return result.json();
};

export const getMaster = async () => {
  let result = await fetch("http://x.10jqka.com.cn/gateway/iwc-web-business-center/strategy/find?type=master", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded",
      "hexin-v": "A3iXZl5PboPsrIIHZ7Jw5wh8SS0P4dxrPkWw77LpxLNmzRYTWvGs-45VgHYB",
      pragma: "no-cache",
    },
    referrer: "http://x.10jqka.com.cn/unifiedwap/strategy-list-page?querytype=strategyListPage",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  return result.json();
};
