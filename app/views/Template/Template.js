import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Link } from 'react-router'

import Helmet from 'react-helmet'
import favicon from '../../images/favicon.ico'
const meta = [
  { charset: 'utf-8' },
  // Meta descriptions are commonly used on search engine result pages to
  // display preview snippets for a given page.
  { name: 'Unslacker Boilerplate', content: 'The Web Companion for Unslacker' },
  // Setting IE=edge tells Internet Explorer to use the latest engine to
  //  render the page and execute Javascript
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  // Using the viewport tag allows you to control the width and scaling of
  // the browser's viewport:
  // - include width=device-width to match the screen's width in
  // device-independent pixels
  // - include initial-scale=1 to establish 1:1 relationship between css pixels
  // and device-independent pixels
  // - ensure your page is accessible by not disabling user scaling.
  { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  // Disable tap highlight on IE
  { name: 'msapplication-tap-highlight', content: 'no' },
  // Add to homescreen for Chrome on Android
  { name: 'mobile-web-app-capable', content: 'yes' },
  // Add to homescreen for Safari on IOS
  { name: 'apple-mobile-web-app-capable', content: 'yes' },
  { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
  { name: 'apple-mobile-web-app-title', content: 'T-Mobile Boilerplate' }
]
// Add to homescreen for Chrome on Android
const link = [{ rel: 'icon', href: favicon }]

import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import FontIcon from 'react-md/lib/FontIcons'

import { endSession } from '../../services/authentication'
// import { environment } from '../../services/'
// const { ENV } = environment

import { Button } from 'react-md'

// import mobileLogo from '../../images/mobileLogo.png'
// import desktopLogo from '../../images/desktopLogo.png'

@connect(
  state => ({
    screen: state.screen,
    user: state.user
  }),
  dispatch => ({ signOut: bindActionCreators(endSession, dispatch) })
)
class Template extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    router: PropTypes.object,
    screen: PropTypes.object,
    user: PropTypes.object,
    signOut: PropTypes.func
  }
  render (
    { children, router, screen, user, signOut } = this.props
  ) {
    // React-router is separated from redux store - too heavy to persist.
    const navItems = [{
      primaryText: 'Home',
      leftIcon: <FontIcon>home</FontIcon>,
      component: Link,
      to: '/'
    }, {
      primaryText: 'Quizzes',
      leftIcon: <FontIcon>web</FontIcon>,
      component: Link,
      to: '/quizzes'
    }, {
      primaryText: 'Example',
      leftIcon: <FontIcon>web</FontIcon>,
      component: Link,
      to: '/example'
    },
    { divider: true }]
    const AuthButton = (!user.authenticated
      ? <Button flat secondary iconChildren='input'
        href='/auth/google'
        // href={ENV === 'production' ? '/auth/google' : '/auth/google'}
      >
        Log In
      </Button>
      : <Button flat secondary iconChildren='verified_user'
        onClick={signOut}
      >
        {user.username}
      </Button>
    )
    return (
      <div>
        <Helmet
          titleTemplate='%s - Unslacker'
          meta={meta} link={link}
        />
        <NavigationDrawer
          drawerTitle={'Navigation'}
          toolbarTitle={'Unslacker Boilerplate'}
          contentClassName='main-content'
          navItems={navItems}
          mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          tabletDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY}
          desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
          toolbarActions={AuthButton}
        >
          <div className='main-container'>
            {children}
          </div>
        </NavigationDrawer>
      </div>
    )
  }
}

export default Template
