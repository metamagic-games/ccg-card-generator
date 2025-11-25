import fs from "fs";
import generateHTML from "./index";
import createHtmlPages from "./createHtmlPages";

jest.mock("fs");

describe("generateHTML", () => {
  const mockCss = ".card { background: white; }";

  beforeEach(() => {
    fs.readFileSync.mockReturnValue(mockCss);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultDimensions = {
    page: { width: 216, height: 282, padding: 5 },
    card: { width: 59, height: 82, margin: 2, border: 1 },
  };

  describe("getCardsPerPage calculation", () => {
    it("should correctly calculate cards per page with default dimensions", () => {
      const cards = Array(20).fill({ name: "Test Card" });
      const html = generateHTML(cards, "test.css", defaultDimensions);

      // With default dimensions:
      // cardsPerRow = floor((216 - 5*2) / (59 + 2 + 1)) = floor(206 / 62) = 3
      // cardsPerColumn = floor((282 - 5*2) / (82 + 2 + 1)) = floor(272 / 85) = 3
      // cardsPerPage = 3 * 3 = 9
      // 20 cards / 9 per page = 3 pages (ceil)
      expect(html).toContain('class="page page-0"');
      expect(html).toContain('class="page page-1"');
      expect(html).toContain('class="page page-2"');
    });

    it("should handle single card", () => {
      const cards = [{ name: "Single Card" }];
      const html = generateHTML(cards, "test.css", defaultDimensions);

      expect(html).toContain('class="page page-0"');
      expect(html).not.toContain('class="page page-1"');
    });

    it("should handle exact page fill", () => {
      // 9 cards should fill exactly 1 page
      const cards = Array(9).fill({ name: "Test Card" });
      const html = generateHTML(cards, "test.css", defaultDimensions);

      expect(html).toContain('class="page page-0"');
      expect(html).not.toContain('class="page page-1"');
    });
  });

  describe("HTML structure", () => {
    it("should include CSS in style tag", () => {
      const cards = [{ name: "Test" }];
      const html = generateHTML(cards, "test.css", defaultDimensions);

      expect(html).toContain("<style>");
      expect(html).toContain(mockCss);
      expect(html).toContain("</style>");
    });

    it("should set page size in CSS", () => {
      const cards = [{ name: "Test" }];
      const html = generateHTML(cards, "test.css", defaultDimensions);

      expect(html).toContain("@page");
      expect(html).toContain("size: 216mm 282mm");
    });

    it("should read CSS from specified path", () => {
      const cards = [{ name: "Test" }];
      generateHTML(cards, "custom/path.css", defaultDimensions);

      expect(fs.readFileSync).toHaveBeenCalledWith("custom/path.css", "utf8");
    });
  });

  describe("custom HTML generator", () => {
    it("should use custom htmlGenerator when provided", () => {
      const cards = [{ name: "Test" }];
      const customGenerator = jest.fn().mockReturnValue("<custom>content</custom>");

      const html = generateHTML(cards, "test.css", defaultDimensions, customGenerator);

      expect(customGenerator).toHaveBeenCalledWith(defaultDimensions, [[{ name: "Test" }]]);
      expect(html).toContain("<custom>content</custom>");
    });

    it("should use default createHtmlPages when no custom generator provided", () => {
      const cards = [{ name: "Test" }];
      const html = generateHTML(cards, "test.css", defaultDimensions);

      expect(html).toContain('class="card"');
      expect(html).toContain('class="document"');
    });
  });
});
