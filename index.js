const routingDefs = require("./schema/routingDefs");
const structuralDefs = require("./schema/structuralDefs");

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

module.exports = [query, mutations, routingDefs, structuralDefs];
