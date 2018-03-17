const promisify = fn => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, res) => {
      if (err) reject(err)
      resolve(res)
    })
  })
}

module.exports = promisify
