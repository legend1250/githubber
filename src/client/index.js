import { Platform } from 'react-native'
import { ApolloClient } from 'apollo-client'
import { ApolloLink, split } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { withClientState } from 'apollo-link-state'
import {
  SERVER_URI_ANDROID,
  SERVER_URI_IOS,
  SERVER_SUB_ANDROID,
  SERVER_SUB_IOS
} from 'react-native-dotenv'
import { onError } from 'apollo-link-error'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const apolloCache = new InMemoryCache()

/**
 * REMOTE DATA
 */
const httpLink = createHttpLink({
  uri: Platform.OS === 'android' ? SERVER_URI_ANDROID : SERVER_URI_IOS
})

/* eslint-disable */

const ws_client = new SubscriptionClient(
  Platform.OS === 'android' ? SERVER_SUB_ANDROID : SERVER_SUB_IOS,
  {
    reconnect: true
  }
)
const wsLink = new WebSocketLink(ws_client)

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

/* eslint-disable */

const networkLink = new ApolloLink((operation, forward) => {
  // operation.setContext({
  //   headers: {
  //     'x-token': SERVER_URI,
  //   },
  // });

  return forward(operation)
})
/**
 * LOCAL DATA
 */
const defaults = {
  language: {
    value: 'JS',
    __typename: 'ProgrammingLanguage'
  }
}

const resolvers = {
  Mutation: {
    setLanguage: (_, { language }, { cache }) => {
      const newLanguage = { value: language, __typename: 'ProgrammingLanguage' }
      const data = { language: newLanguage }
      cache.writeData({ data })
      return newLanguage
    }
  }
}

const stateLink = withClientState({
  cache: apolloCache,
  defaults,
  resolvers
})

/**
 * ERROR HANDLING
 */

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`) // eslint-disable-line
    })
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`) // eslint-disable-line
  }
})

/**
 * APOLLO CLIENT
 */
const client = new ApolloClient({
  link: ApolloLink.from([stateLink, errorLink, networkLink, terminatingLink]), // order matters
  cache: apolloCache
})

export default client
