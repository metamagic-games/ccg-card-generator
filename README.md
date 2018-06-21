# ccg-card-generator

[![npm version](https://badge.fury.io/js/ccg-card-generator.svg)](https://badge.fury.io/js/ccg-card-generator)

[![GitHub version](https://badge.fury.io/gh/monolith-games%2Fccg-card-generator.svg)](https://badge.fury.io/gh/monolith-games%2Fccg-card-generator)

Turn markdown into a Player's Handbook-style document. 

Based on [Homebrewery](https://github.com/stolksdorf/homebrewery)'s stylesheet.

---

## Usage

```
  const { ccg-card-generator, } = require("ccg-card-generator");
  
  const target = "./rulebook.md";
  
  const destination = "./rulebook.pdf";

  const options = {
    "debug": true,
    "style": "./node_modules/ccg-card-generator/lib/styles/homebrewery-styles.css",
    "printOptions": {
      displayHeaderFooter: false,
    },
  };

  ccg-card-generator( target, destination, options);
```
