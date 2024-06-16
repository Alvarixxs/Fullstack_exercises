import {gql} from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
   fragment RepositoryDetails on Repository {
     description
     fullName
     language
     stargazersCount
     forksCount
     ratingAverage
     reviewCount
     ownerAvatarUrl
  }
 `