import Converter from '../converter.js';
import {
    fileExists
} from '../fs.js';

describe('PPT2PDF converter test', () => {
    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:   'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/'
        });

        expect(converter.pdfFile.path).toBe('test/OPW 733 Tienduizend redenen.pdf');
    });

    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:   'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/'
        });

        converter.convertPdfToPng();

        expect(fileExists('output/OPW 733 Tienduizend redenen-0.png')).toBe(true);
    });

    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'convert'
        });

        converter.convertPdfToPng();

        expect(fileExists('output/OPW 733 Tienduizend redenen-0.png')).toBe(true);
    });

    it('It should return the default converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'convert'
        });

        const result = converter.converter;

        expect(result).toBe(converter.converterForLinux);
    });

    it('It should return the custom converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'example'
        });

        const result = converter.converter;

        expect(result).toBe('example');
    });

    it('It should throw an error if the file isnt a string', () => {
        expect(() => {
            Converter.create({
                file: 42
            });
        }).toThrowError('File should be a string');
    });

    it('It should throw an error if the output isnt a string', () => {
        expect(() => {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 42
            });
        }).toThrowError('Output should be a string');
    });

    it('It should throw an error if the output folder doesnt exists', () => {
        expect(() => {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 'unknownfolder/'
            });
        }).toThrowError('Output folder doesnt exists');
    });

    it('It should throw an error if the output folder doesnt exists', () => {
        expect(() => {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 'test/OPW 733 Tienduizend redenen.ppt'
            });
        }).toThrowError('Output folder doesnt exists');
    });

    it('It should throw an error if the converter isnt a string', () => {
        expect(() => {
            Converter.create({
                file:            'test/OPW 733 Tienduizend redenen.pdf',
                output:          'output/',
                customConverter: 42
            });
        }).toThrowError('Converter should be a string');
    });
});
