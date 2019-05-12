import React, { Component, Fragment } from 'react'

let lastId = 0

class ShowNews extends Component {

  links = (item) => {
    return item.links.map((link, index) => {
      return (
        <Fragment key={index}>
          <span className='badge badge-info ml-2'>
            <span
              onClick={() => this.props.deleteLink(item.id, index)}
              className='badge badge-secondary ml-1'
            >
              X
            </span>
            {link}
          </span>
        </Fragment>
      )
    })
  }

  deleteRow = (id) => {
    const { news } = this.props.state
    const index = news.findIndex((item) => item.id === id)
    if (index > -1) {
      news.splice(id - 1, 1)

    }
    this.setState({ news: news })
  }

  editableFields = (item) => {
    const { isEditing } = this.props.state

    if (isEditing.id === item.id) {
      return <input onKeyUp={(e) => this.props.setValueTitle(e, item.id)} defaultValue={item.title}/>
    }
    return <span>{item.title}</span>
  }

  render () {

    const { news } = this.props.state

    const newsItems = news.map((item) => {
      lastId = item.id

      return (
        <tr key={item.id}>
          <th scope="row">
            <span>{item.id}</span>
          </th>
          <td
            onClick={() => this.props.decreaseRequest(item.id)}
            onDoubleClick={() => this.props.setEditable(item)}
          >
            {this.editableFields(item)}
          </td>
          <td>
            <button
              className='badge badge-success float-right p-2 ml-3'
              onClick={() => this.props.toggleNested(item.id)}>+
            </button>
            {this.links(item)}
          </td>
          <td>{item.request}</td>
          <td>
            <span className='btn btn-danger'
                  onClick={() => this.deleteRow(item.id)}>حذف
            </span>
          </td>
        </tr>
      )
    })

    this.props.getLastId(lastId)
    return newsItems

  }

}

export default ShowNews