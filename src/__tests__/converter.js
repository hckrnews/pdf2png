import Converter from '../converter.js';
import {
    fileExists
} from '@hckrnews/converter';

describe('PPT2PDF converter test', () => {
    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:    'test/OPW 733 Tienduizend redenen.pdf',
            output:  'output/',
            quality: 60,
            density: 72
        });

        expect(converter.oldFile.path).toBe('test/OPW 733 Tienduizend redenen.pdf');
    });

    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:   'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/'
        });

        converter.convert();

        expect(fileExists('output/OPW 733 Tienduizend redenen-0.png')).toBe(true);
    });

    it('It should generate the converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'convert -density 96 -quality 90 -colorspace RGB'
        });

        converter.convert();

        expect(fileExists('output/OPW 733 Tienduizend redenen-0.png')).toBe(true);
    });

    it('It should return the default converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'convert  -quality 90 -density 96 -background "#FFFFFF" -colorspace RGB'
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

    it('It should throw an error if the density isnt a number', () => {
        expect(() => {
            Converter.create({
                file:    'test/OPW 733 Tienduizend redenen.pdf',
                output:  'output/',
                density: '1'
            });
        }).toThrowError('Density should be a valid density number');
    });

    it('It should throw an error if the density is 10 or more', () => {
        expect(() => {
            Converter.create({
                file:    'test/OPW 733 Tienduizend redenen.pdf',
                output:  'output/',
                density: 9
            });
        }).toThrowError('Density should be a valid density number');
    });

    it('It should throw an error if the density is less than 1000', () => {
        expect(() => {
            Converter.create({
                file:    'test/OPW 733 Tienduizend redenen.pdf',
                output:  'output/',
                density: 1001
            });
        }).toThrowError('Density should be a valid density number');
    });

    it('It should throw an error if the quality isnt a number', () => {
        expect(() => {
            Converter.create({
                file:    'test/OPW 733 Tienduizend redenen.pdf',
                output:  'output/',
                quality: '1'
            });
        }).toThrowError('Quality should be a valid quality number');
    });

    it('It should throw an error if the quality is 1 or more', () => {
        expect(() => {
            Converter.create({
                file:    'test/OPW 733 Tienduizend redenen.pdf',
                output:  'output/',
                quality: -1
            });
        }).toThrowError('Quality should be a valid quality number');
    });

    it('It should throw an error if the quality is less than 100', () => {
        expect(() => {
            Converter.create({
                file:    'test/OPW 733 Tienduizend redenen.pdf',
                output:  'output/',
                quality: 101
            });
        }).toThrowError('Quality should be a valid quality number');
    });
});
