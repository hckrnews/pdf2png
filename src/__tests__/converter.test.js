import test from 'node:test';
import assert from 'assert';
import Converter from '../converter.js';
import {
    fileExists
} from '@hckrnews/converter';

test('PPT2PDF converter test', async (t) => {
    await t.test('It should generate the converter', () => {
        const converter = Converter.create({
            file:    'test/OPW 733 Tienduizend redenen.pdf',
            output:  'output/',
            quality: 60,
            density: 72
        });

        assert.strictEqual(converter.oldFile.path, 'test/OPW 733 Tienduizend redenen.pdf');
    });

    await t.test('It should generate the converter', () => {
        const converter = Converter.create({
            file:   'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/'
        });

        converter.convert();

        assert.strictEqual(fileExists('output/OPW 733 Tienduizend redenen-0.png'), true);
    });

    await t.test('It should generate the converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'convert -density 96 -quality 90 -colorspace RGB'
        });

        converter.convert();

        assert.strictEqual(fileExists('output/OPW 733 Tienduizend redenen-0.png'), true);
    });

    await t.test('It should return the default converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'convert  -quality 90 -density 96 -background "#FFFFFF" -colorspace RGB'
        });

        const result = converter.converter;

        assert.strictEqual(result, 'convert  -quality 90 -density 96 -background "#FFFFFF" -colorspace RGB');
    });

    await t.test('It should return the custom converter', () => {
        const converter = Converter.create({
            file:            'test/OPW 733 Tienduizend redenen.pdf',
            output:          'output/',
            customConverter: 'example'
        });

        const result = converter.converter;

        assert.strictEqual(result, 'example');
    });

    await t.test('It should throw an error if the file isnt a string', () => {
        try {
            Converter.create({
                file: 42
            });
        } catch (error) {
            assert.strictEqual(error.message, 'File should be a string');
        }
    });

    await t.test('It should throw an error if the output isnt a string', () => {
        try {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 42
            });
        } catch (error) {
            assert.strictEqual(error.message, 'Output should be a string');
        }
    });

    await t.test('It should throw an error if the output folder doesnt exists', () => {
        try {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 'unknownfolder/'
            });
        } catch (error) {
            assert.strictEqual(error.message, 'Output folder doesnt exists');
        }
    });

    await t.test('It should throw an error if the output folder doesnt exists', () => {
       try {
            Converter.create({
                file:   'test/OPW 733 Tienduizend redenen.pdf',
                output: 'test/OPW 733 Tienduizend redenen.ppt'
            });
        } catch (error) {
            assert.strictEqual(error.message, 'Output folder doesnt exists');
        }
    });

    await t.test('It should throw an error if the converter isnt a string', () => {
       try {
            Converter.create({
                file:            'test/OPW 733 Tienduizend redenen.pdf',
                output:          'output/',
                customConverter: 42
            });
        } catch (error) {
            assert.strictEqual(error.message, 'Converter should be a string');
        }
    });
});
