# News Portal Project

## Deployed at

https://jolly-bay-017f26503.6.azurestaticapps.net/

## Overview

This is a React-based news portal application developed as part of the SE3355 assignment. The portal mimics a modern Turkish news website with various components including a news slider, financial data ticker, weather forecast, and advertisement sections.

## Features

- **Top Navigation Menu**: Categories with dropdown submenus
- **Financial Data Ticker**: Real-time currency exchange rates with visual indicators
- **Main News Slider**: Carousel displaying featured news articles with images
- **Weather Widget**: 5-day weather forecast with visual representations
- **Advertisement Panels**: Product advertisements with closable panels
- **History Tracking**: Records and displays previously viewed news articles

## Technologies Used

- React 18
- TypeScript
- Redux for state management
- CSS Modules for styling
- FontAwesome icons
- React Router for navigation

## Project Structure

```
se3355-assignment-1/
├── public/
├── src/
│   ├── components/
│   │   ├── Finance.tsx           # Currency ticker component
│   │   ├── GecmisModal.tsx       # History modal for visited news
│   │   ├── MainSlider.tsx        # News carousel component
│   │   ├── RandomNews.tsx        # Secondary news component
│   │   ├── StickyAds.tsx         # Advertisement components
│   │   ├── TopMenu.tsx           # Navigation menu
│   │   └── WeatherData.tsx       # Weather forecast component
│   ├── pages/
│   │   └── MainPage.tsx          # Main layout component
│   ├── redux/
│   │   ├── actionTypes.ts        # Redux action type definitions
│   │   ├── actions.ts            # Redux action creators
│   │   ├── reducers.ts           # Redux reducers
│   │   └── store.ts              # Redux store configuration
│   ├── services/
│   │   └── api.ts                # API service for data fetching
│   ├── App.tsx                   # Root component
│   └── index.tsx                 # Entry point
├── ads/                          # Advertisement images
├── package.json
└── tsconfig.json
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/emreutkan/se3355-assignment-1.git
   ```

2. Navigate to the project directory:
   ```
   cd se3355-assignment-1
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Usage

- Browse news categories using the top navigation menu
- View financial data in the ticker at the top
- Navigate through featured news using the slider controls
- Check weather forecast for the next 5 days
- Browse product advertisements on both sides
- Access your viewed news history by clicking on "GEÇMİŞ" in the top menu

## Component Details

### TopMenu
Navigation menu with categories and dropdown submenus. Includes a "GEÇMİŞ" (History) option to view previously visited news.

### Finance
Displays currency exchange rates with auto-scrolling ticker effect. Shows value and percentage changes with color indicators for positive/negative movement.

### MainSlider
Auto-rotating carousel showing featured news with images and titles. Includes navigation arrows and dot indicators. Records visited news in Redux store.

### WeatherData
Shows current temperature and 5-day weather forecast with appropriate icons. Displays high and low temperatures for each day.

### StickyAds
Displays product advertisements on both sides of the content. Shows product images and prices. Ads can be closed individually.

### GecmisModal
Modal popup showing previously visited news articles. Stores up to 10 most recent visited news items using Redux.

## State Management

Redux is used for state management, primarily for:
- Tracking visited news articles
- Controlling the visibility of the history modal

