const getCodespaceNameFromBrowser = () => {
  if (typeof window === 'undefined') {
    return '';
  }

  const host = window.location.hostname || '';
  const match = host.match(/^([a-z0-9-]+)-5173(?:\.preview)?\.app\.github\.dev$/i);

  if (match && match[1]) {
    return match[1];
  }

  return '';
};

export const getApiBaseUrl = () => {
  const envName = import.meta.env.VITE_CODESPACE_NAME;
  const codespaceName = (typeof envName === 'string' ? envName.trim() : '') || getCodespaceNameFromBrowser();

  if (import.meta.env.DEV) {
    return '';
  }

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const buildApiUrl = (resource) => {
  const normalized = resource.startsWith('/') ? resource : `/${resource}`;
  const baseUrl = getApiBaseUrl();
  return baseUrl ? `${baseUrl}${normalized}` : normalized;
};
