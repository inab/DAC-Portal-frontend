var session = require('express-session');
var Keycloak = require('keycloak-connect');
require('dotenv').config();

var keycloakConfig = {
    "realm": "IPC",
    "auth-server-url": process.env.KEYCLOAK_URL,
    "ssl-required": "external",
    "resource": "dac-portal-api",
    "verify-token-audience": true,
    "credentials": {
      "secret": process.env.KEYCLOAK_DAC_API_CLIENT_SECRET
    },
    "use-resource-role-mappings": true,
    "confidential-port": 0,
    "policy-enforcer": {}
}

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

var sessionData = session({
    secret: Math.random().toString(36).substring(2, 15),
    resave: false,
    saveUninitialized: true,
    store: memoryStore
});

var keycloakAdminCredentials = {
    grantType: 'client_credentials',
    clientSecret: process.env.KEYCLOAK_ADMINCLI_SECRET,
    clientId: 'admin-cli'  
}

// User: AdminRole
const admSettings = {
    client_id: 'dac-portal',
    username: process.env.DAC_PORTAL_API_ADMIN_NAME,
    password: process.env.DAC_PORTAL_API_ADMIN_PASS,
    grant_type: 'password',
    realmName: 'IPC'
};
// User: UserRole
const usrSettings = {
    client_id: 'dac-portal',
    username: process.env.DAC_PORTAL_API_USER_NAME,
    password: process.env.DAC_PORTAL_API_USER_PASS,
    grant_type: 'password',
    realmName: 'IPC'
};

var serverConf = {
    "port": 9090,
    "bodyLimit": "100kb",
    "corsHeaders": ["Link"]
};

export { keycloak, sessionData, keycloakAdminCredentials, admSettings, usrSettings, serverConf };
