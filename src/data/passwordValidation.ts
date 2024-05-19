interface pwValidationCondition {
    text: string;
    regex: RegExp;
}

export const pwValidationConditions: pwValidationCondition[] = [
    {
        text: 'Password must be equal or greater than 8 characters.',
        regex: /^.{8,}$/,
    },
    {
        text: 'Password must have at least 3 different character classes. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.',
        regex: /^(?:(?=.*[a-z])(?=.*[A-Z])(?=.*\d)|(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])|(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])|(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])).{3,}$/,
    },
];
