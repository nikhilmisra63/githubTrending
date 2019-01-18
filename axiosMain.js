const cheerio = require("../node_modules/cheerio");
const rl = require("readline-sync");
const _ = require("lodash");
const axios = require("axios");
const fs = require("fs");
const url = "https://github.com/trending";
const lan = [];
const result = {
  main: []
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
      let $l = $element.find("span").text();
      languageUrl = `https://github.com/trending/${$l}?since=daily`;
      lan.push({
        url: languageUrl,
        language: $l
      });
    });
  } catch (error) {
    console.log(error);
  }
};
const languageScraper = async ur => {
  let $, lang;
  result[ur.language] = [];
  try {
    const body = await axios.get(ur.url);
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
    lang = $language.substr($language.indexOf("/") + 1).trim();
    languageS = {
      title: t,
      desc: d,
      language: lang
    };
    result[ur.language].push(languageS);
  });
};

const test = async () => {
  await githubTrending(url);
  // for (let i = 0; i < lan.length; i++) {
  //   await languageScraper(lan[i]);
  // }
  console.log(result);
};
test();
