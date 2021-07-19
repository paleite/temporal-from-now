const { ESLint } = require("eslint");

const cli = new ESLint();

/**
 * @param {string[]} files
 */
const eslintFiles = async (files) =>
  (
    await files.reduce(
      /**
       * @param {Promise<string[]>} filesToLint
       */
      async (filesToLint, file) => [
        ...(await filesToLint),
        ...((await cli.isPathIgnored(file)) ? [] : [file]),
      ],
      Promise.resolve([])
    )
  ).join(" ");

module.exports = {
  ".*ignore": "prettier --write",
  "*.js": [
    () => "tsc --project tsconfig.eslint.json",
    "jest --bail --findRelatedTests",
    /**
     * @param {string[]} files
     */
    async (files) =>
      `eslint --config .eslintrc.precommit.js --fix --format codeframe --format codeframe --max-warnings=0 ${await eslintFiles(
        files
      )}`,
    "prettier --write",
  ],
  "*.json": "prettier --write",
  "*.md": "prettier --write",
  "*.ts?(x)": [
    () => "yarn run typecheck",
    "jest --bail --findRelatedTests",
    /**
     * @param {string[]} files
     */
    async (files) =>
      `eslint --config .eslintrc.precommit.js --fix --format codeframe --max-warnings=0  ${await eslintFiles(
        files
      )}`,
    "prettier --write",
  ],
};
