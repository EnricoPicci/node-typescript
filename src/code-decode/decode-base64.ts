

export function decode(_s: string) {
    // return btoa(s);
}



export function encodeBuffer(s: string) {
    return Buffer.from(s).toString('base64');
}
export function decodeBuffer(s: string) {
    return Buffer.from(s, 'base64').toString('ascii');
}

