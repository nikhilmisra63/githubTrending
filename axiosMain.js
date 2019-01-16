const cheerio = require("../node_modules/cheerio");
const axios = require("axios");
const url = "https://github.com/trending";

const githubTrending = async ur => {
  try {
    var self = this;
    self.items = new Array();
    const body = await axios.get(ur);
    const $ = cheerio.load(body.data);
    $(".repo-list li").each(function(i, element) {
      const $element = $(element);
      const $title = $element.find("h3 a").text();
      console.log($title);
      var t = $title.replace(/\n/g, "").trim();
      const $desc = $element.find(".py-1 p").text();
      var d = $desc.replace(/\n/g, "").trim();
      self.items[i] = {
        title: t,
        desc: d
      };
    });
    console.log(self.items);
  } catch (error) {
    console.log(error);
  }
};
githubTrending(url);
