import gql from 'graphql-tag'

const GET_ME = gql`
  query {
    me {
      id
      username
      email
      role
      departments {
        id
        name
      }
    }
  }
`

const GET_LOCAL_SESSION = gql`
  {
    session @client {
      me {
        id
        username
        email
        role
        departments
      }
    }
  }
`

export { GET_ME, GET_LOCAL_SESSION }
