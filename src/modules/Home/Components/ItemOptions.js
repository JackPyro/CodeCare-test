import React, { Component } from 'react'
import styled from 'styled-components'

class ItemOptions extends Component {
  deselect = () => {
    this.props.select(null)
  }

  deleteItem = () => {
    const {selected, deleteEvent} = this.props
    if (selected && selected._id) {
      deleteEvent(selected._id)
      this.deselect()
    } else {
    }
  }

  exportJSON = () => {
    this.props.exportEvents()
  }

  render () {
    const {selected} = this.props
    return (
      <div>
        <button type="button" onClick={this.deselect}>Create</button>
        <button disabled={!selected} onClick={this.deleteItem}>Delete</button>
        <a href="/api/events/export" target="_blank">Export JSON</a>
      </div>
    )
  }
}

export default ItemOptions