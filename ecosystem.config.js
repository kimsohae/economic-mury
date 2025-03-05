module.exports = {
    apps: [
        {
            name: 'economury',
            script: 'yarn start',
            watch: true,
            env: {
                NODE_ENV: 'production'
            },
            post_update: [
                'yarn_build'
            ]
        }
    ]
}