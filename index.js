const routingDefs = require("./schema/routingDefs");
const structuralDefs = require("./schema/structuralDefs");

const query = `
  type Query {
    pagesAffectedByDeletion(pageId: ID!): [Page]!
    availableRoutingDestinations(pageId: ID!): AvailableRoutingDestinations!
    questionnaires: [Questionnaire]
    questionnaire(id: ID!): Questionnaire
    section(id: ID!): Section
    page(id: ID!): Page
    questionPage(id: ID!): QuestionPage
    answer(id: ID!): Answer
    answers(ids: [ID]!): [Answer]
    option(id: ID!): Option
  }
`;

const mutations = `
    type Mutation {
      createRoutingRuleSet(input: CreateRoutingRuleSetInput!): RoutingRuleSet
      updateRoutingRuleSet(input: UpdateRoutingRuleSetInput!): RoutingRuleSet
      deleteRoutingRuleSet(input: DeleteRoutingRuleSetInput!): RoutingRuleSet
      resetRoutingRuleSetElse(input: ResetRoutingRuleSetElseInput!): RoutingRuleSet
  
      createRoutingRule(input: CreateRoutingRuleInput!): RoutingRule
      updateRoutingRule(input: UpdateRoutingRuleInput!): RoutingRule
      deleteRoutingRule(input: DeleteRoutingRuleInput!): RoutingRule
      undeleteRoutingRule(input: UndeleteRoutingRuleInput!): RoutingRule
  
      createRoutingCondition(input: CreateRoutingConditionInput!): RoutingCondition
      updateRoutingCondition(input: UpdateRoutingConditionInput!): RoutingCondition
      deleteRoutingCondition(input: DeleteRoutingConditionInput!): RoutingCondition
  
      toggleConditionOption(
        input: ToggleConditionOptionInput!
      ): RoutingConditionValue
      createQuestionnaire(input: CreateQuestionnaireInput!): Questionnaire
      updateQuestionnaire(input: UpdateQuestionnaireInput!): Questionnaire
      deleteQuestionnaire(input: DeleteQuestionnaireInput!): Questionnaire
      undeleteQuestionnaire(input: UndeleteQuestionnaireInput!): Questionnaire
    
      createSection(input: CreateSectionInput!): Section
      updateSection(input: UpdateSectionInput!): Section
      deleteSection(input: DeleteSectionInput!): Section
      undeleteSection(input: UndeleteSectionInput!): Section
      moveSection(input: MoveSectionInput!): Section
    
      createPage(input: CreatePageInput!): Page
      updatePage(input: UpdatePageInput!): Page
      deletePage(input: DeletePageInput!): Page
      undeletePage(input: UndeletePageInput!): Page
      movePage(input: MovePageInput!): Page
    
      createQuestionPage(input: CreateQuestionPageInput!): QuestionPage
      updateQuestionPage(input: UpdateQuestionPageInput!): QuestionPage
      deleteQuestionPage(input: DeleteQuestionPageInput!): QuestionPage
      undeleteQuestionPage(input: UndeleteQuestionPageInput!): QuestionPage
    
      createAnswer(input: CreateAnswerInput!): Answer
      updateAnswer(input: UpdateAnswerInput!): Answer
      deleteAnswer(input: DeleteAnswerInput!): Answer
      undeleteAnswer(input: UndeleteAnswerInput!): Answer
    
      createOption(input: CreateOptionInput!): Option
      updateOption(input: UpdateOptionInput!): Option
      deleteOption(input: DeleteOptionInput!): Option
      undeleteOption(input: UndeleteOptionInput!): Option
      createOther(input: CreateOtherInput!): OptionWithAnswer
      deleteOther(input: DeleteOtherInput!): OptionWithAnswer
  }
`;

module.exports = [query, mutations, routingDefs, structuralDefs];
