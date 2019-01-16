const cheerio = require("../node_modules/cheerio");
const _ = require("lodash");
const axios = require("axios");
const url = "https://github.com/trending";

const githubTrending = async ur => {
  try {
    const jsonData = [];
    const body = await axios.get(ur);
    const $ = cheerio.load(body.data);
    $(".repo-list li").each(function(i, element) {
      const $element = $(element);
      const $title = $element.find("h3 a").text();
      console.log($title);
      var t = _.replace($title, /\n/g, "").trim();
      const $desc = $element.find(".py-1 p").text();
      var d = _.replace($desc, /\n/g, "").trim();
      const scrap = {
        title: t,
        desc: d
      };
      jsonData.push(scrap);
    });
    console.log(jsonData);
  } catch (error) {
    console.log(error);
  }
};
githubTrending(url);
