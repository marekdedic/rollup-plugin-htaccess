import { compileRollup, compileVite } from "./utils";

test("Basic rollup", async () => {
  const htaccess = await compileRollup({
    headers: [
      {
        header: "X-Frame-Options",
        action: "set",
        value: "deny",
      },
    ],
  });
  expect(htaccess).toBe("Header set X-Frame-Options DENY\n");
});

test("Basic vite", async () => {
  const htaccess = await compileVite({
    headers: [
      {
        header: "X-Frame-Options",
        action: "set",
        value: "deny",
      },
    ],
  });
  expect(htaccess).toBe("Header set X-Frame-Options DENY\n");
});
