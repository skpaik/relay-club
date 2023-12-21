// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', '<rootDir>/src'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    // transform: {
    //     '^.+\\.tsx?$': 'babel-jest',
    // },
};
