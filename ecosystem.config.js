module.exports = {
    apps : [
        {
            name: "wine-seeker-frontend",
            cwd: './',
            script: "node_modules/.bin/next start",
            env: {
                "NODE_ENV": "production"
            }
        }
    ]
}