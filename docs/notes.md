# Module Federation Implementation Notes

## Vanilla JS Federated App Integration

<img src="./img/federation_app_one.png" alt="Federation App One" width="300">

### Critical Issues Identified

#### 1. Event Lifecycle Management
- **Problem**: `window.onload` events don't fire for dynamically loaded federated modules.
- **Root Cause**: The main page (host) has already completed loading when the federated module is imported.
- **Impact**: Initialization code executes immediately instead of waiting for DOM readiness.
- **Reference**: [Commit cd2471c](https://github.com/darioriverat/module-federation/commit/cd2471c239aaed18abc77558803e1c1e8f2c4455)

#### 2. CSS Cascading Conflicts
- **Problem**: Style conflicts between host and federated applications.
- **Example**: `.operator` class styling is overridden by the last loaded module (app_one).
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

## Vue.js Federated App Integration

<img src="./img/federation_app_two.png" alt="Vue App Integration" style="with: 100%; max-width: 900px;">

### Framework-Specific Observations

#### Vue.js Integration
- **Scoped Styles**: Vue's scoped CSS works correctly and doesn't leak to other federated applications
- **Global Styles**: Global styles (like background colors) still propagate across all federated modules
- **Isolation**: Framework-level CSS scoping provides better isolation than vanilla JavaScript approaches

### Development Environment Issues

#### HMR Style Collision
<img src="./img/federation_hmr.png" alt="HMR Style Collision" width="300" style="">

- **Problem**: Vite HMR assigns identical identifiers to `style.css` files from different federated modules
- **Example**: Both app_one and app_two receive the same identifier: `const __vite__id = "/home/node/app/src/style.css"`
- **Impact**: HMR completely removes styles from one application and replaces them with another's styles
- **Behavior**: 
  - Last loaded module's styles take precedence
  - Modifying styles in the "losing" module temporarily restores its styles but removes the other's
- **Scope**: Only occurs in development mode with HMR enabled
- **Workaround**: Unique file naming or paths for federated apps.
