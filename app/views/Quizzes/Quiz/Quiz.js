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
    quiz: state.db.quiz || {}
  })),
  connectRequest((props) => api.get('quiz', {
    id: props.params.id,
    populate: [{ path: 'responses', populate: { path: 'user' } }]
  }))
)
class Quiz extends React.Component {
  render ({ user, db, quiz } = this.props) {
    const { title, body, responses } = quiz
    return (
      <article>
        <Helmet title='Home' />
        <Paper zIndex={1}>
          <section>
            <h3>{title || 'Untitled Quiz'}</h3>
            <code>{body}</code>
            <hr />
            <h2>Responses:</h2>
            {responses && responses.map((r, i) => (
              <div>
                <b>{r.user ? `${r.user.name}: ` : 'Anonymous: '}</b>
                <em>{r.title}</em>
                <p>{r.body}</p>
              </div>
              // <code>
              //   {JSON.stringify(r)}
              // </code>
            ))}
          </section>
        </Paper>
      </article>
    )
  }
}

export default Quiz
