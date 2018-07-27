#!/usr/bin/env node

const chalk = require("chalk");
const schema = require("../");
const { makeExecutableSchema } = require("graphql-tools");
const childProcess = require("child_process");
const findBreakingChanges = require("./findBreakingChanges");
const del = require("del");

const getMasterSchema = async () => {
  await childProcess.execSync(
    "git clone https://github.com/ONSdigital/eq-author-graphql-schema.git scripts/previousSchema"
  );
  const schema = require("./previousSchema");

  return schema;
};

const createSchema = typeDefs =>
  makeExecutableSchema({
    typeDefs,
    resolverValidationOptions: { requireResolversForResolveType: false }
  });

const findBreakingChangesBetweenCurrentAndPrevious = (oldSchema, newSchema) => {
  const oldSchemaAST = createSchema(oldSchema);
  const newSchemaAST = createSchema(newSchema);

  const breakages = findBreakingChanges(oldSchemaAST, newSchemaAST);

  if (breakages.length === 0) {
    console.log(chalk.green("Changes are backwards compatible"));
  } else {
    console.error(chalk.red("Breaking changes found"));
    console.error("Please deprecate these fields instead of removing:");

    breakages.forEach(breakage => {
      console.error(`  ${breakage.type}: ${breakage.description}`);
    });
    console.log();

    process.exitCode = 1;
  }
};

const deleteClonedRepo = () => {
  del(["scripts/previousSchema"]).then(paths => {
    console.log("Deleted files and folders:\n", paths.join("\n"));
  });
};

try {
  createSchema(schema);
  console.log(chalk.green("Valid schema"));
} catch (e) {
  console.error(chalk.red("Invalid schema:"));
  console.error(e.message);

  process.exitCode = 1;
  return;
}

getMasterSchema()
  .then(oldSchema => {
    findBreakingChangesBetweenCurrentAndPrevious(oldSchema, schema);
  })
  .then(() => {
    deleteClonedRepo();
  })
  .catch(error => {
    console.error(chalk.red(error));
    deleteClonedRepo();
  });
