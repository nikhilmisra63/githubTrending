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
      let t = _.replace($title, /\n/g, "").trim();
      const $desc = $element.find(".py-1 p").text();
      let d = _.replace($desc, /\n/g, "").trim();
      const $language = $element.find(".d-inline-block span").text();
      let lang = $language.substr($language.indexOf("/") + 1).trim();

      const scrap = {
        title: t,
        desc: d,
        language: lang
      };
      jsonData.push(scrap);
    });
    console.log(jsonData);
  } catch (error) {
    console.log(error);
  }
};
const test = () => {
  setTimeout(async () => {
    await githubTrending(url);
    console.log(" \t Data Fetched");
  }, 1000);
};
test();
