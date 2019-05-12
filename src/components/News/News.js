import React, { Component } from 'react'
import { news } from './data'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import FormGroup from 'reactstrap/es/FormGroup'
import Input from 'reactstrap/es/Input'

let lastId = 0

class News extends Component {
  state = {
    news: news,
    modal: false,
    nestedModal: false,
    closeAll: false,
    temp: {},
    link: null,
    current_id: null,
    isEditing: {},
    newValueTitle: null
  }
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  toggleNested = (id) => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
      current_id: id
    })
  }

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    })
  }

  decreaseRequest = (id) => {
    const news = this.state.news
    const index = news.findIndex((item) => item.id === id)
    if (index > -1) {
      news[index].request -= 1
    }
    this.setState({ news: news })

  }

  deleteLink = (id, indexArr) => {
    const {news}=this.state
    const item = news.map((item) => {
      if (item.id === id) {
        const arr = item.links
        arr.splice(indexArr, 1)
      }
      return item
    })
    this.setState({ news: item })
  }

  setValueLink = (e) => {
    this.setState({ link: e.target.value })
  }

  addLink = () => {
    const { news, link, current_id } = this.state
    const index = news.findIndex((item) => item.id === current_id)
    if (index > -1) {
      console.log(link)
      news[index].links = [...news[index].links, link]
      this.setState({ news: news })
    }

    this.toggleNested()
  }

  showNews = () => {
    const { isEditing } = this.state

    return this.state.news.map((item) => {
      lastId = item.id

      return (
        <tr key={item.id}>
          <th scope="row">
            <span>{item.id}</span>
          </th>
          <td
            onClick={() => this.decreaseRequest(item.id)}
            onDoubleClick={() => this.setEditable(item)}
          >
            {
              isEditing.id === item.id
                ? <input onKeyUp={(e) => this.setValueTitle(e, item.id)} defaultValue={item.title}/>
                : <span>{item.title}</span>
            }
          </td>
          <td>
            <button className='badge badge-success float-right p-2 ml-3 '
                    onClick={() => this.toggleNested(item.id)}>+
            </button>
            {
              item.links.map((link, index) => {
                return (

                  <span key={index} className='badge badge-info ml-2'> <span
                    onClick={() => this.deleteLink(item.id, index)}
                    className='badge badge-danger ml-1'>X</span>{link}</span>
                )
              })
            }
          </td>
          <td>
            {item.request}
          </td>
        </tr>
      )
    })
  }
  setEditable = (item) => {
    this.setState({ isEditing: item })
  }

  setValueTitle = (e, id) => {
    const { news } = this.state

    if (e.keyCode === 13) {
      this.setState({ ...this.state, isEditing: {} })

    }

    const index = news.findIndex((item) => item.id === id)
    if (index > -1) {
      news[index].title = e.target.value
      this.setState({ news: news })
    }

  }

  addRow = () => {
    const { temp } = this.state
    this.setState({ news: [...this.state.news, { id: lastId + 1 ,...temp, }] })
    this.setState({temp:{}})
    this.toggle()

  }

  getValue = (e) => {
    this.setState({
      temp: {
        ...this.state.temp,
        [e.target.name]: e.target.name === 'links' ? [e.target.value] : e.target.value
      }
    })
  }

  render () {
    console.log(this.state)
    return (
      <div>

        <table className="table table-striped table-hover">
          <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">عنوان خبرگذاری</th>
            <th scope="col">لینک ها</th>
            <th scope="col">تعداد درخواست</th>
          </tr>
          </thead>
          <tbody>
          {this.showNews()}
          </tbody>
        </table>

        <div>
          <Button color="danger" onClick={this.toggle}>افزودن خبرگذاری جدید</Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>درج خبرگذاری جدید</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input name='title' onChange={this.getValue}
                       placeholder="عنوان خبرگذاری جدید را وارد نمایید"/>
              </FormGroup>
              <FormGroup>
                <Input name="links" onChange={this.getValue} placeholder="لینک ها"/>
              </FormGroup>
              <FormGroup>
                <Input name="request" onChange={this.getValue} placeholder="تعداد درخواست"/>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addRow}>درج</Button>{' '}
              <Button className='mr-3' color="danger" onClick={this.toggle}>انصراف</Button>
            </ModalFooter>
          </Modal>


          <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested}>
            <ModalHeader>افزودن لینک جدید </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Input onChange={this.setValueLink} placeholder='لینک جدید را وارد نمایید'/>
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addLink}>افزودن</Button>{' '}
              <Button color="secondary" onClick={this.toggleAll}>انصراف </Button>
            </ModalFooter>
          </Modal>

        </div>

      </div>
    )
  }
}

export default News