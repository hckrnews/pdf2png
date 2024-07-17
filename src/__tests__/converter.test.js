// eslint-disable-next-line n/no-unsupported-features/node-builtins
import test from 'node:test';
import assert from 'node:assert';
import { fileExists } from '@hckrnews/converter';
import Converter from '../converter.js';

test('PPT2PDF converter test', async (t) => {
    await t.test('It should generate the converter', () => {
        const converter = Converter.create({
            file: 'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/',
            quality: 60,
            density: 72,
        });

        assert.strictEqual(
            converter.oldFile.path,
            'test/OPW 733 Tienduizend redenen.pdf'
        );
    });

    await t.test('It should generate the converter', () => {
        const converter = Converter.create({
            file: 'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/',
        });

        converter.convert();

        assert.strictEqual(
            fileExists('output/OPW 733 Tienduizend redenen-0.png'),
            true
        );
    });

    await t.test('It should generate the converter', () => {
        const converter = Converter.create({
            file: 'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/',
            customConverter: 'convert -density 96 -quality 90 -colorspace RGB',
        });

        converter.convert();

        assert.strictEqual(
            fileExists('output/OPW 733 Tienduizend redenen-0.png'),
            true
        );
    });

    await t.test('It should return the default converter', () => {
        const converter = Converter.create({
            file: 'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/',
            customConverter:
                'convert  -quality 90 -density 96 -background "#FFFFFF" -colorspace RGB',
        });

        const result = converter.converter;

        assert.strictEqual(result, converter.converterForLinux);
    });

    await t.test('It should return the custom converter', () => {
        const converter = Converter.create({
            file: 'test/OPW 733 Tienduizend redenen.pdf',
            output: 'output/',
            customConverter: 'example',
        });

        const result = converter.converter;

        assert.strictEqual(result, 'example');
    });

    await t.test('It should throw an error if the file isnt a string', () => {
        try {
            Converter.create({
                file: 42,
            });
        } catch (error) {
            assert.strictEqual(error.message, 'File should be a string');
        }
    });

    await t.test('It should throw an error if the output isnt a string', () => {
        try {
            Converter.create({
                file: 'test/OPW 733 Tienduizend redenen.pdf',
                output: 42,
            });
        } catch (error) {
            assert.strictEqual(error.message, 'Output should be a string');
        }
    });

    await t.test(
        'It should throw an error if the output folder doesnt exists',
        () => {
            try {
                Converter.create({
                    file: 'test/OPW 733 Tienduizend redenen.pdf',
                    output: 'unknownfolder/',
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'Output folder doesnt exists'
                );
            }
        }
    );

    await t.test(
        'It should throw an error if the output folder doesnt exists',
        () => {
            try {
                Converter.create({
                    file: 'test/OPW 733 Tienduizend redenen.pdf',
                    output: 'test/OPW 733 Tienduizend redenen.ppt',
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'Output folder doesnt exists'
                );
            }
        }
    );

    await t.test(
        'It should throw an error if the converter isnt a string',
        () => {
            try {
                Converter.create({
                    file: 'test/OPW 733 Tienduizend redenen.pdf',
                    output: 'output/',
                    customConverter: 42,
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'Converter should be a string'
                );
            }
        }
    );

    await t.test(
        'It should throw an error if the density isnt a number',
        () => {
            try {
                Converter.create({
                    file: 'test/OPW 733 Tienduizend redenen.pdf',
                    output: 'output/',
                    density: '1',
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'Density should be a valid density number'
                );
            }
        }
    );

    await t.test(
        'It should throw an error if the density is 10 or more',
        () => {
            try {
                Converter.create({
                    file: 'test/OPW 733 Tienduizend redenen.pdf',
                    output: 'output/',
                    density: 9,
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'Density should be a valid density number'
                );
            }
        }
    );

    await t.test(
        'It should throw an error if the density is less than 1000',
        () => {
            try {
                Converter.create({
                    file: 'test/OPW 733 Tienduizend redenen.pdf',
                    output: 'output/',
                    density: 1001,
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'Density should be a valid density number'
                );
            }
        }
    );

    await t.test(
        'It should throw an error if the quality isnt a number',
        () => {
            try {
                Converter.create({
                    file: 'test/OPW 733 Tienduizend redenen.pdf',
                    output: 'output/',
                    quality: '1',
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'Quality should be a valid quality number'
                );
            }
        }
    );

    await t.test('It should throw an error if the quality is 1 or more', () => {
        try {
            Converter.create({
                file: 'test/OPW 733 Tienduizend redenen.pdf',
                output: 'output/',
                quality: -1,
            });
        } catch (error) {
            assert.strictEqual(
                error.message,
                'Quality should be a valid quality number'
            );
        }
    });

    await t.test(
        'It should throw an error if the quality is less than 100',
        () => {
            try {
                Converter.create({
                    file: 'test/OPW 733 Tienduizend redenen.pdf',
                    output: 'output/',
                    quality: 101,
                });
            } catch (error) {
                assert.strictEqual(
                    error.message,
                    'Quality should be a valid quality number'
                );
            }
        }
    );
});
