import { expect, test } from "vitest";

import { escapeRegexString, escapeValue } from "../src/utils";

test("Regex string escaping", () => {
  expect(escapeRegexString("A string")).toBe("A string");
  expect(escapeRegexString("BEF\\AFT")).toBe("BEF\\\\AFT");
  expect(escapeRegexString("BEF^AFT")).toBe("BEF\\^AFT");
  expect(escapeRegexString("BEF.AFT")).toBe("BEF\\.AFT");
  expect(escapeRegexString("BEF$AFT")).toBe("BEF\\$AFT");
  expect(escapeRegexString("BEF|AFT")).toBe("BEF\\|AFT");
  expect(escapeRegexString("BEF(AFT")).toBe("BEF\\(AFT");
  expect(escapeRegexString("BEF)AFT")).toBe("BEF\\)AFT");
  expect(escapeRegexString("BEF[AFT")).toBe("BEF\\[AFT");
  expect(escapeRegexString("BEF*AFT")).toBe("BEF\\*AFT");
  expect(escapeRegexString("BEF+AFT")).toBe("BEF\\+AFT");
  expect(escapeRegexString("BEF?AFT")).toBe("BEF\\?AFT");
  expect(escapeRegexString("BEF{AFT")).toBe("BEF\\{AFT");
  expect(escapeRegexString("BEF#AFT")).toBe("BEF\\#AFT");
  expect(escapeRegexString("BEF/AFT")).toBe("BEF\\x{2f}AFT");
  expect(escapeRegexString("BEF]AFT")).toBe("BEF]AFT");
  expect(escapeRegexString("BEF}AFT")).toBe("BEF}AFT");
  expect(escapeRegexString("BEF-AFT")).toBe("BEF-AFT");
  expect(escapeRegexString("BEF.INS.AFT")).toBe("BEF\\.INS\\.AFT");
  expect(escapeRegexString("BEF/INS/AFT")).toBe("BEF\\x{2f}INS\\x{2f}AFT");
});

test("Value escaping", () => {
  expect(escapeValue("A string")).toBe("A string");
  expect(escapeValue('A string with a "quoted" part')).toBe(
    'A string with a \\"quoted\\" part',
  );
  expect(escapeValue("A string with a 'quoted' part")).toBe(
    "A string with a 'quoted' part",
  );
});
