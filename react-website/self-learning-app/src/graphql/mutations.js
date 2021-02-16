/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLayout = /* GraphQL */ `
  mutation CreateLayout(
    $input: CreateLayoutInput!
    $condition: ModelLayoutConditionInput
  ) {
    createLayout(input: $input, condition: $condition) {
      id
      gridParams {
        w
        h
      }
      elements {
        id
        content
        rect {
          x
          y
          w
          h
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateLayout = /* GraphQL */ `
  mutation UpdateLayout(
    $input: UpdateLayoutInput!
    $condition: ModelLayoutConditionInput
  ) {
    updateLayout(input: $input, condition: $condition) {
      id
      gridParams {
        w
        h
      }
      elements {
        id
        content
        rect {
          x
          y
          w
          h
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteLayout = /* GraphQL */ `
  mutation DeleteLayout(
    $input: DeleteLayoutInput!
    $condition: ModelLayoutConditionInput
  ) {
    deleteLayout(input: $input, condition: $condition) {
      id
      gridParams {
        w
        h
      }
      elements {
        id
        content
        rect {
          x
          y
          w
          h
        }
      }
      createdAt
      updatedAt
    }
  }
`;
