import React from 'react'
import Dispatcher from './Dispatcher'

function displayName(Component) {
  return Component.name || Component.displayName || 'Component'
}

export function provide(dispatcher, Component) {
  const ComposedComponent = class extends React.Component {
    // Handling child context
    getChildContext() {
      return {
        dispatcher
      }
    }

    // Render shim
    render() {
      return <Component {...this.props} />
    }
  }

  ComposedComponent.displayName = 'Providing' + displayName(Component)
  ComposedComponent.childContextTypes = {
    dispatcher: React.PropTypes.instanceOf(Dispatcher),
  }

  return ComposedComponent
}

export function connect(Component) {
  const ComposedComponent = class extends React.Component {
    render() {
      const suppl = this.context.dispatcher.actions;

      return <Component {...this.props} dispatch={this.context.dispatcher.dispatch} {...suppl} />;
    }
  }

  ComposedComponent.displayName = 'Connected' + displayName(Component)
  ComposedComponent.contextTypes = {
    dispatcher: React.PropTypes.instanceOf(Dispatcher)
  };

  return ComposedComponent
}
