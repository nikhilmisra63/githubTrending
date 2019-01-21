const cheerio = require("cheerio");
const _ = require("lodash");
const axios = require("axios");
const url = "https://github.com/trending";
const urls = [];
let result = {
  Main: []
};

const githubTrending = async ur => {
  try {
    const body = await axios.get(ur);
    // this will load html in $
    const $ = cheerio.load(body.data);
    $(".repo-list li").each(function(i, element) {
      const $element = $(element);
      const $title = $element.find("h3 a").text();
      let t = _.replace($title, /\n/g, "").trim(); //name
      const $desc = $element.find(".py-1 p").text();
      let d = _.replace($desc, /\n/g, "").trim();
      const $language = $element.find(".d-inline-block span").text();
      let lang = $language.substr($language.indexOf("/") + 1).trim();
      const scrap = {
        title: t,
        desc: d,
        language: lang
      };
      result.Main.push(scrap);
    });
    $(".select-menu-item").each(function(i, element) {
      const $element = $(element);
      let $l = $element.find("span").text();
      languageUrl = `https://github.com/trending/${$l}?since=daily`;
      urls.push(languageUrl);
    });
  } catch (error) {
    console.log(error);
  }
};

const languageScraper = async ur => {
  let $, lang, langu;
  await Promise.all(
    ur.map(async u => {
      const body = await axios.get(u);
      $ = cheerio.load(body.data);
      $(".repo-list li").each(function(i, element) {
        const $element = $(element);
        const $language = $element.find(".d-inline-block span").text();
        langu = $language.substr($language.indexOf("/") + 1).trim();
        result[langu] = [];
      });
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
        result[langu].push(languageS);
      });
    })
  );
};

// function naming
const test = async () => {
  let surl = [];
  let j = 0;
  console.log(githubTrending(url));
  for (let i = 10; i <= urls.length; i += 10) {
    surl = urls.slice(j, i);
    j += 10;
    await languageScraper(surl);
    console.log(result);
  }
};
test();
