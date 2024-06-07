type AccountInfo = {
    "email": string
    "emailVerified": boolean,
    "session": {
        "id": string,
        "userId": string,
        "fresh": boolean,
        "expiresAt": string
    }
}

export type { AccountInfo };
