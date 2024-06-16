import { gql } from '@apollo/client';
import {REPOSITORY_DETAILS} from "./fragments";

export const GET_REPOSITORIES = gql`
query ExampleQuery {
  repositories {
    edges {
      node {
        ...RepositoryDetails
      }
    }
  }
}
${REPOSITORY_DETAILS}
`;

export const ME = gql`
query Query {
  me {
    username
  }
}
`