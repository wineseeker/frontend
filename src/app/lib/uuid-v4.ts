import {v4 as uuidV4} from "uuid";

export class UuidV4 {
    private readonly value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static generate(): UuidV4 {
        return new UuidV4(uuidV4());
    }

    public toString(): string {
        return this.value;
    }
}