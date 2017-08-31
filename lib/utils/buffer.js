/**
 * buffer module: 处理二进制数据
 * @module lib/buffer
 * @see module:src/lib/buffer
 * @author liuwill
 */

/**
 * 0-8字节是开始的ip
 * 8-16字节是结束的ip
 * 16-18字节是内容的长度
 *
 * @param {String} line 传入一行数据
 * @returns {Buffer} 返回二进制Buffer
 */
function encodeGeoLine (line) {
  const headerBuffer = Buffer.alloc(18)

  const lineData = line.split(',')

  const startIndex = Number(lineData[0])
  const endIndex = Number(lineData[1])
  let offset = headerBuffer.writeDoubleBE(startIndex)
  offset = headerBuffer.writeDoubleBE(endIndex, offset)

  lineData.shift()
  lineData.shift()

  const content = lineData.join(',')
  const dataBuffer = Buffer.from(content, 'utf-8')
  const dataBufSize = dataBuffer.length

  headerBuffer.writeUInt16BE(dataBufSize, offset)
  return Buffer.concat([headerBuffer, dataBuffer], 144)
}

module.exports = { encodeGeoLine }
