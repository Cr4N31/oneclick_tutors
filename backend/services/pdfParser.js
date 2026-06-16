const pdfjsLib = require('pdfjs-dist');

async function extractText(buffer) {
  const uint8Array = new Uint8Array(buffer);
  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;

  let fullText = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

function parseCourseText(rawText) {
  const normalized = rawText
    .replace(/(MODULE\s+\d+)/g, '\n$1\n')
    .replace(/(UNIT\s+\d+[^a-z]*)/g, '\n$1\n');

  const lines = normalized.split('\n').map(l => l.trim()).filter(Boolean);

  const moduleRegex = /^MODULE\s+(\d+)$/;
  const unitRegex = /^UNIT\s+(\d+)\s*(.*)?$/;

  const modules = [];
  let currentModule = null;
  let currentUnit = null;

  for (const line of lines) {
    const modMatch = line.match(moduleRegex);
    if (modMatch) {
      const modNumber = parseInt(modMatch[1]);

      // Skip repeated MODULE headings (running headers/footers)
      if (currentModule && currentModule.number === modNumber) continue;

      if (currentUnit && currentModule) {
        currentModule.units.push(currentUnit);
        currentUnit = null;
      }
      if (currentModule) modules.push(currentModule);

      currentModule = {
        number: modNumber,
        title: `Module ${modNumber}`,
        units: [],
      };
      continue;
    }

    if (currentModule) {
      const unitMatch = line.match(unitRegex);
      if (unitMatch) {
        const unitNumber = parseInt(unitMatch[1]);

        // Skip repeated UNIT headings
        if (currentUnit && currentUnit.number === unitNumber) continue;

        if (currentUnit) currentModule.units.push(currentUnit);

        currentUnit = {
          number: unitNumber,
          title: unitMatch[2]?.trim() || `Unit ${unitNumber}`,
          raw_text: '',
        };
        continue;
      }
    }

    if (currentUnit) {
      currentUnit.raw_text += line + '\n';
    }
  }

  if (currentUnit && currentModule) currentModule.units.push(currentUnit);
  if (currentModule) modules.push(currentModule);

  return { modules };
}

module.exports = { extractText, parseCourseText };