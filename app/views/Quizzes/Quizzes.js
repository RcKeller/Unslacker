import React from 'react'
import Helmet from 'react-helmet'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { connectRequest } from 'redux-query'

import { Link } from 'react-router'

import api from '../../services'

import { Paper } from 'react-md'

@compose(
  connect(state => ({
    config: state.config,
    user: state.user,
    quizzes: state.db.quizzes || []
  })),
  connectRequest(() => api.get('quizzes'))
)
class Quizzes extends React.Component {
  render ({ user, db, quizzes } = this.props) {
    return (
      <article>
        <Helmet title='Home' />
        <Paper zIndex={1}>
          <section>
            <h3>Quizzes</h3>
            <ul>
              {quizzes.map((q, i) => (
                <li key={i}>
                  <Link
                    to={`/quizzes/${q._id}`}
                  >
                    {q.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </Paper>
      </article>
    )
  }
}

export default Quizzes
