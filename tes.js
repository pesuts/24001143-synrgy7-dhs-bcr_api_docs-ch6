const a = require('openapi-to-md');

const convert = async () => {
  await a.convertMarkdown("./swagger-config.yml", "./readme2.md");
};

convert();
