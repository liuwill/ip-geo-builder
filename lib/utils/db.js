const { buildObjectFromLine, filterColumnFromArticle, listToMap } = require('./common')
const { ip2long, isChinaMainLand, isChinaRegion, getProvinceCodeBy } = require('./geo')
const { encodeGeoLine } = require('./buffer')
const IP_LINE_BITS = 144

exports.generateDb = function (coreFile, cityCodeFile, chinaFile, isoFile) {
  const geoData = generateMetaContent(coreFile, cityCodeFile, chinaFile, isoFile)
  const geoLines = transformFromMapToLine(geoData)

  const geoBuffer = generateGeoBuffer(geoLines)

  return geoBuffer
}

function generateGeoBuffer (geoLines) {
  const geoBuffers = []
  geoLines.forEach((line, index) => {
    var lineBuffer = encodeGeoLine(line)
    geoBuffers.push(lineBuffer)
  })

  return Buffer.concat(geoBuffers, geoBuffers.length * IP_LINE_BITS)
}

function transformFromMapToLine (geoData) {
  const targetFields = ['startIpLong', 'endIpLong', 'startIp', 'endIp', 'code', 'province', 'city', 'pinyin', 'isoCode']
  const linesResult = geoData.map(item => {
    const target = []
    targetFields.forEach(key => {
      const dataStr = item[key]

      target.push(dataStr.toString().trim())
    })

    return target.join(',')
  })
  return linesResult
}

function generateMetaContent (coreFile, cityCodeFile, chinaFile, isoFile) {
  const coreContent = readCoreContent(coreFile)
  const cityContent = readCityContent(cityCodeFile)
  const chinaContent = readChinaContent(chinaFile)
  const isoContent = readIsoContent(isoFile)

  let geoData = Object.assign([], coreContent)
  geoData = mergeCityContent(geoData, cityContent)
  geoData = mergeChinaContent(geoData, chinaContent)
  geoData = mergeIsoContent(geoData, isoContent)

  return geoData
}

function mergeChinaContent (geoData, chinaContent) {
  const chinaResultField = [{ source: 'pinyin', target: 'pinyin' }]
  const chinaMap = listToMap('code', chinaContent)

  geoData = geoData.map(item => {
    const key = item['cityCode']
    const countryCode = item['countryCode']
    const provinceCode = item['provinceCode']
    const extraData = chinaMap[key]

    if (extraData) {
      chinaResultField.forEach(value => {
        item[value['target']] = extraData[value['source']]
      })
    } else if (countryCode === '156') {
      if (key.endsWith('9000')) {
        const constCityData = chinaMap[provinceCode + '0000']
        if (constCityData) {
          chinaResultField.forEach(value => {
            item[value['target']] = constCityData[value['source']]
          })
        }
      } else {
        chinaResultField.forEach(value => {
          item[value['target']] = 'China'
        })
      }
    } else {
      chinaResultField.forEach(value => {
        item[value['target']] = 'OV'
      })
    }

    return item
  })

  return geoData
}

function mergeCityContent (geoData, cityContent) {
  const cityMap = listToMap('code', cityContent)
  geoData = geoData.map(item => {
    return Object.assign({}, cityMap[item['code']], item)
  })

  return geoData
}

function mergeIsoContent (geoData, isoContent) {
  const isoResultField = [{ source: 'isoCode', target: 'isoCode' }]
  const isoMap = listToMap('countryCode', isoContent)
  geoData = geoData.map(item => {
    const key = item['countryCode']
    const extraData = isoMap[key]

    if (extraData) {
      isoResultField.forEach(value => {
        item[value['target']] = extraData[value['source']]
      })
    } else {
      isoResultField.forEach(value => {
        item[value['target']] = 'OV'
      })
    }
    return item
  })

  return geoData
}

function readCityContent (fileContent) {
  const splitMark = ','

  const cityContentLines = fileContent.toString().trim().split('\n').filter(item => item.length).map(item => {
    const itemArr = item.split(splitMark)
    const code = itemArr[0]

    const countryData = {}
    const countryCode = code.substr(1, 3)
    if (isChinaMainLand(countryCode)) {
      countryData['country'] = '中国'
      countryData['countryCode'] = countryCode
      countryData['provinceCode'] = code.substr(4, 2)
      countryData['cityCode'] = code.substr(4, 6)
    } else if (isChinaRegion(countryCode)) {
      const provinceCode = getProvinceCodeBy(countryCode)
      countryData['country'] = '中国'
      countryData['countryCode'] = countryCode
      countryData['provinceCode'] = provinceCode
      countryData['cityCode'] = provinceCode + '0000'
    } else {
      countryData['country'] = '国外'
      countryData['countryCode'] = countryCode
      countryData['provinceCode'] = code.substr(4, 2)
      countryData['cityCode'] = code.substr(4, 6)
    }

    return Object.assign({
      'code': itemArr[0],
      'city': itemArr[1],
      'province': itemArr[2]
    }, countryData)
  })

  return cityContentLines
}

function readIsoContent (fileContent) {
  const splitMark = '\t'
  const columnField = ['isoCode', 'longCode', 'countryCode', 'version', 'name']

  return filterColumnFromArticle(fileContent.toString(), columnField, splitMark)
}

function readChinaContent (fileContent) {
  const splitMark = '\t'
  const columnField = ['no', 'name', 'cityNo', 'start', 'short', 'pinyin', 'blank', 'type', 'code', 'phone']

  const dataContentLines = fileContent.toString().split('\n').filter(item => item.length).map(item => {
    return buildObjectFromLine(item, columnField, splitMark)
  })

  return dataContentLines
}

function readCoreContent (fileContent) {
  const splitMark = ','

  const ipContentLines = fileContent.toString().split('\n').filter(item => item.length).map(item => {
    const itemArr = item.split(splitMark)

    return Object.assign({
      'startIp': itemArr[0],
      'endIp': itemArr[1],
      'startIpLong': ip2long(itemArr[0]),
      'endIpLong': ip2long(itemArr[1]),
      'code': itemArr[2]
    })
  })

  return ipContentLines
}
