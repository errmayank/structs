module.exports = {
  '**/*.{js,ts,json,md}': ['prettier --write'],
  '**/*.{js,ts}': ['eslint --max-warnings=0'],
}
