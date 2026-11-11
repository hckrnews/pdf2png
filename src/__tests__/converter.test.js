/* eslint-disable sonarjs/no-duplicate-string */
import test from 'node:test'
import assert from 'node:assert'
import { copyFileSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileExists } from '@hckrnews/converter'
import Converter from '../converter.js'

test('PDF2PNG command injection', async (t) => {
  const dir = mkdtempSync(path.join(tmpdir(), 'pdf2png-'))
  const marker = path.join(dir, 'PWNED')
  t.after(() => rmSync(dir, { recursive: true, force: true }))

  await t.test('It should not execute a filename or output directory payload', () => {
    const name = '$(touch PWNED)`touch PWNED`";touch PWNED #'
    const file = path.join(dir, `${name}.pdf`)
    const output = `${path.join(dir, '$(touch PWNED)')}/`
    copyFileSync('test/OPW 733 Tienduizend redenen.pdf', file)
    mkdirSync(output)

    const cwd = process.cwd()
    process.chdir(dir)
    try {
      Converter.create({ file, output }).convert()
    } finally {
      process.chdir(cwd)
    }

    assert.strictEqual(fileExists(marker), false)
    assert.strictEqual(fileExists(path.join(output, `${name}-0.png`)), true)
  })

  await t.test('It should not chain a customConverter payload', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/',
      customConverter: `echo && touch ${marker}`
    })

    assert.throws(() => converter.convert())
    assert.strictEqual(fileExists(marker), false)
  })

  await t.test('It should pass the options and absolute paths as arguments', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/',
      quality: 60,
      density: 72
    })

    assert.deepStrictEqual(converter.args, [
      '-quality', '60', '-density', '72', '-background', '#FFFFFF',
      '-colorspace', 'RGB',
      path.resolve('test/OPW 733 Tienduizend redenen.pdf'),
      path.resolve('output/OPW 733 Tienduizend redenen.png')
    ])
  })
})

test('PPT2PDF converter test', async (t) => {
  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/',
      quality: 60,
      density: 72
    })

    assert.strictEqual(
      converter.oldFile.path,
      'test/OPW 733 Tienduizend redenen.pdf'
    )
  })

  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/'
    })

    converter.convert()

    assert.strictEqual(
      fileExists('output/OPW 733 Tienduizend redenen-0.png'),
      true
    )
  })

  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/',
      customConverter: 'convert'
    })

    converter.convert()

    assert.strictEqual(
      fileExists('output/OPW 733 Tienduizend redenen-0.png'),
      true
    )
  })

  await t.test('It should return the default converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/'
    })

    const result = converter.converter

    assert.strictEqual(result, converter.converterForLinux)
  })

  await t.test('It should return the custom converter', () => {
    const converter = Converter.create({
      file: 'test/OPW 733 Tienduizend redenen.pdf',
      output: 'output/',
      customConverter: 'example'
    })

    const result = converter.converter

    assert.strictEqual(result, 'example')
  })

  await t.test('It should throw an error if the file isnt a string', () => {
    try {
      Converter.create({
        file: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'File should be a string')
    }
  })

  await t.test('It should throw an error if the output isnt a string', () => {
    try {
      Converter.create({
        file: 'test/OPW 733 Tienduizend redenen.pdf',
        output: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Output should be a string')
    }
  })

  await t.test(
    'It should throw an error if the output folder doesnt exists',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'unknownfolder/'
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Output folder doesnt exists'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the output folder doesnt exists',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'test/OPW 733 Tienduizend redenen.ppt'
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Output folder doesnt exists'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the converter isnt a string',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'output/',
          customConverter: 42
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Converter should be a string'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the density isnt a number',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'output/',
          density: '1'
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Density should be a valid density number'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the density is 10 or more',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'output/',
          density: 9
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Density should be a valid density number'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the density is less than 1000',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'output/',
          density: 1001
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Density should be a valid density number'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the quality isnt a number',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'output/',
          quality: '1'
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Quality should be a valid quality number'
        )
      }
    }
  )

  await t.test('It should throw an error if the quality is 1 or more', () => {
    try {
      Converter.create({
        file: 'test/OPW 733 Tienduizend redenen.pdf',
        output: 'output/',
        quality: -1
      })
    } catch (error) {
      assert.strictEqual(
        error.message,
        'Quality should be a valid quality number'
      )
    }
  })

  await t.test(
    'It should throw an error if the quality is less than 100',
    () => {
      try {
        Converter.create({
          file: 'test/OPW 733 Tienduizend redenen.pdf',
          output: 'output/',
          quality: 101
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Quality should be a valid quality number'
        )
      }
    }
  )
})
