import createHtmlPages from "./createHtmlPages";

describe("createHtmlPages", () => {
  const defaultDimensions = {
    page: { width: 216, height: 282, padding: 5 },
    card: { width: 59, height: 82, margin: 2, border: 1 },
  };

  describe("page generation", () => {
    it("should generate pages with correct structure", () => {
      const cardPages = [[{ name: "Card 1" }]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain('class="document"');
      expect(html).toContain('class="pages"');
      expect(html).toContain('class="page page-0"');
    });

    it("should apply page dimensions as inline styles", () => {
      const cardPages = [[{ name: "Card 1" }]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain("height: 282mm");
      expect(html).toContain("width: 216mm");
      expect(html).toContain("padding: 5mm");
    });

    it("should generate multiple pages", () => {
      const cardPages = [
        [{ name: "Card 1" }],
        [{ name: "Card 2" }],
        [{ name: "Card 3" }],
      ];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain('class="page page-0"');
      expect(html).toContain('class="page page-1"');
      expect(html).toContain('class="page page-2"');
    });
  });

  describe("card generation", () => {
    it("should generate cards with correct class", () => {
      const cardPages = [[{ name: "Test Card" }]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain('class="card"');
    });

    it("should apply card dimensions as inline styles", () => {
      const cardPages = [[{ name: "Test Card" }]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain("height: 82mm");
      expect(html).toContain("width: 59mm");
      expect(html).toContain("margin-bottom: 2mm");
      expect(html).toContain("margin-right: 2mm");
    });

    it("should create sections for each card property", () => {
      const cardPages = [[{ name: "Test Card", cost: "3", type: "Creature" }]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain('class="card-section-name"');
      expect(html).toContain('class="card-section-cost"');
      expect(html).toContain('class="card-section-type"');
    });

    it("should parse markdown in card content", () => {
      const cardPages = [[{ text: "**Bold text** and *italic*" }]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain("<strong>Bold text</strong>");
      expect(html).toContain("<em>italic</em>");
    });

    it("should handle numeric values", () => {
      const cardPages = [[{ power: 5, toughness: 3 }]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain('class="card-section-power"');
      expect(html).toContain('class="card-section-toughness"');
      expect(html).toContain("5");
      expect(html).toContain("3");
    });

    it("should handle multiple cards on a page", () => {
      const cardPages = [[
        { name: "Card 1" },
        { name: "Card 2" },
        { name: "Card 3" },
      ]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      const cardMatches = html.match(/class="card"/g);
      expect(cardMatches).toHaveLength(3);
    });
  });

  describe("edge cases", () => {
    it("should handle empty card pages array", () => {
      const html = createHtmlPages(defaultDimensions, []);

      expect(html).toContain('class="document"');
      expect(html).toContain('class="pages"');
    });

    it("should handle cards with empty values", () => {
      const cardPages = [[{ name: "", description: "" }]];
      const html = createHtmlPages(defaultDimensions, cardPages);

      expect(html).toContain('class="card-section-name"');
      expect(html).toContain('class="card-section-description"');
    });
  });
});
