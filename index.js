module.exports = `
scalar Date

type Questionnaire {
  id: Int
  newId: ID
  title: String
  description: String
  theme: Theme
  legalBasis: LegalBasis
  navigation: Boolean
  surveyId: String
  createdAt: Date
  sections: [Section]
}

type Section {
  id: Int
  newId: ID
  title: String!
  description: String
  pages: [Page]
  questionnaire: Questionnaire
}

interface Page {
  id: Int
  newId: ID
  title: String!
  description: String
  pageType: PageType!
  section: Section
}

type QuestionPage implements Page {
  id: Int
  newId: ID
  title: String!
  description: String!
  guidance: String
  pageType: PageType!
  answers: [Answer]
  section: Section
}

interface Answer {
  id: Int
  newId: ID
  description: String
  guidance: String
  qCode: String
  label: String
  type: AnswerType!
  mandatory: Boolean
  page: QuestionPage
}

type BasicAnswer implements Answer {
  id: Int
  newId: ID
  description: String
  guidance: String
  qCode: String
  label: String
  type: AnswerType!
  mandatory: Boolean
  page: QuestionPage
}

type MultipleChoiceAnswer implements Answer {
  id: Int
  newId: ID
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
  id: Int
  newId: ID
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
  questionnaire(id: Int, newId: ID): Questionnaire
  section(id: Int, newId: ID): Section
  page(id: Int, newId: ID): Page
  questionPage(id: Int, newId: ID): QuestionPage
  answer(id: Int, newId: ID): Answer
  option(id: Int, newId: ID): Option
}

type Mutation {
  # creates a Questionnaire along with an initial Section and Page
  createQuestionnaire(
    title: String
    description: String
    theme: String
    legalBasis: LegalBasis
    navigation: Boolean
    surveyId: String
    input: CreateQuestionnaireInput
  ): Questionnaire
  updateQuestionnaire(
    id: Int
    title: String
    description: String
    theme: String
    legalBasis: LegalBasis
    navigation: Boolean
    surveyId: String
    input: UpdateQuestionnaireInput
  ): Questionnaire
  deleteQuestionnaire(id: Int, input: DeleteQuestionnaireInput): Questionnaire
  createSection(
    title: String
    description: String
    questionnaireId: Int
    input: CreateSectionInput
  ): Section
  updateSection(
    id: Int
    title: String
    description: String
    input: UpdateSectionInput
  ): Section
  deleteSection(id: Int, input: DeleteSectionInput): Section
  createPage(
    title: String
    description: String
    sectionId: Int
    input: CreatePageInput
  ): Page
  updatePage(
    id: Int
    title: String
    description: String
    input: UpdatePageInput
  ): Page
  deletePage(id: Int, input: DeletePageInput): Page
  createQuestionPage(
    title: String
    description: String
    guidance: String
    sectionId: Int
    input: CreateQuestionPageInput
  ): QuestionPage
  updateQuestionPage(
    id: Int
    title: String
    description: String
    guidance: String
    input: UpdateQuestionPageInput
  ): QuestionPage
  deleteQuestionPage(id: Int, input: DeleteQuestionPageInput): QuestionPage
  createAnswer(
    description: String
    guidance: String
    label: String
    qCode: String
    type: AnswerType
    mandatory: Boolean
    questionPageId: Int
    input: CreateAnswerInput
  ): Answer
  updateAnswer(
    id: Int
    description: String
    guidance: String
    label: String
    qCode: String
    type: AnswerType
    mandatory: Boolean
    input: UpdateAnswerInput
  ): Answer
  deleteAnswer(id: Int, input: DeleteAnswerInput): Answer
  createOption(
    label: String
    description: String
    value: String
    qCode: String
    childAnswerId: Int
    answerId: Int
    input: CreateOptionInput
  ): Option
  updateOption(
    id: Int
    label: String
    description: String
    value: String
    qCode: String
    childAnswerId: Int
    input: UpdateOptionInput
  ): Option
  deleteOption(id: Int, input: DeleteOptionInput): Option
}

input CreateQuestionnaireInput {
  title: String!
  description: String
  theme: String!
  legalBasis: LegalBasis!
  navigation: Boolean
  surveyId: String!
}

input UpdateQuestionnaireInput {
  id: ID!
  title: String
  description: String
  theme: String
  legalBasis: LegalBasis
  navigation: Boolean
  surveyId: String
}

input DeleteQuestionnaireInput {
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

`;
