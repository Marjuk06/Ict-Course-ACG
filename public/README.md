# ACG Batch Decoder Course Website

A modern, responsive web application for viewing the ACG Batch Decoder course videos with a custom video player interface.

## Features

- **Custom Video Player**: Embedded YouTube videos with custom controls and branding removal
- **Chapter Navigation**: Organized course content into chapters with expandable sections
- **Progress Tracking**: Automatically tracks completed lectures with visual indicators
- **Search Functionality**: Search through lectures by title or number
- **Keyboard Navigation**: Use arrow keys to navigate between lectures
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

## How to Use

1. **Open the Website**: Open `index.html` in your web browser
2. **Navigate Chapters**: Click on chapter titles to expand/collapse sections
3. **Select Lectures**: Click on any lecture to load it in the video player
4. **Search**: Use the search box to find specific lectures
5. **Keyboard Shortcuts**:
   - Arrow Up/Down: Navigate between lectures
   - Space: Toggle play/pause (requires YouTube API)

## File Structure

```
├── index.html      # Main HTML structure
├── style.css       # CSS styles and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Custom Video Player Features

- **YouTube Branding Removed**: Custom parameters hide YouTube branding
- **Protected Interface**: Prevents right-click and keyboard shortcuts
- **Auto-play**: Videos start automatically when selected
- **Progress Tracking**: Completed lectures are marked with green indicators
- **Smooth Transitions**: Animated chapter expansion and lecture selection

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Local Storage

The website uses browser local storage to track:
- Completed lectures
- User progress

## Responsive Design

The website adapts to different screen sizes:
- Desktop: Full layout with side-by-side video and chapters
- Tablet: Optimized layout for medium screens
- Mobile: Stacked layout for small screens

## Security Features

- Prevents direct interaction with YouTube player controls
- Disables right-click context menu
- Blocks keyboard shortcuts on video player
- Custom overlay protection

## Getting Started

1. Download all files to a folder
2. Open `index.html` in your web browser
3. Start learning by clicking on any lecture

## Course Content

The website includes all 6 chapters with their respective lectures:

- **Chapter 1**: Introduction to Batch Decoder
- **Chapter 2**: Basic Concepts and Implementation
- **Chapter 3**: Advanced Topics and Best Practices
- **Chapter 4**: Specialized Topics and Security
- **Chapter 5**: Real-world Applications
- **Chapter 6**: Final Project

Each chapter contains multiple lectures covering different aspects of the ACG Batch Decoder course. 