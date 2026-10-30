import fs from "fs";
import path from "path";

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });

const re =
  /import\s+(\w+)\s+from\s+["']@mui\/icons-material(?:\/esm)?\/(\w+)["'];?/g;

for (const file of walk("src").filter((f) => /\.jsx?$/.test(f))) {
  const src = fs.readFileSync(file, "utf8");
  const out = src.replace(re, (_, local, name) =>
    local === name
      ? `import { ${name} } from "@mui/icons-material";`
      : `import { ${name} as ${local} } from "@mui/icons-material";`,
  );
  if (out !== src) {
    fs.writeFileSync(file, out);
    console.log("fixed:", file);
  }
}
