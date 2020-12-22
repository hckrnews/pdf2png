import {
    platform
} from 'process';
import {
    Converter
} from '@hckrnews/converter';

/**
 * Converter
 */
class PdfToPngConverter extends Converter {
    /**
     * Get the converter.
     *
     * @return {string}
     */
    get converter() {
        const converters = {
            darwin:  this.converterForMac,
            win32:   this.converterForWindows,
            default: this.converterForLinux
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
     * @return {string}
     */
    get converterForLinux() {
        return 'convert -density 96 -quality 90 -colorspace RGB';
    }

    /**
     * Get the converter for Mac.
     *
     * @return {string}
     */
    get converterForMac() {
        return 'convert -density 96 -quality 90 -colorspace RGB';
    }

    /**
     * Get the converter for Mac.
     *
     * @return {strring}
     */
    get converterForWindows() {
        return 'magick.exe -density 96 -quality 90 -colorspace RGB';
    }

    /**
     * Get the path of the new file.
     *
     * @return {string}
     */
    get newFile() {
        return this.output + this.oldFile.name + '.png';
    }

    /**
     * Create the converter
     *
     * @param {string} file
     * @param {string} output
     * @param {string} customConverter
     *
     * @return {object}
     */
    static create({
        file,
        output,
        customConverter
    }) {
        const converter = new PdfToPngConverter();

        converter.setFile(file);
        converter.setOutput(output);
        converter.setConverter(customConverter);

        return converter;
    }
}

export default PdfToPngConverter;
