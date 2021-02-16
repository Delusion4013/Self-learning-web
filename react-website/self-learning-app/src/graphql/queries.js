/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLayout = /* GraphQL */ `
  query GetLayout($id: ID!) {
    getLayout(id: $id) {
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
export const listLayouts = /* GraphQL */ `
  query ListLayouts(
    $filter: ModelLayoutFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLayouts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        gridParams {
          w
          h
        }
        elements {
          id
          content
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
