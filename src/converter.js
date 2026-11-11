import path from 'node:path'
import { platform } from 'node:process'
import { Converter } from '@hckrnews/converter'
import Options from './options.js'

/**
 * @typedef {import('@hckrnews/converter').Converter} ConverterObject
 * @typedef {object} Pdf2PngConverterSpecificObject
 * @property {string} converterForLinux
 * @typedef {ConverterObject & Pdf2PngConverterSpecificObject} Pdf2PngConverterObject
 */

/**
 * Converter
 */
class PdfToPngConverter extends Converter {
  /**
   * Define all convert options.
   */
  constructor () {
    super()
    this.convertArgs = []
  }

  /**
   * Get the converter.
   * @returns {string}
   */
  get converter () {
    const converters = {
      darwin: this.converterForMac,
      win32: this.converterForWindows,
      default: this.converterForLinux
    }

    if (this.customConverter) {
      return this.customConverter
    }

    if (converters[platform]) {
      return converters[platform]
    }

    return converters.default
  }

  /**
   * Get the converter binary for Linux.
   * @returns {string}
   */
  get converterForLinux () {
    return 'convert'
  }

  /**
   * Get the converter binary for Mac.
   * @returns {string}
   */
  get converterForMac () {
    return 'convert'
  }

  /**
   * Get the converter binary for Windows.
   * @returns {string}
   */
  get converterForWindows () {
    return 'magick.exe'
  }

  /**
   * Get the arguments passed to the converter binary.
   * @returns {string[]}
   */
  get args () {
    return [
      ...this.convertArgs,
      '-colorspace',
      'RGB',
      path.resolve(this.oldFile.path),
      path.resolve(this.newFile)
    ]
  }

  /**
   * Get the path of the new file.
   * @returns {string}
   */
  get newFile () {
    return `${this.output + this.oldFile.name}.png`
  }

  /**
   * Set the convert arguments.
   * @param {string[]} convertArgs
   */
  setConvertArgs (convertArgs) {
    if (!Array.isArray(convertArgs) || !convertArgs.every((arg) => typeof arg === 'string')) {
      throw new Error('The convert arguments should be an array of strings')
    }

    this.convertArgs = convertArgs
  }

  /**
   * Create the converter
   * @param {object} params
   * @param {string} params.file
   * @param {string} params.output
   * @param {string=} params.customConverter
   * @param {number=} params.density
   * @param {number=} params.quality
   * @param {boolean=} params.sync
   * @returns {Pdf2PngConverterObject}
   */
  static create ({
    file,
    output,
    customConverter,
    density,
    quality,
    sync = true
  }) {
    const converter = new PdfToPngConverter()

    converter.setSync(sync)
    converter.setFile(file)
    converter.setOutput(output)
    converter.setConverter(customConverter)
    converter.setConvertArgs(
      Options.create({
        density,
        quality
      }).convertArgs
    )

    return converter
  }
}

export default PdfToPngConverter
