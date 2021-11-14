# Data Access Committee (DAC) Portal

## Summary

This repository contains the prototype for the iPC's DAC-Portal, where entitled users can create new Data Access Committees, and also, invite others to join them (DAC-admin). The DAC-members are able to grant/deny incoming Data Access Requests (DAR) performed by the [iPC's Catalogue](https://github.com/inab/iPC_Data_Portal.git) users. Finally, iPC Catalogue users can check their DAR status from the user interface.


## Technologies:

- Frontend: React (Hooks) + Light Bootstrap 4 Theme. Creation of multiple views and dedicated pages depending on the user's role (RBAC).

- Backend: DAC-Portal RESTful API - Express/Nodejs with MongoDB. 

- Integrations:

  - Security: AuthN/Z Keycloak server.

  - API's: [Permissions-API](https://github.com/inab/Permissions-API)
