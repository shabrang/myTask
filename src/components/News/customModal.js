import React, { Component } from 'react'
import {  Modal, ModalHeader } from 'reactstrap'

class CustomModal extends Component {
  render () {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>{this.props.header}</ModalHeader>

        {this.props.children}

      </Modal>
    )
  }
}

export default CustomModal