const fs = require('fs')
const path = require('path')
const promisify = require('./')

describe('Promisify - fs', () => {
  test('fs-readdir should be promisified', () => {
    const readdirAsync = promisify(fs.readdir)

    readdirAsync(path.join(__dirname, 'mocks'), { encoding: 'utf8' })
      .then(dir => {
        expect(dir).toEqual(['test.txt'])
      })
      .catch(err => console.log(err))
  })
  test('fs-readdir should be promisified and return an error for folder not found', () => {
    const readdirAsync = promisify(fs.readdir)

    readdirAsync(path.join(__dirname, 'not found'), { encoding: 'utf8' })
      .then(dir => dir)
      .catch(err => {
        expect(err).toEqual('folder not found')
      })
  })
})
