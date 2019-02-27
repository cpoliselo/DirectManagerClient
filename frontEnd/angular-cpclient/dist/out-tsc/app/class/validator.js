export function NumberValidator(control) {
    var valid = /^\d+$/.test(control.value);
    return valid ? null : { invalidNumber: { valid: false, value: control.value } };
}
//# sourceMappingURL=validator.js.map