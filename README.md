# Prox Grocery Deals App (Mobile Prototype)

A mobile-first grocery search and deals experience prototype designed to help users compare prices, discover deals, and optimize their grocery baskets.

---

## 🎬 Live Demo
* **Video Demo:** [Google Drive Demo Video](https://drive.google.com/file/d/1vECZhPdk7viDpunIBOWZjNSI6EJK5rTp/view?usp=sharing)

## 🛠️ Build & Run Instructions

This project can be run as a standard web application or compiled into a native Android app using Capacitor.

### 1. Web Development (Browser)
To run the app locally in your browser for rapid UI prototyping:
```bash
npm install
npm run dev
```

### 2. Native Android App Build (Capacitor)
Follow steps to package this React application into a native Android APK and run it on an emulator or physical device:

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
3. Select target Android Virtual Device (AVD) and click the green **Run (▶)** button to install and launch the application.

---

## 🚀 App Deployment Readiness

The roadmap for taking this application into production:

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

### Deployment Tools (iOS / Xcode Native Focus)

* **Xcode Cloud & Fastlane:**
    * **Xcode Cloud:** Apple's native CI/CD service. It's built directly into Xcode to automate the tedious stuff like certificate and profile management, cloud builds, and automated testing.
    * **Fastlane:** The industry standard for open-source automation. A single script can handle automated screenshots, archiving, and pushing the `.ipa` file straight to TestFlight and App Store Connect.
* **App Store Connect & TestFlight:** Apple's official app management console and beta testing platform. These tie seamlessly into Xcode for distributing test builds to internal teams and external beta testers.
* **Sentry & Firebase Crashlytics:**
    * **Sentry:** Provides incredibly precise, code-level error tracking and performance monitoring—perfect for native Swift projects.
    * **Firebase:** Still a solid go-to option, especially for features like Remote Config and tracking user funnels through Google Analytics.
* **Bitrise / GitHub Actions (Alternative CI/CD):** Great alternatives if the team grows. They offer highly customizable continuous integration and deployment pipelines that can easily scale across multiple platforms.

---

## 📂 Documentation

### Tech Stack Choice

* **Frontend Framework: React.js**
  Chosen for its component-driven architecture and efficient state management using React Hooks. It allows for rapid iteration of the UI and highly reusable components.
* **Build Tool: Vite**
  Utilized as the build tool and local development server. Vite provides a blazing-fast Hot Module Replacement (HMR) experience and highly optimized production builds compared to traditional bundlers.
* **Mobile Bridge: Capacitor**
  (Configured via `capacitor.config.json`) Used to seamlessly wrap the React web application into a native mobile shell. It allows the web prototype to be easily compiled into iOS and Android binaries and interact with native device APIs if needed.
* **Styling: Standard CSS**
  Rather than relying on rigid UI component libraries (like Material UI or Bootstrap), the app relies on custom CSS (e.g., `App.css`, `BottomSheet.css`) and inline styling. This guarantees absolute control over the unique "Tactile Brutalist" design system (thick borders, hard shadows) and keeps the bundle size lightweight.
* **State Management: React Hooks & Custom Store**
  The app uses built-in React state (`useState`) for local UI states and a centralized store (`src/store/store.js`) for managing global data like the cart and grocery inventory, avoiding the overhead of heavy external state libraries like Redux for this prototype phase.

### Component Structure

The application is structured logically to separate concerns and ensure maintainability:

* **`src/features/`**: Contains the core, domain-specific modules of the application.
  * `deals/ProductList.jsx`: The primary screen responsible for displaying grocery deals, search functionality, product categories, and deal cards.
  * `cart/`: Manages all cart-related functionality, including the sliding drawer (`CartDrawer.jsx`), individual items (`CartItem.jsx`), and the final checkout view (`CartResultsScreen.jsx`).
  * `pantry/PantryScreen.jsx`: Handles pantry-related functionality, including smart restock recommendations and inventory tracking concepts.
  * `grocery/` & `map/`: Dedicated modules for handling grocery lists (`GroceryList.jsx`) and store mapping logic.
  * `account/AccountScreen.jsx`: Manages user profile and account settings.
* **`src/components/`**: Contains globally reusable UI components such as `Button`, `Tag`, `BottomSheet`, `SkeletonCard` (loading states), and `EmptyState` (no results/errors).
* **`src/data/`**: Houses `products.json` and `pantry.json`, which serve as a mock database to simulate backend API responses during development and testing.
* **`src/pages/`**: Contains higher-level application views and standalone pages (e.g., `AboutUs.jsx`).
* **`src/store/store.js`**: Manages shared application state and data flow across components.
* **Bottom Sheets & Modals:** Filtering options, cart overviews, and other contextual actions utilize `BottomSheet.jsx` to keep the main shopping experience clean and maintainable.

### UX Decisions

* **Bottom Navigation Revamp (Bringing the Cart Forward)**
  * *Original Design:* The cart was placed as a floating action button in the top-right corner of the screen.
  * *My Decision & Rationale:* I moved "Cart" into the primary bottom navigation bar. For a comparison and checkout-focused application, the cart is the most critical conversion funnel. Moving it to the bottom optimizes for the mobile "Thumb Zone" on larger modern devices. It allows users to seamlessly switch between browsing deals and reviewing their basket, ensuring the cart is always visible on screen and significantly easier to operate.
* **Direct Price Comparison & Store Tabs (Data-at-a-Glance)**
  * *Original Design:* The cart page stacked "Build-a-Cart" and "Cheapest Grocery List" vertically, making it difficult to compare total price discrepancies between retailers at a single glance.
  * *My Decision & Rationale:* On the Deals page, I introduced a "Top 5 Grocery Staples" side-by-side comparison matrix (Walmart vs. Target). This table tracks weekly price trends—visibly displaying whether prices dropped or increased compared to last week—while explicitly highlighting the current cheapest price and store. Additionally, on the Cart page, I implemented top "Store Tabs" so users can instantly toggle their entire basket's total across ALDI, Walmart, and other retailers. This removes the friction of mental math and makes comparison immediate.
* **Transforming Inventory Tracking into "Actionable Pantry"**
  * *Original Design:* The Pantry section acted as a passive utility log that relied purely on manual input, offering limited dynamic value.
  * *My Decision & Rationale:* I upgraded the static pantry list into a proactive "Smart Restock Deals" ecosystem. When the app detects an item is running low (e.g., toilet paper or coffee), it automatically pairs that item with live local discounts (e.g., Target 60% OFF). This shifts the pantry from a chore-based tracking tool into an active incentive layer that drives the user’s next shopping cycle.

---

### How the App Could Fit into the Real Prox App

This conceptual update is not meant to replace the original Prox, but rather serve as its natural product evolution or a "Power User Mode" targeted at high-frequency shoppers:

* **Seamless Design System Integration**
  Because the redesign strictly respects Prox’s established visual parameters (cream backgrounds, dark green/pink accent hits, and heavy-bordered components), these new features can be cleanly modularized into reusable React components and integrated into the production codebase without causing any visual fragmentation.
* **An Ideal Candidate for A/B Testing**
  The original interface is highly minimalist and excellent for clean user onboarding. This new layout is more "data-dense," catering to users looking to maximize saving velocity. The Prox product team could launch an A/B test on the Deals view or Cart comparison tabs to measure how a more direct, trend-mapped layout impacts user retention and final checkout conversion rates.
* **Closing the Loop on Monetization**
  Connecting user consumption cycles (`Pantry Tracker`) with real-time retail pricing (`Smart Restock Deals`) unlocks significant commercial potential for the real Prox platform. By delivering highly contextual, hyper-localized savings notifications when a user is genuinely running out of groceries, Prox can substantially increase user engagement, push-notification CTRs, and downstream affiliate revenue.

### How the App Fits into the Real Prox App
This prototype can serve as the primary "Deals" or "Discovery" tab within the broader Prox app ecosystem. The cart functionality demonstrated here would naturally feed into Prox's core list-building and checkout routing features, seamlessly bridging the gap between deal discovery and actual purchasing.

### What I Would Improve with More Time
* **Backend Integration:** Replace the mock JSON with a real REST/GraphQL API.
* **Offline Support:** Implement local caching (e.g., SQLite via Capacitor) so users can view their saved deals inside grocery stores with poor cellular reception.
* **Animations:** Add subtle transitions (e.g., Framer Motion) when items are added to the cart to make the experience feel even more native and premium.
