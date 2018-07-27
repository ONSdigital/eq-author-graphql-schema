const queries = require("./queries");
const routingDefs = require("./routingDefs");
const structuralDefs = require("./structuralDefs");

const query = `
  type Query {
    _empty: String
  }
`;

const mutations = `
    type Mutation {
    _empty: String
  }
`;

module.exports = [query, mutations, queries, routingDefs, structuralDefs];
