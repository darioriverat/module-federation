# Module Federation Implementation Notes

## Federated App Integration Challenges (Vanilla JS)

<img src="./img/federation_app_one.png" alt="Federation App One" width="300">

### Critical Issues Identified

#### 1. Event Lifecycle Management
- **Problem**: `window.onload` events don't fire for dynamically loaded federated modules.
- **Root Cause**: The main page (host) has already completed loading when the federated module is imported.
- **Impact**: Initialization code executes immediately instead of waiting for DOM readiness.
- **Reference**: [Commit cd2471c](https://github.com/darioriverat/module-federation/commit/cd2471c239aaed18abc77558803e1c1e8f2c4455)

#### 2. CSS Cascading Conflicts
- **Problem**: Style conflicts between host and federated applications.
- **Example**: `.operator` class styling is overridden by the last loaded .module (app_one).
- **Impact**: Visual inconsistencies and unintended styling inheritance.
- **Solution Considerations**:
  - CSS-in-JS or scoped styles
  - CSS modules with unique class names
  - Shadow DOM implementation

#### 3. CSS Selector Context Issues
- **Problem**: CSS styles targeting `#app` don't apply when the federated module is mounted to `#app_one`.
- **Root Cause**: Federated application CSS selectors are designed for `#app` container but fail when mounted to different container IDs like `#app_one`.
- **Impact**: Layout breakage, positioning issues, and visual inconsistencies in federated context.
- **Example**: Header and image centering styles fail because they rely on `#app` selector which doesn't exist in the federated mounting context.
