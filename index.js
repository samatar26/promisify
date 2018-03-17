const promisify = fn => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, res) => {
      if (args.length === 1) return resolve(err)
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

module.exports = promisify
