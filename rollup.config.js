import path from "path";
import fs from "fs";
import alias from "rollup-plugin-alias";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import ts from "rollup-plugin-typescript2";
import uglify from "rollup-plugin-uglify";
import { minify as minify_es } from "uglify-es";

const r = (filepath, encoding = "utf8") =>
  JSON.parse(fs.readFileSync(filepath, { encoding }));
const { version } = r("package.json");
const dev = process.env.NODE_ENV === "dev";
const bundle = process.argv.includes("--bundle");

const commonPlugins = [
  alias({
    relativeTimeLabel: path.resolve(".", "src/index"),
    functions: path.resolve(".", "src/functions"),
    helpers: path.resolve(".", "src/helpers"),
    types: path.resolve(".", "src/types")
  }),
  // ts({}),
  babel({
    exclude: "node_modules/**"
  }),
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**"],
    namedExports: {
      "node_modules/prop-types/index.js": ["PropTypes"],
      "node_modules/react/index.js": ["Component"],
      "node_modules/react-dom/index.js": ["render"]
    }
  }),
  resolve()
];

const config = {
  input: "./src/index.jsx",
  output: [
    {
      file: "dist/relativeTimeLabel.cjs.js",
      format: "cjs",
      name: "RelativeTimeLabel",
      banner: `/** relativeTimeLabel v${version} : commonjs bundle **/`,
      exports: "named"
    },
    {
      file: "dist/relativeTimeLabel.esm.js",
      format: "es",
      name: "RelativeTimeLabel",
      banner: `/** relativeTimeLabel v${version} : es bundle **/`
    },
    {
      file: "dist/relativeTimeLabel.js",
      format: "iife",
      name: "RelativeTimeLabel",
      banner: `/** relativeTimeLabel v${version} : iife bundle **/`
    }
  ],
  plugins: [...commonPlugins, bundle && uglify({}, minify_es)],
  external: [
    "react",
    "react-dom",
    "prop-types",
    path.resolve("./src/types.d.ts")
  ]
};

const devConfig = {
  input: "./src/index.jsx",
  output: [
    {
      file: "dist/relativeTimeLabel.dev.cjs.js",
      format: "cjs",
      name: "RelativeTimeLabel",
      banner: `/** relativeTimeLabel v${version} : commonjs bundle **/\n/** DEVELOPMENT FILE **/`,
      exports: "named",
      sourcemap: "./dist/"
    },
    {
      file: "dist/relativeTimeLabel.dev.esm.js",
      format: "es",
      name: "RelativeTimeLabel",
      banner: `/** relativeTimeLabel v${version} : es bundle **/\n/** DEVELOPMENT FILE **/`,
      sourcemap: "./dist/"
    },
    {
      file: "dist/relativeTimeLabel.dev.js",
      format: "iife",
      name: "RelativeTimeLabel",
      banner: `/** relativeTimeLabel v${version} : iife bundle **/\n/** DEVELOPMENT FILE **/`,
      sourcemap: "./dist/"
    }
  ],
  plugins: [...commonPlugins],
  external: [
    "react",
    "react-dom",
    "prop-types",
    path.resolve("./src/types.d.ts")
  ]
};

export default [config, devConfig];
