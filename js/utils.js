export function toBinaryUUID(uuid) {
    const pairs = uuid.match(/[\dA-F]{2}/gi);
    const integers = pairs.map(function(s) {
        return parseInt(s, 16);
    });
    
    return integers;
}
