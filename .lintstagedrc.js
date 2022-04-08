const path = require('path');

const buildEslintCommand = filenames =>
  `next lint --fix --file ${filenames.map(f => path.relative(process.cwd(), f)).join(' --file ')}`;

const buildPrettierCommand = filenames =>
  `yarn run format ${filenames.map(f => path.relative(process.cwd(), f)).join(' ')}`;

const buildStylelintCommand = filenames =>
  `stylelint --fix ${filenames.map(f => path.relative(process.cwd(), f)).join(' ')}`;

const buildJestCommand = 'yarn run test --passWithNoTests --onlyChanged';

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand, buildPrettierCommand, buildJestCommand],
  '*.css': [buildStylelintCommand],
};
