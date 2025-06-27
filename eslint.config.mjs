import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    rules: {
      "react-hooks/exhaustive-deps": "warn", // Change to warning
      "react/no-unescaped-entities": "off", // Disable if needed
    },
  }),
];

export default eslintConfig;
