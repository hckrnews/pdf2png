/**
 * Check if char is hex.
 *
 * @param {string} char
 *
 * @return {boolean}
 */
function isHex(char) {
    return (
        char === '0' ||
        char === '1' ||
        char === '2' ||
        char === '3' ||
        char === '4' ||
        char === '5' ||
        char === '6' ||
        char === '7' ||
        char === '8' ||
        char === '9' ||
        char === 'a' ||
        char === 'b' ||
        char === 'c' ||
        char === 'd' ||
        char === 'e' ||
        char === 'f' ||
        char === 'A' ||
        char === 'B' ||
        char === 'C' ||
        char === 'D' ||
        char === 'E' ||
        char === 'F'
    );
}

/**
 * Process background color.
 *
 * @param {string} color
 *
 * @return {string}
 */
function processBackgroundColor(color) {
    let newColor = color;

    if (newColor.charAt(0) !== '#') {
        newColor = `#${newColor}`;
    }

    if (newColor.length === 7) {
        let validHex = true;

        for (let i = 1; i < 7; i += 1) {
            if (!isHex(newColor.charAt(i))) {
                validHex = false;
                break;
            }
        }
        if (validHex) {
            return `"${newColor}"`;
        }
    }

    return undefined;
}

/**
 * Options model.
 */
class Options {
    /**
     * Define all options.
     */
    constructor() {
        this.quality = 90;
        this.density = 96;
        this.width = undefined;
        this.height = undefined;
        this.background = '"#FFFFFF"';
    }

    /**
     * Set the density.
     *
     * @param {number} density
     */
    setDensity(density) {
        if (!density) {
            return;
        }

        if (density.constructor !== Number || density < 10 || density > 1000) {
            throw new Error('Density should be a valid density number');
        }

        this.density = density;
    }

    /**
     * Set the quality.
     *
     * @param {number} quality
     */
    setQuality(quality) {
        if (!quality) {
            return;
        }

        if (quality.constructor !== Number || quality < 1 || quality > 100) {
            throw new Error('Quality should be a valid quality number');
        }

        this.quality = quality;
    }

    /**
     * Set the width.
     *
     * @param {number} width
     */
    setWidth(width) {
        if (!width) {
            return;
        }

        if (width.constructor !== Number || width < 1 || width > 10000) {
            throw new Error('Width should be a valid width number');
        }

        this.width = width;
    }

    /**
     * Set the height.
     *
     * @param {number} height
     */
    setHeight(height) {
        if (!height) {
            return;
        }

        if (height.constructor !== Number || height < 1 || height > 10000) {
            throw new Error('Height should be a valid height number');
        }

        this.height = height;
    }

    /**
     * Set the background.
     *
     * @param {number} background
     */
    setBackground(background) {
        if (!background) {
            return;
        }

        if (background.constructor !== String) {
            throw new Error('Background should be a string');
        }

        this.background = processBackgroundColor(background);
    }

    /**
     * Get all options.
     *
     * @return {array}
     */
    get options() {
        return [
            {
                key: 'quality',
                value: this.quality,
            },
            {
                key: 'density',
                value: this.density,
            },
            {
                key: 'width',
                value: this.width,
            },
            {
                key: 'height',
                value: this.height,
            },
            {
                key: 'background',
                value: this.background,
            },
        ].filter((option) => option.value);
    }

    /**
     * Get the convert string.
     *
     * @return {string}
     */
    get convertString() {
        return this.options.reduce(
            (accumulator, currentValue) =>
                `${accumulator} -${currentValue.key} ${currentValue.value}`,
            ''
        );
    }

    /**
     * Create the options.
     *
     * @param {number} density
     * @param {number} quality
     * @param {number} width
     * @param {number} height
     * @param {string} background
     *
     * @return {object}
     */
    static create({ density, quality, width, height, background }) {
        const options = new Options();

        options.setDensity(density);
        options.setQuality(quality);
        options.setWidth(width);
        options.setHeight(height);
        options.setBackground(background);

        return options;
    }
}

export default Options;
