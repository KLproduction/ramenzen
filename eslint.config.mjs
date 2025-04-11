import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable unused-vars rule
      "@typescript-eslint/no-empty-object-type": "warn", // Change error to warning
      "@typescript-eslint/no-invalid-params": "off", // Disable invalid-params rule
      "@next/next/no-img-element": "off", //  Disable the img warning
    },
  },
];

export default eslintConfig;
