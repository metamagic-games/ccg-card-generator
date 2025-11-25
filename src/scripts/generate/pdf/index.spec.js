import generatePdf from "./index";
import * as htmlPdfChrome from "html-pdf-chrome";
import fs from "fs";

jest.mock("html-pdf-chrome");
jest.mock("fs");
jest.mock("../html", () => {
  return jest.fn().mockReturnValue("<html><body>mock html</body></html>");
});

describe("generatePdf", () => {
  const mockToFile = jest.fn().mockResolvedValue();
  const mockPdf = { toFile: mockToFile };

  beforeEach(() => {
    htmlPdfChrome.create.mockResolvedValue(mockPdf);
    fs.readFileSync.mockReturnValue(".card {}");
    fs.writeFile.mockImplementation((path, content, callback) => callback(null));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("input validation", () => {
    it("should throw error if cards is not an array", async () => {
      await expect(generatePdf("not an array", {})).rejects.toThrow(
        "Cards must be an array"
      );
    });

    it("should throw error if cards is null", async () => {
      await expect(generatePdf(null, {})).rejects.toThrow(
        "Cards must be an array"
      );
    });

    it("should throw error if cards is undefined", async () => {
      await expect(generatePdf(undefined, {})).rejects.toThrow(
        "Cards must be an array"
      );
    });

    it("should throw error if cards array is empty", async () => {
      await expect(generatePdf([], {})).rejects.toThrow(
        "Cards array cannot be empty"
      );
    });

    it("should accept valid cards array", async () => {
      const cards = [{ name: "Test Card" }];
      await expect(generatePdf(cards, {})).resolves.toBeDefined();
    });
  });

  describe("options handling", () => {
    it("should use default options when none provided", async () => {
      const cards = [{ name: "Test Card" }];
      const result = await generatePdf(cards);

      expect(result.destination).toBe("./output.pdf");
    });

    it("should use custom destination", async () => {
      const cards = [{ name: "Test Card" }];
      const result = await generatePdf(cards, { destination: "./custom.pdf" });

      expect(mockToFile).toHaveBeenCalledWith("./custom.pdf");
      expect(result.destination).toBe("./custom.pdf");
    });

    it("should return card count in result", async () => {
      const cards = [{ name: "Card 1" }, { name: "Card 2" }, { name: "Card 3" }];
      const result = await generatePdf(cards, {});

      expect(result.cardCount).toBe(3);
    });

    it("should merge custom page dimensions with defaults", async () => {
      const generateHtml = require("../html");
      const cards = [{ name: "Test Card" }];

      await generatePdf(cards, {
        pageDimensions: { width: 300 },
      });

      const callArgs = generateHtml.mock.calls[0];
      const dimensions = callArgs[2];

      expect(dimensions.page.width).toBe(300);
      expect(dimensions.page.height).toBe(282); // default
      expect(dimensions.page.padding).toBe(5); // default
    });

    it("should merge custom card dimensions with defaults", async () => {
      const generateHtml = require("../html");
      const cards = [{ name: "Test Card" }];

      await generatePdf(cards, {
        cardDimensions: { height: 100 },
      });

      const callArgs = generateHtml.mock.calls[0];
      const dimensions = callArgs[2];

      expect(dimensions.card.height).toBe(100);
      expect(dimensions.card.width).toBe(59); // default
      expect(dimensions.card.margin).toBe(2); // default
    });

    it("should pass custom htmlGenerator to generateHtml", async () => {
      const generateHtml = require("../html");
      const cards = [{ name: "Test Card" }];
      const customGenerator = jest.fn();

      await generatePdf(cards, { htmlGenerator: customGenerator });

      expect(generateHtml).toHaveBeenCalledWith(
        cards,
        expect.any(String),
        expect.any(Object),
        customGenerator
      );
    });
  });

  describe("PDF generation", () => {
    it("should call htmlPdfChrome.create with generated HTML", async () => {
      const cards = [{ name: "Test Card" }];
      await generatePdf(cards, {});

      expect(htmlPdfChrome.create).toHaveBeenCalledWith(
        "<html><body>mock html</body></html>",
        expect.any(Object)
      );
    });

    it("should pass merged pdfOptions to htmlPdfChrome", async () => {
      const cards = [{ name: "Test Card" }];
      const customPdfOptions = { printOptions: { scale: 0.5 } };

      await generatePdf(cards, { pdfOptions: customPdfOptions });

      expect(htmlPdfChrome.create).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          printOptions: expect.objectContaining({ scale: 0.5 }),
        })
      );
    });
  });

  describe("debug mode", () => {
    it("should not write debug HTML by default", async () => {
      const cards = [{ name: "Test Card" }];
      await generatePdf(cards, {});

      expect(fs.writeFile).not.toHaveBeenCalled();
    });

    it("should write debug HTML when debug is true", async () => {
      const cards = [{ name: "Test Card" }];
      await generatePdf(cards, { debug: true });

      expect(fs.writeFile).toHaveBeenCalledWith(
        "debug.html",
        expect.any(String),
        expect.any(Function)
      );
    });

    it("should reject if debug HTML write fails", async () => {
      fs.writeFile.mockImplementation((path, content, callback) =>
        callback(new Error("Write failed"))
      );

      const cards = [{ name: "Test Card" }];
      await expect(generatePdf(cards, { debug: true })).rejects.toThrow(
        "Failed to write debug HTML"
      );
    });
  });

  describe("error handling", () => {
    it("should propagate htmlPdfChrome errors", async () => {
      htmlPdfChrome.create.mockRejectedValue(new Error("Chrome not found"));

      const cards = [{ name: "Test Card" }];
      await expect(generatePdf(cards, {})).rejects.toThrow("Chrome not found");
    });

    it("should propagate file write errors", async () => {
      mockToFile.mockRejectedValue(new Error("Permission denied"));

      const cards = [{ name: "Test Card" }];
      await expect(generatePdf(cards, {})).rejects.toThrow("Permission denied");
    });
  });
});
