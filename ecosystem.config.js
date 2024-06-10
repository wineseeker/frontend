module.exports = {
    apps : [
        {
            name: "wine-seeker-frontend",
            script: "pnpm run start",
            instances: "max",
            exec_mode: "cluster",
            env: {
                "NODE_ENV": "production"
            }
        }
    ]
}