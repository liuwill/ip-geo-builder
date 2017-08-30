import React from 'react'
import Header from '../components/Header'
import BaseConfig from '../config/base'

export default () => (
  <div className='app-body'>
    <Header siteTitle={BaseConfig.siteTitle} description={BaseConfig.description} stylesheets={BaseConfig.stylesheets} scripts={BaseConfig.scripts}/>

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
          blank
        </div>
      </div>

      <div className='main-action'>
        <div className='action-row'>

          <div className='action-item' title='点击上传文件'>
            <div className='action-box'>
              <div className='action-image'>
                <img src='static/images/database.svg' />
              </div>

              <div className='action-info'>
                <div className='name'>IP库文件</div>
                <div className='text'>存储IP地址段对应的地理位置编码，是IP库的核心数据</div>
              </div>
            </div>
          </div>

          <div className='action-item' title='点击上传文件'>
            <div className='action-box'>
              <div className='action-image'>
                <img src='static/images/drive.svg' />
              </div>

              <div className='action-info'>
                <div className='name'>地理位置文件</div>
                <div className='text'>地理位置编码对应的简单城市名称，信息不是特别完整</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>{`

    `}</style>
  </div>
)
