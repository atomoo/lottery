module.exports = {
    'extends': [
        'next/core-web-vitals',
        'next/typescript',
        '@ecomfe/eslint-config/strict',
        '@ecomfe/eslint-config/react/strict',
        '@ecomfe/eslint-config/typescript/strict',
        'plugin:@stylistic/disable-legacy',
    ],
    plugins: [
        '@stylistic',
    ],
    'rules': {
        '@typescript-eslint/ban-types': 'off',
        '@stylistic/indent': ['error', 4, {'SwitchCase': 1}],
        '@stylistic/jsx-indent': ['error', 4],
        '@stylistic/quotes': [
            'error',
            'single',
            {'avoidEscape': true},
        ],
        '@stylistic/semi': [
            'error',
            'always',
        ],
        '@stylistic/brace-style': ['error', 'stroustrup'],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/comma-dangle': [
            'error',
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'always-multiline',
                'exports': 'always-multiline',
                'functions': 'never',
            },
        ]
    },
};
