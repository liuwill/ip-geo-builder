import React from 'react'
import Header from '../components/Header'
import BaseConfig from '../config/base'

export default () => (
  <div className='app-body'>
    <Header siteTitle={BaseConfig.siteTitle} description={BaseConfig.description} stylesheets={BaseConfig.stylesheets} />

    <div className='main-container'>
      <div className='main-desc'>
        <div className='title'>
          <h1>Find-IP-Location</h1>
        </div>

        <div className='subtitle'>
          <h2>IP Lib</h2>
        </div>

        <div className='content'>
          <p>ipb提供的ip库原始文件是CSV格式，而且缺少足够的地理数据，需要通过本系统来转换，生成二进制格式。</p>
        </div>
      </div>

      <div className='main-form'>
        <div className='form-query'>

        </div>
      </div>
    </div>

    <style>{`
      .main-description {
        text-align: center;
        color: #fff;
      }

      .main-desc .title, .main-desc .title>h1 {
        text-align: center;
        color: #fff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        font-size: 32px;
        font-weight: 400;
        text-rendering: optimizeLegibility;
      }

      .main-desc .subtitle, .main-desc .subtitle>h2 {
        text-align: center;
        color: #fff;
        font-size: 12px;
        font-weight: normal;
        -webkit-letter-spacing: 4px;
        -moz-letter-spacing: 4px;
        -ms-letter-spacing: 4px;
        letter-spacing: 4px;
        text-transform: uppercase;
      }

      .main-desc .content {
        margin-bottom: 50px;
      }

      .main-desc .content, .main-desc .content>p {
        color: #ababab;
        text-align: center;
        font-size: 14px;
        font-weight: normal;
        line-height: 24px;
      }
    `}</style>
  </div>
)
