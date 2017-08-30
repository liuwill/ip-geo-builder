import React from 'react'
import Header from '../components/Header'
import BaseConfig from '../config/base'

export default () => (
  <div className='app-main'>
    <Header siteTitle={BaseConfig.siteTitle} description={BaseConfig.description} stylesheets={BaseConfig.stylesheets} />
    Welcome to next.js!
  </div>
)
