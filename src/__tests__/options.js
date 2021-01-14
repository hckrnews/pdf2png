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

describe.each(expectTestCases)(
    'FS helper test',
    ({
        description, input, expected
    }) => {
        it(description, () => {
            expect(Options.create(input).convertString).toBe(expected);
        });
    }
);
