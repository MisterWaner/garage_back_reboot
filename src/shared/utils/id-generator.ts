import { nanoid } from "nanoid";

export async function generateStringId(): Promise<string> {
    return nanoid(10);
}
