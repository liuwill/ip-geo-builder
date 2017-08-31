/**
 * geo module:处理关于geo的领域信息
 * @module lib/geo
 * @see module:src/lib/geo
 * @author liuwill
 */

/**
 * 将字符串IP转成long
 * @param {String} ip ip地址
 * @returns {Number} long类型的地址
 */
const ip2long = (ip) => {
  var multipliers = [0x1000000, 0x10000, 0x100, 1]
  const ips = ip.split('.')

  var ipNumber = 0
  ips.forEach((part, i) => {
    ipNumber += part * multipliers[i]
  })

  return ipNumber
}

/**
 * 通过国家编码判断是否是中国
 *
 * @param {String} countryCode 国家编码
 * @returns {Boolean} 是否属于中国大陆
 */
function isChinaMainLand (countryCode) {
  return countryCode === '156'
}

/**
 * 通过国家编码判断是否是中国的特别行政区
 *
 * @param {String} countryCode 国家编码
 * @returns {Boolean} 是否属于中国大陆的特别行政区
 */
function isChinaRegion (countryCode) {
  return ['158', '344', '446'].includes(countryCode)
}

/**
 * 通过国家编码获得对应的省份编码
 *
 * @param {String} countryCode 国家编码
 * @returns {String} 省份编码
 */
function getProvinceCodeBy (countryCode) {
  const regionMap = {
    '158': '71', '344': '81', '446': '82'
  }
  return regionMap[countryCode]
}

module.exports = { ip2long, isChinaMainLand, isChinaRegion, getProvinceCodeBy }
