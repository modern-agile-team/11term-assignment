function solution(s) {
    const length = s.length;

    if (length !== 4 && length !== 6) {
        return false;
    }

    for (let i = 0; i < length; i++) {
        const onlyNumber = s[i];

        if (onlyNumber < '0' || onlyNumber > '9') {
            return false;
        }
    }

    return true;
}