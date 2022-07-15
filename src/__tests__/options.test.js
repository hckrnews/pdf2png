import test from 'node:test';
import assert from 'assert';
import Options from '../options.js';

const expectTestCases = [
    {
        description: 'Default',
        input:       {},
        expected:    ' -quality 90 -density 96 -background "#FFFFFF"'
    },
    {
        description: 'Set quality to 10',
        input:       {
            quality: 10
        },
        expected: ' -quality 10 -density 96 -background "#FFFFFF"'
    },
    {
        description: 'Set density to 10',
        input:       {
            density: 10
        },
        expected: ' -quality 90 -density 10 -background "#FFFFFF"'
    }
];

test('FS helper test', async (t) => {
    await Promise.all(
        expectTestCases.map(
            async ({
                description, input, expected
            }) => {
                await t.test(description, () => {

                    assert.strictEqual(Options.create(input).convertString, expected);
                });
            }
        )
    );
});
