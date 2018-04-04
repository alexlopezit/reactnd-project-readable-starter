import React from 'react'

export default class Header extends React.Component {
  render() {
    return (
      <div className="blog-header">
        <h1 className="blog-title">Readable Blog</h1>
        <p className="lead blog-description">The official blog.</p>
        <hr/>
      </div>
    )
  }
}