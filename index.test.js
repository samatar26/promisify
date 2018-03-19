const fs = require('fs')
const path = require('path')
const promisify = require('./node_promisify')
// const util_promisify = require('util.promisify')

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
        expect(err.code).toEqual('ENOENT')
      })
  })

  test('fs-readFile should be promisified', () => {
    const readFileAsync = promisify(fs.readFile)

    readFileAsync(path.join(__dirname, 'mocks', 'test.txt'), {
      encoding: 'utf8',
    })
      .then(file => {
        expect(file).toEqual('TestFile')
      })
      .catch(err => err)
  })

  test('fs-readFile should be promosified and return file not found upon error', () => {
    const readFileAsync = promisify(fs.readFile)

    readFileAsync(path.join(__dirname, 'mocks', 'notFound.txt'), {
      encoding: 'utf8',
    })
      .then(file => file)
      .catch(err => {
        expect(err.code).toEqual('ENOENT')
      })
  })

  test('fs-writeFile should be promisified and create a new file', () => {
    const writeFileAsync = promisify(fs.writeFile)

    writeFileAsync(path.join(__dirname, 'mocks', 'test.txt'), 'Testing12').then(
      err => {
        expect(err).toEqual(undefined)
      }
    )
  })

  test("fs-writeFile should return an error when it can't write to file", () => {
    const writeFileAsync = promisify(fs.writeFile)

    writeFileAsync(path.join(__dirname, 'mocks'), 'Testing12')
      .then(err => err)
      .catch(err => {
        expect(err.code).toEqual('EISDIR')
      })
  })
})
