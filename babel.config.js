module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                targets: {
                    edge: '17',
                    ie: '11',
                    firefox: '50',
                    chrome: '64',
                    safari: '11.1'
                }
            }
        ]
    ]
}