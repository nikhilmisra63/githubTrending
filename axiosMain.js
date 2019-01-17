const cheerio = require("../node_modules/cheerio");
const rl = require("readline-sync");
const _ = require("lodash");
const axios = require("axios");
const url = "https://github.com/trending";
const searchItem = rl.question("enter language which you want to search");
const languageUrl = `https://github.com/trending/${searchItem}?since=daily`;
console.log(languageUrl);

const lan = [];
let languageS = {
  title: "",
  desc: "",
  language: ""
};

const result = {
  main: [],
  search: []
};

const githubTrending = async ur => {
  try {
    const body = await axios.get(ur);
    const $ = cheerio.load(body.data);
    $(".repo-list li").each(function(i, element) {
      const $element = $(element);
      const $title = $element.find("h3 a").text();
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
      result.main.push(scrap);
    });
    $(".select-menu-item").each(function(i, element) {
      const $element = $(element);
      const $l = $element.find("span").text();
      const lang = {
        Name: $l
      };
      lan.push(lang);
    });
  } catch (error) {
    console.log(error);
  }
};
const languageScraper = async (ur, ln) => {
  let $;
  try {
    const body = await axios.get(ur);
    $ = cheerio.load(body.data);
  } catch (error) {
    console.log(error);
  }
  $(".repo-list li").each(function(i, element) {
    const $element = $(element);
    const $title = $element.find("h3 a").text();
    let t = _.replace($title, /\n/g, "").trim();
    const $desc = $element.find(".py-1 p").text();
    let d = _.replace($desc, /\n/g, "").trim();
    const $language = $element.find(".d-inline-block span").text();
    let lang = $language.substr($language.indexOf("/") + 1).trim();
    languageS = {
      title: t,
      desc: d,
      language: lang
    };
    result.search.push(languageS);
  });
};

const test = () => {
  setTimeout(async () => {
    await githubTrending(url);
    await languageScraper(languageUrl, searchItem);
    console.log(result);
  }, 1000);
};
test();
