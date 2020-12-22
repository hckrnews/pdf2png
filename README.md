# @hckrnews/ppt2pdf
Convert pdf to png or jpg.

If you want convert powerpoint files to png or jpg images, you can do it with this script.

## Requirements

The package requires the following software to be installed:

* imagemagick
* ghostscript

## Installation

    npm install @hckrnews/pdf2png

Debian/Ubuntu:

    sudo apt install imagemagick ghostscript

## Example usage

```
import Converter from '@hckrnews/pdf2png';

const converter = Converter.create({
    file:   'test/OPW 733 Tienduizend redenen.pdf',
    output: 'output/'
});

const result = converter.convert();
```

## Props

files: Array with the files.

output: Output folder.

customConverter: set a custom converter


## Test the package.

```
npm test
```

This will run all the tests in the test folder with mocha.

If you only want to check the eslint rules, just run.

```
npm run lint
```
