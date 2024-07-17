import { platform } from 'node:process';
import { Converter } from '@hckrnews/converter';
import Options from './options.js';

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
    constructor() {
        super();
        this.convertString = '';
    }

    /**
     * Get the converter.
     * @returns {string}
     */
    get converter() {
        const converters = {
            darwin: this.converterForMac,
            win32: this.converterForWindows,
            default: this.converterForLinux,
        };

        if (this.customConverter) {
            return this.customConverter;
        }

        if (converters[platform]) {
            return converters[platform];
        }

        return converters.default;
    }

    /**
     * Get the converter for Linux.
     *
     * todo:
     * resize (convertOptions.push('-resize '+width+(height?'X'+height:''));)
     * background flatten
     * strip (profile)
     * @returns {string}
     */
    get converterForLinux() {
        return `convert ${this.convertString} -colorspace RGB`;
    }

    /**
     * Get the converter for Mac.
     * @returns {string}
     */
    get converterForMac() {
        return `convert ${this.convertString} -colorspace RGB`;
    }

    /**
     * Get the converter for Mac.
     * @returns {string}
     */
    get converterForWindows() {
        return `magick.exe ${this.convertString} -colorspace RGB`;
    }

    /**
     * Get the path of the new file.
     * @returns {string}
     */
    get newFile() {
        return `${this.output + this.oldFile.name}.png`;
    }

    /**
     * Set the convert string.
     * @param {string} convertString
     */
    setConvertString(convertString) {
        if (!convertString) {
            return;
        }

        if (convertString.constructor !== String) {
            throw new Error('The convert string should be a string');
        }

        this.convertString = convertString;
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
    static create({
        file,
        output,
        customConverter,
        density,
        quality,
        sync = false,
    }) {
        const converter = new PdfToPngConverter();

        converter.setSync(sync);
        converter.setFile(file);
        converter.setOutput(output);
        converter.setConverter(customConverter);
        converter.setConvertString(
            Options.create({
                density,
                quality,
            }).convertString
        );

        return converter;
    }
}

export default PdfToPngConverter;
