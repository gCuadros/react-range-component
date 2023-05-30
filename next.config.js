const rulesForJavaScript = {
  test: /\.(ts|js)x?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: "babel-loader",
    },
  ],
};

const rulesForStyles = {
  test: /\.css$/,
  use: [
    {
      loader: "style-loader",
    },
    {
      loader: "css-loader",
      options: {
        modules: true,
      },
    },
  ],
};

const rulesForSass = {
  test: /\.scss$/,
  use: [
    { loader: "style-loader" }, // to inject the result into the DOM as a style block
    { loader: "css-modules-typescript-loader" }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
    { loader: "css-loader", options: { modules: true } }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
    { loader: "sass-loader" }, // to convert SASS to CSS
  ],
};

const rulesForAssets = {
  test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
  type: "asset/resource",
};

const rulesForFonts = {
  test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
  type: "asset/inline",
};

module.exports = {
  webpack: (config) => {
    config.module.rules.push(
      rulesForJavaScript,
      rulesForStyles,
      rulesForAssets,
      rulesForFonts,
      rulesForSass
    );

    return config;
  },
};
