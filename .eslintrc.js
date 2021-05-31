module.exports = {
  extends: ['plugin:react/recommended', 'airbnb'],
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // understands let, const and other features
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react', 'react-native'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    // 'react/jsx-curly-brace-presence': 'ignore',
    'import/no-unresolved': 0,
    'no-use-before-define': 'off',
    'import/extensions': ['error', 'never'],
    'react/prop-types': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'import/no-cycle': [2, { maxDepth: 1 }],
    'operator-linebreak': 'off',
  },
};
