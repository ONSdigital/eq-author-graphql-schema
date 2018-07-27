module.exports = `
      extend type Query {
        questionnaires: [Questionnaire]
        questionnaire(id: ID!): Questionnaire
        section(id: ID!): Section
        page(id: ID!): Page
        questionPage(id: ID!): QuestionPage
        answer(id: ID!): Answer
        answers(ids: [ID]!): [Answer]
        option(id: ID!): Option
        pagesAffectedByDeletion(pageId: ID!): [Page]!
        availableRoutingDestinations(pageId: ID!): AvailableRoutingDestinations!
      }
    `;
