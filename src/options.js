/**
 * Process background color.
 *
 * @param {string} color
 *
 * @return {string}
 */
function processBackgroundColor(color) {
    let newColor = color;

    if (newColor.charAt(0) != '#') {
        newColor = '#' + newColor;
    }

    if (newColor.length == 7) {
        let validHex = true;

        for (let i = 1; i < 7; i++) {
            if (!isHex(newColor.charAt(i))) {
                validHex = false;
                break;
            }
        }
        if (validHex) {
            return '"' + newColor + '"';
        }
    }
}

/**
 * Check if char is hex.
 *
 * @param {string} char
 *
 * @return {boolean}
 */
function isHex(char) {
    return char == '0' ||
        char == '1' ||
        char == '2' ||
        char == '3' ||
        char == '4' ||
        char == '5' ||
        char == '6' ||
        char == '7' ||
        char == '8' ||
        char == '9' ||
        char == 'a' ||
        char == 'b' ||
        char == 'c' ||
        char == 'd' ||
        char == 'e' ||
        char == 'f' ||
        char == 'A' ||
        char == 'B' ||
        char == 'C' ||
        char == 'D' ||
        char == 'E' ||
        char == 'F';
}

const channels = [
    'Red',
    'Green',
    'Blue',
    'Alpha',
    'Gray',
    'Cyan',
    'Magenta',
    'Yellow',
    'Black',
    'Opacity',
    'Index',
    'RGB',
    'RGBA',
    'CMYK',
    'CMYKA'
];

const colorspaces = [
    'CMY',
    'CMYK',
    'Gray',
    'LinearGray',
    'Rec709Luma',
    'HCL',
    'HCLp',
    'HSB',
    'HSI',
    'HSL',
    'HSV',
    'HWB',
    'Jzazbz',
    'Lab',
    'LCHab',
    'LCHuv',
    'LMS',
    'Log',
    'Luv',
    'OHTA',
    'Rec601YCbCr',
    'Rec709YCbCr',
    'RGB',
    'scRGB',
    'sRGB',
    'Transparent',
    'xyY',
    'XYZ',
    'YCbCr',
    'YCC',
    'YDbDr',
    'YIQ',
    'YPbPr',
    'YUV',
    'Undefined'
];

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
        this.width;
        this.height;
        this.background = '"#FFFFFF"';
        this.transparent;
        this.invert;
        this.channel;
        this.colorspace;
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
     * Set the transparant.
     *
     * @param {number} transparant
     */
    setTransparant(transparant) {
        if (!transparant) {
            return;
        }

        if (transparant.constructor !== String) {
            throw new Error('Transparant should be a string');
        }

        this.transparant = processBackgroundColor(transparant);
    }

    /**
     * Set the invert
     *
     * @param {boolean} invert
     */
    setInvert(invert) {
        if (!invert) {
            return;
        }

        if (invert.constructor !== Boolean) {
            return;
        }

        this.invert = invert;
    }

    /**
     * Set the channel
     *
     * @param {string} channel
     */
    setChannel(channel) {
        if (!channel || channel.constructor !== String) {
            return;
        }

        if (!channels.includes(channel)) {
            throw new Error('Unknow channel');
        }

        this.channel = channel;
    }

    /**
     * Set the colorspace
     *
     * @param {string} colorspace
     */
    setColorspace(colorspace) {
        if (!colorspace || colorspace.constructor !== String) {
            return;
        }

        if (!colorspaces.includes(colorspace)) {
            throw new Error('Unknow colorspace');
        }

        this.colorspace = colorspace;
    }

    /**
     * Get the resize by width and height.
     *
     * @return {string}
     */
    get resize() {
        if (!this.width) {
            return undefined;
        }

        if (this.height) {
            return this.width + 'X' + this.height;
        }

        return this.width;
    }

    /**
     * Get all options.
     *
     * @return {array}
     */
    get options() {
        return [
            {
                key:   'quality',
                value: this.quality
            },
            {
                key:   'density',
                value: this.density
            },
            {
                key:   'resize',
                value: this.resize
            },
            {
                key:   'height',
                value: this.height
            },
            {
                key:   'background',
                value: this.background
            },
            {
                key:   'transparent',
                value: this.transparent
            },
            {
                key:   'negate',
                value: this.invert === true ? null : undefined
            },
            {
                key:   'channel',
                value: this.channel ? '"' + this.channel + '"' : undefined
            },
            {
                key:   'colorspace',
                value: this.colorspace
            }
        ].filter(option => option.value !== undefined);
    }

    /**
     * Get the convert string.
     *
     * @return {string}
     */
    get convertString() {
        return this.options.reduce(
            (accumulator, currentValue) => {
                if (currentValue.value === null) {
                    return accumulator + ' -' + currentValue.key;
                }

                return accumulator + ' -' + currentValue.key + ' ' + currentValue.value;
            },
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
     * @param {string} transparant
     * @param {boolean} invert
     * @param {string} channel
     * @param {string} colorspace
     *
     * @return {object}
     */
    static create({
        density, quality, width, height, background, transparant, invert, channel, colorspace
    }) {
        const options = new Options();

        options.setDensity(density);
        options.setQuality(quality);
        options.setWidth(width);
        options.setWidth(height);
        options.setBackground(background);
        options.setTransparant(transparant);
        options.setInvert(invert);
        options.setChannel(channel);
        options.setColorspace(colorspace);

        return options;
    }
}

export default Options;
