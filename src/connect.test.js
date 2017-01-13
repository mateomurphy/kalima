import React, {Component, PropTypes} from 'react'
import Baobab from 'baobab'
import {mount} from 'enzyme'

import {root, branch} from './connect'
import Dispatcher from './Dispatcher'

const state = new Baobab({name: 'John'}, {asynchronous: false});

let test = function({state}, payload) {
  return payload
}

const dispatcher = new Dispatcher({state})

dispatcher.route({
  test: test
})


class BasicRoot extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

const Root = root(dispatcher, BasicRoot);

class Child extends Component {
  render() {
    return <span>Hello {this.context.dispatcher.dispatch({key: 'test', payload: ['foo']})}</span>;
  }
}

Child.contextTypes = {
  dispatcher: PropTypes.instanceOf(Dispatcher)
};

const wrapper = mount(<Root><Child /></Root>);

it('passed the context handlers', () => {
  expect(wrapper.text()).toEqual('Hello foo');
})
