
const fs = require("fs");
const path = "src/App.jsx";
let content = fs.readFileSync(path, "utf8");

// Define the new pdfContainer style
// Note: We use single quotes for font-family to avoid the previous syntax error.
const newPdfContainer = `  pdfContainer: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily: \u0027-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif\u0027,
    width: "1200px",
    margin: "0 auto",
    padding: "0",
    boxShadow: "0 0 20px rgba(0,0,0,0.5)",
    overflow: "hidden",
    boxSizing: "border-box",
  },`;

// Regex to match the existing pdfContainer block
// It starts with pdfContainer: { and ends with },
const regex = /pdfContainer:\s*\{[\s\S]*?\},/;

if (regex.test(content)) {
    content = content.replace(regex, newPdfContainer);
    fs.writeFileSync(path, content, "utf8");
    console.log("Updated pdfContainer width to 1200px.");
} else {
    console.error("Could not find pdfContainer style block.");
}

