# Prox Grocery Deals App (Mobile Prototype)

A mobile-first grocery search and deals experience prototype designed to help users compare prices, discover deals, and optimize their grocery baskets.

---

## 🛠️ Build & Run Instructions

This project can be run as a standard web application or compiled into a native Android app using Capacitor.

### 1. Web Development (Browser)
To run the app locally in your browser for rapid UI prototyping:
```bash
npm install
npm run dev
```

### 2. Native Android App Build (Capacitor)
Follow these precise steps to package this React application into a native Android APK and run it on an emulator or physical device:

**Step 1: Install Capacitor Packages & Initialize**
```bash
npm install @capacitor/core @capacitor/cli
npx cap init
# Enter your App Name (e.g., Prox) and Package ID (e.g., com.prox.app)
```

**Step 2: Add Android Platform**
```bash
npm install @capacitor/android
npx cap add android
```

**Step 3: Configure Vite for Mobile (Critical for Blank Screen Fix)**
Ensure `vite.config.js` is set to use relative asset pathing so the native Android WebView can resolve JavaScript and CSS paths correctly:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // CRITICAL: Forces relative paths; prevents the app from loading as a blank screen on Android
})
```

**Step 4: Build Web Assets & Sync to Android**
```bash
npm run build
npx cap sync
```

**Step 5: Resolve Legacy Kotlin Module Conflicts**
Due to Capacitor plugins pulling legacy Kotlin JDK dependencies, a `Duplicate class kotlin...` compilation error may occur. To enforce a uniform global resolution strategy, add the following exclusion block to your project's root Gradle file:
* Open `android/build.gradle` (Project Level) and add rules inside `allprojects`:
```gradle
allprojects {
    configurations.all {
        resolutionStrategy {
            // Forcefully exclude legacy duplicate standard libraries
            exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jdk7'
            exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jdk8'
        }
    }
}
```

**Step 6: Launch and Run in Android Studio**
```bash
npx cap open android
```
1. Once Android Studio opens, let Gradle sync completely.
2. Go to **Build > Clean Project** to wipe legacy build artifacts.
3. Select your target Android Virtual Device (AVD) and click the green **Run (▶)** button to install and launch the application.

---

## 🚀 App Deployment Readiness

While this is a high-fidelity prototype, here is the roadmap for taking this application into production:

### Pre-Release Testing
* **Device Testing:** Test on physical devices covering spectrums of screen sizes, specifically:
  * Small: iPhone SE / older Android devices (to check text truncation and scrolling bounds).
  * Large: iPhone 15 Pro Max / Google Pixel 8 Pro.
* **QA Flow:** Conduct manual E2E (End-to-End) testing on core flows: Searching ➡️ Filtering ➡️ Adding to Cart ➡️ Handling Network Errors (airplane mode).

### Bugs & UX Issues to Check Before Shipping
* **Safe Area Margins:** Ensure UI elements don't overlap with iOS dynamic islands, notches, or native phone swipe-to-go-back gestures.
* **Keyboard Obscuration:** Verify that opening the native search keyboard does not push layout elements off-screen or hide the text input field.
* **Memory Leaks:** Ensure high-res product photos are lazy-loaded and correctly destroyed to prevent app crashes on older, low-memory devices.

### App Store (iOS) Preparation
* Enroll in the Apple Developer Program.
* Generate App Icons (1024x1024) and optimized Launch Screens.
* Prepare privacy policies, App Store screenshots (showing the core value prop), and metadata.
* Use **TestFlight** for internal beta testing before submitting for the strict Apple App Review process.

### Google Play Store (Android) Preparation
* Register a Google Play Developer account.
* Generate a signed Android App Bundle (`.aab`) via Android Studio.
* Complete the Data Safety form and content rating questionnaires.
* Utilize the **Google Play Console** to release the app to an Internal Testing track before pushing to production.

### Tools Utilized for Deployment
* **Capacitor / Android Studio / Xcode:** For native compilation, Gradle custom configuration, and device emulation.
* **Expo EAS (Alternative):** Evaluated as a potential cloud build alternative if migrating to React Native in the future.
* **Firebase:** For future deployment of crashlytics, user behavior analytics, and remote configuration flags.

---

## 📂 Documentation

### Tech Stack Choice
* **Frontend Framework:** React (Vite) - Chosen for its fast development server, component-driven architecture, and excellent ecosystem.
* **Mobile Wrapper:** Capacitor - Used to seamlessly convert the web-based React application into a native mobile app for Android and iOS without the overhead of learning a completely separate mobile framework for this stage of the prototype.
* **Styling:** Inline CSS / standard CSS - Selected to keep the prototype lightweight and maintain full control over the mobile-first visual hierarchy without relying on heavy external UI libraries.

### Component Structure
The application is structured logically to separate concerns and ensure reusability:
* `src/features/deals/ProductList.jsx`: The core screen displaying search functionality, categories, and deal cards.
* `src/components/`: Contains reusable UI elements like `SkeletonCard` (loading state) and `EmptyState` (no results/errors).
* `src/data/products.json`: Serves as the mock database representing API responses.
* **Modals:** Separated logic for Location Picker, Filters, and the Savings Tracker to maintain a clean, maintainable main view.

### UX Decisions
* **Mobile-First Layout:** Interactive elements (like the add-to-cart buttons) are sized at least 44x44px for easy thumb tapping.
* **Bottom Sheet Filters:** Instead of overwhelming the screen, complex filters (Dietary, Stores) slide up from the bottom, a standard mobile UX pattern.
* **Loading & Error States:** Implemented skeleton screens to reduce perceived wait times and clear empty states to guide users when no deals match their criteria.
* **Instant Feedback:** The floating savings tracker actively updates and celebrates user savings, encouraging gamified engagement.

### How the App Fits into the Real Prox App
This prototype can serve as the primary "Deals" or "Discovery" tab within the broader Prox app ecosystem. The cart functionality demonstrated here would naturally feed into Prox's core list-building and checkout routing features, seamlessly bridging the gap between deal discovery and actual purchasing.

### What I Would Improve with More Time
* **Backend Integration:** Replace the mock JSON with a real REST/GraphQL API.
* **Offline Support:** Implement local caching (e.g., SQLite via Capacitor) so users can view their saved deals inside grocery stores with poor cellular reception.
* **Animations:** Add subtle transitions (e.g., Framer Motion) when items are added to the cart to make the experience feel even more native and premium.