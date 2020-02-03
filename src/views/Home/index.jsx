import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <img
          src="https://images.unsplash.com/photo-1557367184-663fba4b8b91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" 
          alt="remote work"
          className="img-block img--hero"/>
        <div className="container">
          <p className="text-center mrgv++">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae pariatur minima amet molestias quidem earum veniam, iusto praesentium alias eius neque libero, corrupti similique voluptatem magnam? Ex nobis nulla illum.</p>
        </div>
      </div>
    )
  }
}