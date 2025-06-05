# Skip Hire Page Redesign - We Want Waste

## Overview
This project is a complete redesign of the "Choose Your Skip Size" page for We Want Waste, transforming it from a basic card layout into a modern, interactive experience while maintaining all original functionality.

## 🎯 Project Goals
- Complete visual redesign of the skip selection page
- Maintain all existing functionality
- Improve user experience and interface design
- Ensure full responsiveness across mobile and desktop
- Clean, maintainable React code

## 🚀 Live Demo
[[View Live Demo](your-sandbox-link-here)](https://rem-waste-wheat.vercel.app/)

## 🛠️ Technologies Used
- **Next js 15** framework
- **Framer Motion** for smooth animations and transitions
- **Tailwind CSS** for responsive styling
- **Custom Hooks** for data fetching and state management
- **Modern ES6+** features

## ✨ Key Features

### 🎨 Design Improvements
- **Expandable Card Interface**: Interactive cards that expand to show detailed information
- **Smooth Animations**: Framer Motion powered transitions for a premium feel
- **Modern Visual Design**: Clean, contemporary styling with proper spacing and typography
- **Color-coded Status**: Visual indicators for availability and restrictions

### 📱 Responsive Design
- **Mobile-first approach**: Optimized for mobile devices with touch-friendly interactions
- **Adaptive layouts**: Different layouts for mobile vs desktop
- **Scalable components**: Cards and text that scale appropriately across screen sizes
- **Touch gestures**: Proper touch handling for mobile users

### 🔧 Technical Features
- **TypeScript**: Full type safety throughout the application
- **Custom Hooks**: 
  - `useSkipHire`: Data fetching and state management
  - `useOutsideClick`: Handle click outside modals
- **Error Handling**: Robust error handling for API calls
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance**: Optimized rendering with React best practices


### 📊 Data Integration
- **API Integration**: Fetches data from `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft`
- **Dynamic Content**: All skip information populated from API
- **Error Handling**: Graceful handling of API failures
- **Loading States**: Proper loading indicators

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [your-repo-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
npm run build
```


---

**Note**: This redesign maintains all original functionality while significantly improving the user experience and code quality. The focus was on creating a modern, interactive interface that works seamlessly across all devices.
