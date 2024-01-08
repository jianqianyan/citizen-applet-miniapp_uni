// 关键信息脱敏处理
export const desensitization = (value, type) => {
  let res = ''
  if (!value) return value
  switch (type) {
    case 'phone':
      res = phoneMoudle(value)
      break
    case 'name':
      res = nameMoulde(value)
      break
  }
  return res
}

const phoneMoudle = (value) => {
  let res = '********'
  if (value.length === 11) {
    res = value.slice(0, 3) + '****' + value.slice(-4)
  }
  return res
}

const nameMoulde = (value) => {
  let res = value.slice(-1)
  let length = value.length - 1
  while (length) {
    res = '*' + res
    length--
  }
  return res
}