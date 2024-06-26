const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

function setViewPortsAndUserAgent(device) {
    if (device === 'mob' || device === 'mobile') {
        return {
            viewportWidth: 360,
            viewportHeight: 780,
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16D57'
        }
    }
    if (device === 'web' || device === 'desktop') {
        return {
            viewportWidth: 1266,
            viewportHeight: 768,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36'
        }
    }

    throw new Error('device not supported - [please set device to mob or web]')
}
module.exports = (on, config) => {
    // Inject .env variables into Cypress environment
    Object.keys(process.env).forEach((key) => {
        config.env[key] = process.env[key];
    });

    const device = config.env.DEVICE;
    console.log(`Device from environment:: ${device}`); // Should output 'mob' or 'web'
    const viewportConfig = setViewPortsAndUserAgent(device);

    // Merge the viewportConfig with the existing config
    config = { ...config, ...viewportConfig };


    return config;
};