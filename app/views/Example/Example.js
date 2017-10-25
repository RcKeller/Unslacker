import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import api from '../../services'

import Spreadsheet, { Editors } from '../../components/Spreadsheet'
const { SimpleNumber, TaxRate } = Editors

//  BUG: Selectors cannot select child props. Is this case handled in the data-grid docs?
const columns = [{
  name: 'Name',
  key: 'name',
  editable: true
}, {
  name: 'Description',
  key: 'description',
  editable: true,
  width: 300
}, {
  name: 'Price',
  key: 'price',
  editable: true,
  editor: SimpleNumber,
  width: 85
}, {
  name: 'Tax',
  key: 'tax',
  editable: true,
  editor: TaxRate,
  width: 85
}, {
  name: 'Quantity',
  key: 'quantity',
  editable: true,
  editor: SimpleNumber,
  width: 85
}]
const newData = { tax: 10.1, quantity: 1, price: 0 }

@connect(
    (state, props) => ({
      user: state.user,
      data: []
    }),
    dispatch => ({ api: bindActionCreators(api, dispatch) })
  )
class Example extends React.Component {
  static propTypes = {
    api: PropTypes.object,
    user: PropTypes.object,
    data: PropTypes.array
  }
  handleSubmit = (docs) => {
    const { api } = this.props
    console.log(docs, typeof api)
  }
  render ({ data } = this.props) {
    return (
      <article>
        <Helmet title='Example Component' />
        <section>
          <p>Example Spreadsheet</p>
          <Spreadsheet financial
            columns={columns}
            data={data}
            newData={newData}
            onSubmit={this.handleSubmit}
          />
        </section>
      </article>
    )
  }
}

export default Example

/*
//  Example API  call
const params = {
  populate: ['items'],
  transform: proposal => ({ proposal }),
  update: ({ proposal: (prev, next) => {
    let changed = Object.assign({}, prev)
    changed.manifests.push(next)
    return changed
  }})
}
//  Post it - partials are a one-time deal, they aren't patched after the fact.
api.post('manifest', partial, params)
.then(message.success(`Partial budget created! Please add it to the docket.`))
.catch(err => {
  message.warning(`Failed to create partial budget - Unexpected client error`)
  console.warn(err)
})
*/
