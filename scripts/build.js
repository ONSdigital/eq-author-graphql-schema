#!/usr/bin/env node

const chalk = require("chalk");
const schema = require("../");
const { buildSchema } = require("graphql");

try {
  buildSchema(schema);
  console.log(chalk.green("Valid schema"));
} catch (e) {
  console.error(chalk.red("Invalid schema:"), e.message);
  process.exitCode = 1;
}
