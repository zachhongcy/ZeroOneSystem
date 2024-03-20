export function mapEnumToOptions(_enum) {
    const options = [];

    for (const member in _enum) {
        if (_enum.hasOwnProperty(member) && !isNaN(member)) {
            options.push({
                key: member,
                value: _enum[member],
            });
        }
    }

    return options;
}

export function isNaN(value) {
    return value !== value;
}