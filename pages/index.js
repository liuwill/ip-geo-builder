import React from 'react'
import Header from '../components/Header'
import BaseConfig from '../config/base'

export default () => (
  <div className='app-body'>
    <Header siteTitle={BaseConfig.siteTitle} description={BaseConfig.description} stylesheets={BaseConfig.stylesheets} scripts={BaseConfig.scripts} />

    <div className='top-banner'>
      <div className='announce'>
        You can click <a target='__blank' href='https://github.com/liuwill/find-ip-location'>here</a> to visit GitHub repository.
      </div>
    </div>

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

      <div className='tip-box'>
        choose your files and input filename, then type enter.
      </div>

      <div className='main-form'>
        <form className='form-query geo-ip-form' target='__blank' action='api/upload.do' method='post' encType='multipart/form-data'>
          <div className='form-input'>
            <input className='form-data trigger' name='filename' type='text' autoCorrect='off' autoCapitalize='off' placeholder='file name' />
          </div>
          <input className='form-data upload hidden' type='file' name='core' />
          <input className='form-data upload hidden' type='file' name='geo' />
          <input className='hidden' name='hidden' type='text' />
        </form>
      </div>

      <div className='main-action'>
        <div className='action-row'>

          <div className='action-item upload core' name='core' title='点击上传文件'>
            <div className='action-box'>
              <div className='action-image'>
                <img src='static/images/database.svg' />
              </div>

              <div className='action-info'>
                <div className='name'>IP库文件</div>
                <div className='text'>存储IP地址段对应的地理位置编码，是IP库的核心数据</div>

                <div className='action-more'>
                  <div className='status'>点击上传</div>
                  <div className='size'>0</div>
                </div>
              </div>
            </div>
          </div>

          <div className='action-item upload geo' name='geo' title='点击上传文件'>
            <div className='action-box'>
              <div className='action-image'>
                <img src='static/images/drive.svg' />
              </div>

              <div className='action-info'>
                <div className='name'>地理位置文件</div>
                <div className='text'>地理位置编码对应的简单城市名称，信息不是特别完整</div>

                <div className='action-more'>
                  <div className='status'>点击上传</div>
                  <div className='size'>0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      .form-query {
        text-align: center;
        max-width: 270px;
        margin: auto;
        margin-bottom: 24px;
        border-bottom: 2px solid #626262;
        -webkit-transition: border-bottom-color 100ms ease-in, color 100ms ease-in;
        -moz-transition: border-bottom-color 100ms ease-in, color 100ms ease-in;
        -ms-transition: border-bottom-color 100ms ease-in, color 100ms ease-in;
        transition: border-bottom-color 100ms ease-in, color 100ms ease-in;
      }

      .form-query.focus {
        border-bottom-color: #fff;
      }

      .form-input {
        position: relative;
        width: 100%;
        margin: 0 auto;
        height: 32px;
        line-height: 32px;
      }

      .form-input input {
        border: none;
        background-color: transparent;
        color: #ffffff;
        max-width: 270px;
        display: block;
        text-align: center;
        font-size: 12px;
        font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
        border-radius: 0;
        padding: 0;
        margin: 0 auto;
        height: 32px;
        line-height: 22px;
      }

      .form-input input:focus {
        outline: none;
        color: #fff;
      }

      .form-input input:focus::-webkit-input-placeholder { /* WebKit, Blink, Edge */
        color:    #fff;
      }

      .tip-box {
        border: 1px solid #333;
        padding: 20px;
        max-width: 540px;
        margin: auto;
        margin-bottom: 40px;
        margin-top: 40px;
        white-space: pre-wrap;

        color: #5ce6cd;
        font-size: 12px;
        text-align: center;
      }

      .top-banner {
        text-align: center;
        background: #111111;
        color: #cccccc;
      }

      .top-banner .announce{
        padding: 15px;
        font-size: 12px;
        border-bottom: 1px solid #333333;
      }

      .top-banner .announce a {
        text-decoration: none;
        color: #fff;
      }
    `}</style>
  </div>
)
