module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "git add"],
  "*.{js,ts,json,md,yml}": "prettier --write",
};
