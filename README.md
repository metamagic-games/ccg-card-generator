# ccg-card-generator

[![npm version](https://badge.fury.io/js/ccg-card-generator.svg)](https://badge.fury.io/js/ccg-card-generator) [![GitHub version](https://badge.fury.io/gh/monolith-games%2Fccg-card-generator.svg)](https://badge.fury.io/gh/monolith-games%2Fccg-card-generator)

Quickly generate pages of trading cards. Useful for rapid prototyping.

---

## Usage

```
  const { ccg-card-generator, } = require("ccg-card-generator");
  
  const target = "./rulebook.md";
  
  const destination = "./rulebook.pdf";

  const options = {
    "debug": true,
    "style": "./node_modules/ccg-card-generator/lib/styles/prototype.css",
    "printOptions": {
      displayHeaderFooter: false,
    },
  };

  ccg-card-generator( target, destination, options);
```

## Contributing

If you'd like to contribute, please fork the repository and use a feature branch. Pull requests are welcome!
