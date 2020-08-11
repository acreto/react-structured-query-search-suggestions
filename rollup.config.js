import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";

import pkg from "./package.json";

const globals={
  'react': 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes'
}

export default {
  input: "src/ReactStructuredQuerySearch.js",
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: "ReactStructuredQuerySearch",
      sourcemap: true,
      exports: 'named', 
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      exports: 'named', 
    }
  ].map(out => ({ ...out, globals})),
  plugins: [
    external(),
    postcss({
      extract: true,
      minimize: true
    }),
    url(),
    svgr(),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"]
    }),
    resolve(),
    commonjs()
  ]
};