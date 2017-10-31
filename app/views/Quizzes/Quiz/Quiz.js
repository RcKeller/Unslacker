import React from 'react'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import api from '../../../services'

import { Paper } from 'react-md'

@compose(
  connect(state => ({
    config: state.config,
    user: state.user,
    responses: state.db.responses
  })),
  connectRequest((props) => api.get('responses', {
    query: { quiz: props.params.quiz }
  }))
)
class Quiz extends React.Component {
  render ({ user, db, responses } = this.props) {
    return (
      <article>
        <Helmet title='Home' />
        <Paper zIndex={1}>
          <section>
            <h3>Quizzes</h3>
            <code>{JSON.stringify(responses)}</code>
          </section>
        </Paper>
      </article>
    )
  }
}

export default Quiz
