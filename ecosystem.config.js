module.exports = {
    apps : [
        {
            name: "wine-seeker-frontend",
            script: "pnpm run start",
            instances: "max",
            env: {
                "NODE_ENV": "production"
            }
        }
    ]
}