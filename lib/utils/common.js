/**
 * common module:进行字符串处理的通用函数
 * @module lib/common
 * @see module:src/lib/common
 * @author liuwill
 */

/**
 * 传入完整的文本内容，分隔符和字段的关键字，生成对象数组
 *
 * @param {String} fileContent 换行符分割的完整文件内容
 * @param {Array} columnField 字段关键字数组
 * @param {String} splitMark value分隔符
 * @returns {Array} 返回生成的geo对象数组
 */
function filterColumnFromArticle (fileContent, columnField, splitMark) {
  if (!fileContent || typeof fileContent !== 'string') {
    throw new Error('params missing')
  }

  const dataContentLines = fileContent.split('\n').filter(item => item.length).map(item => {
    return buildObjectFromLine(item, columnField, splitMark)
  })

  return dataContentLines
}

/**
 * 将一行字符串用分隔符拆开，然后分解成对应columnField的对象
 *
 * @param {String} content 要解析的内容
 * @param {Array} columnField 包含的字段
 * @param {String} splitMark 分隔符
 * @returns {Object} 返回包含columnField所有字段作为关键字的对象
 */
function buildObjectFromLine (content, columnField, splitMark) {
  if (!content || !columnField || !splitMark) {
    throw new Error('params missing')
  }

  const itemArr = content.split(splitMark)
  // const columnField = ['no', 'name', 'cityNo', 'start', 'short', 'pinyin', 'blank', 'type', 'code', 'phone']

  const contentData = {}
  columnField.forEach((field, index) => {
    if (typeof field === 'string') {
      const value = itemArr[index]
      contentData[field] = value
    } else if (typeof field === 'object') {
      const param = field.param
      const key = field.key
      const inner = columnField.indexOf(param)
      if (inner === -1 || !key || !param || typeof field.handle !== 'function') {
        throw new Error('syntax error')
      }
      contentData[key] = field.handle(itemArr[inner])
    }
  })

  return contentData
}

/**
 * 将元素是对象的数组转换成以id为关键字的map
 *
 * @param {String} id 关键字的在原始对象中的key
 * @param {Array} cityContentLines 原始的对象数组
 * @returns {Map} 生成以id的值为关键字的map
 */
const listToMap = (id, cityContentLines) => {
  const cityMap = {}
  if (!id || !cityContentLines) {
    return cityMap
  }

  cityContentLines.forEach((item) => {
    if (item[id]) {
      cityMap[item[id]] = item
    }
  })

  return cityMap
}

module.exports = { buildObjectFromLine, filterColumnFromArticle, listToMap }
