/**
 * 深拷贝
 *
 * @type {Object}
 */
 const deepClone = function(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepClone)
  } else if (obj && typeof obj === 'object') {
    var cloned = {}
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i]
      cloned[key] = deepClone(obj[key])
    }
    return cloned
  } else {
    return obj
  }
}

/**
 * 将query转换为描述文本
 * @param {Object} query  需要转换的条件对象
 * @param {Boolean} isText 是否转换为存文字描述， 如果true 则转换为纯文字， 如果false则转换为html格式,默认是
 */
 export function queryToTextDesc(query, isText) {
  if (!query) {
    return ''
  }

  if (typeof query === 'string' && query.constructor == String) {
      query = query.length > 0 ? JSON.parse(query) : {}
  }

  if (!(query instanceof Object) || JSON.stringify(query) === '{}') {
    return ''
  }

  isText = isText == undefined || isText == null ? true : isText
  let descText = ''
  const curLogical = query.logical
  const curChild = query.children
  let fieldName = ''
  let relativeDesc = ''
  let value = ''
  const curLogicalText = curLogical === 'AND' ? '并且' : '或者'
  if (curChild && curChild instanceof Array) {
    curChild.forEach((child) => {
      const curType = child.type
      const curQuery = child.query

      if (curType === 'query-builder-group') {
        // 子条件组
        const curSubDescText = queryToTextDesc(curQuery, isText)
        if (descText.length === 0) {
          if (isText) {
            descText = `[ ${curSubDescText} ]`
          } else {
            descText = `<span>${curSubDescText}</span>`
          }
        } else {
          if (isText) {
            descText += `${curLogicalText} [ ${curSubDescText}] `
          } else {
            descText += `<span class="q-logical">${curLogicalText}</span><span class="q-child">( ${curSubDescText} )</span>`
          }
        }
      } else {
        // 将query转中文
        fieldName = curQuery.fieldItemInfo.name

        const operators = curQuery.operators
        const relative = curQuery.relative
        // let valueType = curQuery.inputType
        if (curQuery.inputType == 'date') {
          var date = new Date(curQuery.value)
          value = formatDate(date)
        } else if (curQuery.inputType == 'datetime') {
          var datetime = new Date(curQuery.value)
          value = formatDateTime(datetime)
        } else {
          value = curQuery.value
        }

        if (operators && operators instanceof Array) {
          operators.forEach((op) => {
            if (op.value === relative) {
              relativeDesc = op.label
            }
          })
        }
        if (!fieldName || !relativeDesc) {
          return true
        }
        if (descText.length === 0) {
          if (isText) {
            descText = `(${fieldName} ${relativeDesc} ${value})`
          } else {
            descText = `<span class="q-field">${fieldName}</span>
                <span class="q-relative">${relativeDesc}</span><span class="q-value">${value}</span>`
          }
        } else {
          if (isText) {
            descText += ` ${curLogicalText} (${fieldName} ${relativeDesc} ${value})`
          } else {
            descText += `<span class="q-logical">${curLogicalText}</span><span class="q-field">${fieldName}</span><span class="q-relative">${relativeDesc}</span><span class="q-value">${value}</span>`
          }
        }
      }
    })
  }

  return descText
}

export default deepClone
