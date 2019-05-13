import React, { Component, Fragment } from 'react'
import { news } from './data'
import { Button, ModalBody, ModalFooter } from 'reactstrap'
import FormGroup from 'reactstrap/es/FormGroup'
import Input from 'reactstrap/es/Input'
import ShowNews from './ShowNews'
import CustomModal from './customModal'

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
    newValueTitle: null,
    lastId: 0,
    checkDelete: []
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

  decreaseRequest = (id) => {
    const { news } = this.state
    const index = news.findIndex((item) => item.id === id)
    if (index > -1) {
      news[index].request -= 1
    }
    this.setState({ news: news })

  }

  deleteLink = (id, indexArr) => {
    const { news } = this.state
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
    this.setState({ news: [...this.state.news, { id: this.state.lastId + 1, ...temp, }] })
    this.setState({ temp: {} })
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

  deleteSelected = () => {
    const { news, checkDelete } = this.state
    checkDelete.map((item) => {
      const indexNews = news.findIndex((news) => news.id === item)
      return news.splice(indexNews, 1)

    })
    this.setState({ news: news })
  }

  render () {
    console.log(this.state.checkDelete)

    return (
      <Fragment>

        <table className="table table-striped table-hover">
          <thead>
          <tr className='text-center'>
            <th scope="col">#</th>
            <th scope="col">عنوان خبرگذاری</th>
            <th scope="col">لینک های خبرگذاری</th>
            <th scope="col">درخواست ها</th>
            <th scope="col">حذف </th>
            <th scope="col">انتخاب</th>
          </tr>
          </thead>
          <tbody>

          <ShowNews
            state={this.state}
            decreaseRequest={this.decreaseRequest}
            setEditable={this.setEditable}
            setValueTitle={this.setValueTitle}
            toggleNested={this.toggleNested}
            deleteLink={this.deleteLink}
            getLastId={(lastId) => this.state.lastId !== lastId ? this.setState({ lastId: lastId }) : null}
            getCheckDelete={(id) => this.setState({ checkDelete: [...this.state.checkDelete, id] })}
          />

          </tbody>

        </table>
        <button className='btn btn-danger float-left' onClick={this.deleteSelected}>حذف همه انتخاب ها </button>
        <Button color="success" onClick={this.toggle}>+ افزودن خبرگذاری جدید</Button>

        <CustomModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          header='درج خبرگذاری جدید'
          children={
            <ModalBody>
              <FormGroup>
                <Input name='title' onChange={this.getValue}
                       placeholder="عنوان خبرگذاری جدید را وارد نمایید"/>
              </FormGroup>
              <FormGroup>
                <Input name="links" onChange={this.getValue} placeholder="لینک های این خبرگذاری را وارد نمایید"/>
              </FormGroup>
              <FormGroup>
                <Input name="request" onChange={this.getValue} placeholder="تعداد درخواست"/>
              </FormGroup>
              <ModalFooter>
                <Button color="primary" onClick={this.addRow}>افزودن</Button>{' '}
                <Button className='mr-3' color="danger" onClick={this.toggle}>انصراف</Button>
              </ModalFooter>
            </ModalBody>
          }
        />

        <CustomModal
          isOpen={this.state.nestedModal}
          toggle={this.toggleNested}
          header='افزودن لینک جدید'
          children={
            <ModalBody>
              <FormGroup>
                <Input onChange={this.setValueLink} placeholder='لینک جدید را وارد نمایید'/>
              </FormGroup>
              <ModalFooter>
                <Button color="primary" onClick={this.addLink}>افزودن</Button>{' '}
                <Button color="danger mr-2" onClick={this.toggleNested}>انصراف </Button>
              </ModalFooter>
            </ModalBody>

          }
        />
      </Fragment>
    )
  }
}

export default News