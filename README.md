# Data Access Committee (DAC) Portal frontend

## Summary

This repository contains the user interface of the DAC-Portal, built with React (Hooks) and Light Bootstrap theme 4.

## Architecture

- Domain: DTOs and Ports (Interfaces)

- Application: Use cases. An HTTP repository is injected in a functional way following the dependency inversion principle.

- Infrastructure: Concrete implementations for the Adapters (HTTP, State Mgt - Store), ...

## Testing:

- Unit tests: Jest and React Testing Library

- Integration/e2e tests: Cypress (real-world testing scenario based on user stories)
