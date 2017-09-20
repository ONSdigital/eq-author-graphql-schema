module.exports = `

scalar Date

type Questionnaire {
    id: Int
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
    title: String!
    description: String
    pages: [Page]
    questionnaire: Questionnaire
}

interface Page {
    id: Int!
    title: String!
    description: String
    pageType: PageType!
    section: Section
}

type QuestionPage implements Page {
    id: Int!
    title: String!
    description: String!
    guidance: String
    pageType: PageType!
    answers:  [Answer]
    section: Section
}

interface Answer {
    id: Int!
    description: String
    guidance: String
    qCode: String
    label: String
    type: AnswerType!
    mandatory: Boolean
    page: QuestionPage
}

type BasicAnswer implements Answer {
    id: Int!
    description: String
    guidance: String
    qCode: String
    label: String
    type: AnswerType!
    mandatory: Boolean
    page: QuestionPage
}

type MultipleChoiceAnswer implements Answer {
    id: Int!
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
    id: Int!
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
    questionnaire(id: Int!): Questionnaire
    section(id: Int!): Section
    page(id: Int!): Page
    questionPage(id: Int!): QuestionPage
    answer(id: Int!): Answer
    option(id: Int!): Option
}

type Mutation {
    # creates a Questionnaire along with an initial Section and Page
    createQuestionnaire(title: String!, description: String, theme: String!, legalBasis: LegalBasis!, navigation: Boolean, surveyId: String!) : Questionnaire
    updateQuestionnaire(id: Int!, title: String, description: String, theme: String, legalBasis: LegalBasis, navigation: Boolean, surveyId: String) : Questionnaire
    deleteQuestionnaire(id: Int!) : Questionnaire

    createSection(title: String!, description: String, questionnaireId: Int!) : Section
    updateSection(id: Int!, title: String, description: String) : Section
    deleteSection(id: Int!) : Section

    createPage(title: String!, description: String, sectionId: Int!) : Page
    updatePage(id: Int!, title: String!, description: String) : Page
    deletePage(id: Int!) : Page

    createQuestionPage(title: String!, description: String, guidance: String, sectionId: Int!) : QuestionPage
    updateQuestionPage(id: Int!, title: String, description: String, guidance: String) : QuestionPage
    deleteQuestionPage(id: Int!) : QuestionPage

    createAnswer(description: String, guidance: String, label: String, qCode: String, type: AnswerType!, mandatory: Boolean!, questionPageId: Int!) : Answer
    updateAnswer(id: Int!, description: String, guidance: String, label: String, qCode: String, type: AnswerType, mandatory: Boolean) : Answer
    deleteAnswer(id: Int!) : Answer
    
    createOption(label: String, description: String, value: String, qCode: String, childAnswerId: Int, answerId: Int!) : Option
    updateOption(id: Int!, label: String, description: String, value: String, qCode: String, childAnswerId: Int) : Option
    deleteOption(id: Int!) : Option
}
`;
