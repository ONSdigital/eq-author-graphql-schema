module.exports = `  

  extend type Query {
    pagesAffectedByDeletion(pageId: ID!): [Page]!
    availableRoutingDestinations(pageId: ID!): AvailableRoutingDestinations!
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

  enum LogicalDestinations {
    NextPage
    EndOfQuestionnaire
  }

  enum AbsoluteDestinationTypes {
    Section
    QuestionPage
  }

  union AbsoluteDestinations = QuestionPage | Section

  type AbsoluteDestination {
    absoluteDestination: AbsoluteDestinations!
  }

  type LogicalDestination {
    id: ID!
    logicalDestination: LogicalDestinations!
  }

  union RoutingDestination = AbsoluteDestination | LogicalDestination

  type AvailableRoutingDestinations {
    logicalDestinations: [LogicalDestination]!
    questionPages: [QuestionPage]!
    sections: [Section]!
  }

  type RoutingCondition {
    id: ID!
    comparator: RoutingComparator
    questionPage: QuestionPage
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
    Equal
  }

  extend type Mutation {
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
  }

  input CreateRoutingRuleSetInput {
    questionPageId: ID!
  }

  input UpdateRoutingRuleSetInput {
    id: ID!
    else: RoutingDestinationInput!
  }

  input DeleteRoutingRuleSetInput {
    id: ID!
  }

  input ResetRoutingRuleSetElseInput {
    id: ID!
  }

  input CreateRoutingRuleInput {
    operation: RoutingOperation!
    routingRuleSetId: ID!
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
    questionPageId: ID!
    answerId: ID
    routingRuleId: ID!
  }

  input UpdateRoutingConditionInput {
    id: ID!
    questionPageId: ID!
    answerId: ID
  }

  input DeleteRoutingConditionInput {
    id: ID!
  }

  input ToggleConditionOptionInput {
    optionId: ID
    conditionId: ID!
    checked: Boolean!
  }

  input LogicalDestinationInput {
    destinationType: LogicalDestinations!
  }

  input AbsoluteDestinationInput {
    destinationType: AbsoluteDestinationTypes!
    destinationId: ID!
  }

  input RoutingDestinationInput {
    logicalDestination: LogicalDestinationInput
    absoluteDestination: AbsoluteDestinationInput
  }
`;
