import { platform } from 'node:process';
import { Converter } from '@hckrnews/converter';
import Options from './options.js';

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
     *
     * @return {string}
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
     *
     * @return {string}
     */
    get converterForLinux() {
        return `convert ${this.convertString} -colorspace RGB`;
    }

    /**
     * Get the converter for Mac.
     *
     * @return {string}
     */
    get converterForMac() {
        return `convert ${this.convertString} -colorspace RGB`;
    }

    /**
     * Get the converter for Mac.
     *
     * @return {strring}
     */
    get converterForWindows() {
        return `magick.exe ${this.convertString} -colorspace RGB`;
    }

    /**
     * Get the path of the new file.
     *
     * @return {string}
     */
    get newFile() {
        return `${this.output + this.oldFile.name}.png`;
    }

    /**
     * Set the convert string.
     *
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
     *
     * @param {string} file
     * @param {string} output
     * @param {string} customConverter
     * @param {number} density
     * @param {number} quality
     *
     * @return {object}
     */
    static create({ file, output, customConverter, density, quality }) {
        const converter = new PdfToPngConverter();

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
