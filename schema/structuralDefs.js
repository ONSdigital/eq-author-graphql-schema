module.exports = `
  scalar Date

  scalar JSON

  type User {
    name: String!
  }

  extend type Query {
    questionnaires: [Questionnaire]
    questionnaire(id: ID!): Questionnaire
    section(id: ID!): Section
    page(id: ID!): Page
    questionPage(id: ID!): QuestionPage
    answer(id: ID!): Answer
    answers(ids: [ID]!): [Answer]
    option(id: ID!): Option
  }

  enum TextFormat {
    HTML
    Plaintext
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
    title(format: TextFormat = HTML): String!
    description: String
    pages: [Page]
    questionnaire: Questionnaire
    position: Int!
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
    title(format: TextFormat = HTML): String!
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
    mandatory: Boolean @deprecated(reason: "Use \`properties\` instead.")
    page: QuestionPage
    properties: JSON
  }

  type BasicAnswer implements Answer {
    id: ID!
    description: String
    guidance: String
    qCode: String
    label: String
    secondaryLabel: String
    type: AnswerType!
    mandatory: Boolean @deprecated(reason: "Use \`properties\` instead.")
    page: QuestionPage
    properties: JSON
  }

  type MultipleChoiceAnswer implements Answer {
    id: ID!
    description: String
    guidance: String
    qCode: String
    label: String
    type: AnswerType!
    mandatory: Boolean @deprecated(reason: "Use \`properties\` instead.")
    options: [Option]
    other: OptionWithAnswer
    page: QuestionPage
    properties: JSON
  }

  type CompositeAnswer implements Answer {
    id: ID!
    description: String
    guidance: String
    qCode: String
    label: String
    type: AnswerType!
    mandatory: Boolean @deprecated(reason: "Use \`properties\` instead.")
    page: QuestionPage
    childAnswers: [BasicAnswer]!
    properties: JSON
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

    extend type Mutation {
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
      position: Int
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
      mandatory: Boolean @deprecated(reason: "Use \`properties\` instead.")
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
      mandatory: Boolean @deprecated(reason: "Use \`properties\` instead.")
      properties: JSON
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
    
    input MoveSectionInput {
      id: ID!
      questionnaireId: ID!
      position: Int!
    }
    
    input CreateOtherInput {
      parentAnswerId: ID!
    }
    
    input DeleteOtherInput {
      parentAnswerId: ID!
    }
`;
