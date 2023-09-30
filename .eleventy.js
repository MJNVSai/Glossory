module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./style.css");
    // eleventyConfig.addPassthroughCopy("img");
    // eleventyConfig.addPassthroughCopy("js");

    // To get the current year
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // return {
    //   dir: {
    //     input: '_src',
    //     output: '_site'
    //   }
    // };

    return{
      markdownTemplateEngine: 'njk',
      dataTemplateEngine: 'njk',
      htmlTemplateEngine: 'njk'
    }
  };