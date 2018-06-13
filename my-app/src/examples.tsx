import React, { Component } from 'react'
// import { render } from 'react-dom'

type Props = {
  /**
   * just a name for greeting
   */
  greeting: string
}
export class HelloMessage extends Component<Props> {
  render() {
    return <div>Hello {this.props.greeting}</div>
  }
}

// const foo = {
//   type: 'div',
//   props: {
//     children: ['Hello', 'Jane'],
//   },
// }

// const mountNode = document.getElementById('app')

// render(<HelloMessage name="Jane" />, mountNode)

// class HelloMessage extends React.Component<Props> {
// render() {
//   return React.createElement('div', null, 'Hello ', this.props.name)
// }
// }

// render(React.createElement(HelloMessage, { name: 'Jane' }), mountNode)
