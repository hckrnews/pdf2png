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
    },
    {
        description: 'Set density to 10',
        input:       {
            density: 10, quality: 70, width: 200, height: 100, background: '336699'
        },
        expected: ' -quality 70 -density 10 -width 200 -height 100 -background "#336699"'
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
