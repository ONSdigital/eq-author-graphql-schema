module.exports = `
scalar Date

type User {
  name: String!
}

type Questionnaire {
  id: ID!
  title: String
  description: String
  theme: Theme
  legalBasis: LegalBasis
  navigation: Boolean
  surveyId: String
  createdAt: Date
  createdBy: User!
  sections: [Section]
  summary: Boolean
}

type Section {
  id: ID!
  title: String!
  description: String
  pages: [Page]
  questionnaire: Questionnaire
}

interface Page {
  id: ID!
  title: String!
  description: String
  pageType: PageType!
  section: Section
  position: Int!
}

type QuestionPage implements Page {
  id: ID!
  title: String!
  description: String!
  guidance: String
  pageType: PageType!
  answers: [Answer]
  section: Section
  position: Int!
  routingRuleSet: RoutingRuleSet
}

interface Answer {
  id: ID!
  description: String
  guidance: String
  qCode: String
  label: String
  type: AnswerType!
  mandatory: Boolean
  page: QuestionPage
}

type BasicAnswer implements Answer {
  id: ID!
  description: String
  guidance: String
  qCode: String
  label: String
  secondaryLabel: String
  type: AnswerType!
  mandatory: Boolean
  page: QuestionPage
}

type MultipleChoiceAnswer implements Answer {
  id: ID!
  description: String
  guidance: String
  qCode: String
  label: String
  type: AnswerType!
  mandatory: Boolean
  options: [Option]
  other: OptionWithAnswer
  page: QuestionPage
}

type Option {
  id: ID!
  label: String
  description: String
  value: String
  qCode: String
  answer: Answer
}

type OptionWithAnswer {
  option: Option!
  answer: BasicAnswer!
}

type RoutingRuleSet {
  id: ID!
  routingRules: [RoutingRule]
  questionPage: QuestionPage
  else: RoutingDestination
}

type RoutingRule {
  id: ID!
  operation: RoutingOperation
  conditions: [RoutingCondition]
  goto: RoutingDestination
}

union RoutingDestination = QuestionPage | Section 

type RoutingCondition {
  id: ID!
  comparator: RoutingComparator
  answer: Answer
  routingValue: RoutingConditionValue
}

type IDArrayValue {
  value: [ID]
}

union RoutingConditionValue = IDArrayValue

enum RoutingOperation {
  And
  Or
}

enum RoutingComparator {
  Equal,
  NotEqual
}

enum PageType {
  QuestionPage
  InterstitialPage
}

enum AnswerType {
  Checkbox
  Currency
  Date
  DateRange
  MonthYearDate
  Number
  Percentage
  Radio
  TextArea
  TextField
  Relationship
}

enum LegalBasis {
  Voluntary
  StatisticsOfTradeAct
}

enum Theme {
  default
  census
}

type Query {
  questionnaires: [Questionnaire]
  questionnaire(id: ID!): Questionnaire
  section(id: ID!): Section
  page(id: ID!): Page
  questionPage(id: ID!): QuestionPage
  answer(id: ID!): Answer
  answers(ids: [ID]!): [Answer]
  option(id: ID!): Option
  pagesAffectedByDeletion(pageId: ID!): [Page]!
  availableRoutingDestinations(pageId: ID!): [RoutingDestination]!
}

type Mutation {
  createQuestionnaire(input: CreateQuestionnaireInput!): Questionnaire
  updateQuestionnaire(input: UpdateQuestionnaireInput!): Questionnaire
  deleteQuestionnaire(input: DeleteQuestionnaireInput!): Questionnaire
  undeleteQuestionnaire(input: UndeleteQuestionnaireInput!): Questionnaire
  createSection(input: CreateSectionInput!): Section
  updateSection(input: UpdateSectionInput!): Section
  deleteSection(input: DeleteSectionInput!): Section
  undeleteSection(input: UndeleteSectionInput!): Section
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
  createRoutingRuleSet(input: CreateRoutingRuleSetInput!): RoutingRuleSet
  updateRoutingRuleSet(input: UpdateRoutingRuleSetInput!): RoutingRuleSet
  resetRoutingRuleSetElse(input: ResetRoutingRuleSetElseInput!): RoutingRuleSet
  createRoutingRule(input: CreateRoutingRuleInput!): RoutingRule
  updateRoutingRule(input: UpdateRoutingRuleInput!): RoutingRule
  deleteRoutingRule(input: DeleteRoutingRuleInput!): RoutingRule
  undeleteRoutingRule(input: UndeleteRoutingRuleInput!): RoutingRule
  createRoutingCondition(input: CreateRoutingConditionInput!): RoutingCondition
  updateRoutingConditionAnswer(input: UpdateRoutingConditionAnswerInput!): RoutingCondition
  deleteRoutingCondition(input: DeleteRoutingConditionInput!): RoutingCondition
  toggleConditionOption(input: ToggleConditionOptionInput!): RoutingConditionValue
}

input CreateQuestionnaireInput {
  title: String!
  description: String
  theme: String!
  legalBasis: LegalBasis!
  navigation: Boolean
  surveyId: String!
  summary: Boolean
  createdBy: String
}

input UpdateQuestionnaireInput {
  id: ID!
  title: String
  description: String
  theme: String
  legalBasis: LegalBasis
  navigation: Boolean
  surveyId: String
  summary: Boolean
}

input DeleteQuestionnaireInput {
  id: ID!
}

input UndeleteQuestionnaireInput {
  id: ID!
}

input CreateSectionInput {
  title: String!
  description: String
  questionnaireId: ID!
}

input UpdateSectionInput {
  id: ID!
  title: String
  description: String
}

input DeleteSectionInput {
  id: ID!
}

input UndeleteSectionInput {
  id: ID!
}

input CreatePageInput {
  title: String!
  description: String
  sectionId: ID!
  position: Int
}

input UpdatePageInput {
  id: ID!
  title: String!
  description: String
}

input DeletePageInput {
  id: ID!
}

input UndeletePageInput {
  id: ID!
}

input CreateQuestionPageInput {
  title: String!
  description: String
  guidance: String
  sectionId: ID!
  position: Int
}

input UpdateQuestionPageInput {
  id: ID!
  title: String
  description: String
  guidance: String
}

input DeleteQuestionPageInput {
  id: ID!
}

input UndeleteQuestionPageInput {
  id: ID!
}

input CreateAnswerInput {
  description: String
  guidance: String
  label: String
  secondaryLabel: String
  qCode: String
  type: AnswerType!
  mandatory: Boolean!
  questionPageId: ID!
}

input UpdateAnswerInput {
  id: ID!
  description: String
  guidance: String
  label: String
  secondaryLabel: String 
  qCode: String
  type: AnswerType
  mandatory: Boolean
}

input DeleteAnswerInput {
  id: ID!
}

input UndeleteAnswerInput {
  id: ID!
}

input CreateOptionInput {
  label: String
  description: String
  value: String
  qCode: String
  answerId: ID!
}

input UpdateOptionInput {
  id: ID!
  label: String
  description: String
  value: String
  qCode: String
}

input DeleteOptionInput {
  id: ID!
}

input UndeleteOptionInput {
  id: ID!
}

input MovePageInput {
  id: ID!
  sectionId: ID!
  position: Int!
}

input CreateOtherInput {
  parentAnswerId: ID!
}

input DeleteOtherInput {
  parentAnswerId: ID!
}

input CreateRoutingRuleSetInput {
  questionPageId: ID!
}

input UpdateRoutingRuleSetInput {
  id: ID!
  else: RoutingDestinationInput!
}

input ResetRoutingRuleSetElseInput {
  id: ID!
}

input CreateRoutingRuleInput {
  operation: RoutingOperation!
  routingRuleSetId: ID!
  goto: RoutingDestinationInput
}

input UpdateRoutingRuleInput {
  id: ID!
  operation: RoutingOperation
  goto: RoutingDestinationInput
}

input DeleteRoutingRuleInput {
  id: ID!
}

input UndeleteRoutingRuleInput {
  id: ID!
}

input CreateRoutingConditionInput {
  comparator: RoutingComparator!
  answerId: ID!
  routingRuleId: ID!
}

input UpdateRoutingConditionAnswerInput {
  id: ID!
  answerId: ID
}

input DeleteRoutingConditionInput {
  id: ID!
}

input ToggleConditionOptionInput {
  optionId: ID!
  conditionId: ID!
  checked: Boolean!
}

input RoutingDestinationInput {
  sectionId: ID!
  pageId: ID
}
`;
