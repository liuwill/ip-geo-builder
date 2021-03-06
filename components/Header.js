import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

function Header (props) {
  return (
    <Head>
      <title>{props.siteTitle}</title>
      <meta charset='UTF-8' />
      <meta name='description' content={props.description} />
      <meta name='author' content='liuwill,liuwill@live.com' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      {props.stylesheets && props.stylesheets.length > 0 && props.stylesheets.map((stylesheet, i) => {
        return <link key={i} rel='stylesheet' href={stylesheet} />
      })}
      {props.scripts && props.scripts.length > 0 && props.scripts.map((scriptFile, i) => {
        return <script key={i} src={scriptFile} />
      })}

      <style>{`
          body {
            font-family: PingFang SC UltraLight,PingFangSC-Light,Microsoft YaHei,Tahoma,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;
            -webkit-font-smoothing: antialiased;
            background: #000;
            margin: 0;
          }
      `}</style>
    </Head>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stylesheets: PropTypes.array,
  scripts: PropTypes.array
}

export default Header
