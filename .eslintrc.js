module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,  
    sourceType: 'module',  
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',  
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:node/recommended',
    'plugin:promise/recommended',
  ],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'node/no-unsupported-features/es-syntax': 'off',  
    'import/no-unresolved': 'off',  
    'import/namespace': 'off',  
    'import/default': 'off',  
    'import/no-duplicates': 'off',  
    'import/no-named-as-default': 'off',  
    'import/no-named-as-default-member': 'off',
    'node/no-missing-import': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {},  
    },
  },
};
