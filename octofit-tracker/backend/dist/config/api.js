"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiBaseUrl = exports.getApiBaseUrl = void 0;
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-8000.app.github.dev`;
    }
    return 'http://localhost:8000';
};
exports.getApiBaseUrl = getApiBaseUrl;
exports.apiBaseUrl = (0, exports.getApiBaseUrl)();
