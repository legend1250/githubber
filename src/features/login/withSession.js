import React from 'react'
import { Query } from 'react-apollo'
import { queries } from '../../client'
import Error from '../../components/Error'
import Loading from '../../components/Loading'

const withSession = (Component) => (props) => (
  <Query query={queries.GET_ME}>
    {({ data, error, loading, refetch }) => {
      if (error) {
        return <Error />
      }
      // console.log('error: ' ,error);
      if (loading) {
        return <Loading />
      }
      return <Component {...props} session={data} refetch={refetch} />
    }}
  </Query>
)

export default withSession
