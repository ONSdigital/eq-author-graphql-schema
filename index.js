module.exports = `
scalar Date

type User {
  name: String!
}

type Questionnaire {
  id: ID!
  newId: ID @deprecated(reason: "use 'id' instead")
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
  newId: ID @deprecated(reason: "use 'id' instead")
  title: String!
  description: String
  pages: [Page]
  questionnaire: Questionnaire
}

interface Page {
  id: ID!
  newId: ID @deprecated(reason: "use 'id' instead")
  title: String!
  description: String
  pageType: PageType!
  section: Section
}

type QuestionPage implements Page {
  id: ID!
  newId: ID @deprecated(reason: "use 'id' instead")
  title: String!
  description: String!
  guidance: String
  pageType: PageType!
  answers: [Answer]
  section: Section
}

interface Answer {
  id: ID!
  newId: ID @deprecated(reason: "use 'id' instead")
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
  newId: ID @deprecated(reason: "use 'id' instead")
  description: String
  guidance: String
  qCode: String
  label: String
  type: AnswerType!
  mandatory: Boolean
  page: QuestionPage
}

type MultipleChoiceAnswer implements Answer {
  id: ID!
  newId: ID @deprecated(reason: "use 'id' instead")
  description: String
  guidance: String
  qCode: String
  label: String
  type: AnswerType!
  mandatory: Boolean
  options: [Option]
  page: QuestionPage
}

type Option {
  id: ID!
  newId: ID @deprecated(reason: "use 'id' instead")
  label: String
  description: String
  value: String
  qCode: String
  childAnswerId: Int
  answer: Answer
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
  questionnaire(id: ID!, newId: ID): Questionnaire
  section(id: ID!, newId: ID): Section
  page(id: ID!, newId: ID): Page
  questionPage(id: ID!, newId: ID): QuestionPage
  answer(id: ID!, newId: ID): Answer
  answers(ids: [ID]!): [Answer]
  option(id: ID!, newId: ID): Option
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
  childAnswerId: ID
  answerId: ID!
}

input UpdateOptionInput {
  id: ID!
  label: String
  description: String
  value: String
  qCode: String
  childAnswerId: ID
}

input DeleteOptionInput {
  id: ID!
}

input UndeleteOptionInput {
  id: ID!
}
`;
