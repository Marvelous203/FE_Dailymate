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
    extends: ['next'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Change to warning instead of error
      '@typescript-eslint/no-explicit-any': 'warn', // Change to warning
      'react-hooks/exhaustive-deps': 'warn', // Change to warning
      'react/no-unescaped-entities': 'off', // Disable if needed
    },
  }),
]

export default eslintConfig;
