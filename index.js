const promisify = fn => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, res) => {
      if (err) reject('folder not found')
      resolve(res)
    })
  })
}

module.exports = promisify
