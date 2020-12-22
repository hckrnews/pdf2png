import File from './file.js';
import {
    folderExists,
    getFileName
} from './fs.js';
import {
    execSync
} from 'child_process';
import path from 'path';
import {
    platform
} from 'process';

/**
 * Converter
 */
class Converter {
    /**
     * Define the files array
     */
    constructor() {
        this.pdfFile = null;
        this.output = null;
        this.customConverter = null;
    }

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
     * Set the custom converter.
     *
     * @param {string} converter
     */
    setConverter(converter) {
        if (!converter) {
            return;
        }

        if (converter.constructor !== String) {
            throw new Error('Converter should be a string');
        }

        this.customConverter = converter;
    }

    /**
     * Get the converter for Linux.
     *
     * @return {string}
     */
    get converterForLinux() {
        return 'convert';
    }

    /**
     * Get the converter for Mac.
     *
     * @return {string}
     */
    get converterForMac() {
        return 'convert';
    }

    /**
     * Get the converter for Mac.
     *
     * @return {strring}
     */
    get converterForWindows() {
        return 'magick.exe';
    }

    /**
     * Set the files
     *
     * @param {string} file
     */
    setFile(file) {
        if (!file || file.constructor !== String) {
            throw new Error('Files should be a string');
        }

        this.pdfFile = File.create({
            filePath: file
        });
    }

    /**
     * Set the output path
     *
     * @param {string} output
     */
    setOutput(output) {
        if (!output || output.constructor !== String) {
            throw new Error('Output should be a string');
        }

        if (!folderExists(output)) {
            throw new Error('Output folder doesnt exists');
        }

        this.output = output;
    }

    /**
     * Get the png file path.
     *
     * @return {string}
     */
    get pngFile() {
        return this.output + path.parse(this.pdfFile.path).name + '.png';
    }

    /**
     * Get the exec path
     *
     * @param {string} filePath
     *
     * @return {string}
     */
    getExecPath(filePath) {
        return this.converter + ' "' + filePath + '" "' + this.pngFile + '"';
    }

    /**
     * Convert pdf files to png files.
     *
     * @return {array}
     */
    convertPdftoPng() {
        const fileName = getFileName(this.pdfFile.path);
        const output = execSync(this.getExecPath(this.pdfFile.path));

        return {
            file: this.pdfFile,
            fileName,
            output
        };
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
        const converter = new Converter();

        converter.setFile(file);
        converter.setOutput(output);
        converter.setConverter(customConverter);

        return converter;
    }
}

export default Converter;
