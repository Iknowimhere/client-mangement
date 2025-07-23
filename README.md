# Client List Table with Multi-Sort & Drag-and-Drop

A modern React application featuring an interactive client management table with advanced sorting capabilities, drag-and-drop functionality, and a professional pill-based UI design.

## ✨ Features

### Core Functionality

- **📊 Interactive Client Table** - Comprehensive view of client data with animated rows
- **🎯 Multi-Criteria Sorting** - Support for unlimited sort fields with priority management
- **🖱️ Drag-and-Drop Interface** - Intuitive reordering of sort criteria
- **💾 Persistent Preferences** - Sort settings saved across browser sessions

### Advanced UI/UX

- **🎨 Pill-Based Sort Panel** - Modern, clickable sort interface
- **⚡ Smooth Animations** - Staggered table animations and transitions
- **🎪 Visual Feedback** - Hover states, drag indicators, and removal zones
- **📱 Responsive Design** - Works seamlessly across all device sizes

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎬 Demo Video

Check out the complete video demonstration in the `demo/` folder to see all features in action:

- Multi-criteria sorting with drag-and-drop priority management
- Real-time table updates and smooth animations
- Persistent preferences across browser sessions
- Professional UI interactions and visual feedback

## 🛠️ Tech Stack

- **React 19.1.0** with TypeScript for type-safe development
- **Vite 7.0.5** for blazing-fast builds and hot module replacement
- **Tailwind CSS 4.1.11** for utility-first styling
- **@dnd-kit** for accessible drag-and-drop interactions
- **shadcn/ui** for professional component design
- **Lucide React** for beautiful, consistent icons

## 🎮 How to Use

1. **View Clients** - Browse the comprehensive client table with all relevant information
2. **Open Sort Panel** - Click the filter icon to access sorting options
3. **Add Sorts** - Click field names or direction pills (A-Z/Z-A) to add sort criteria
4. **Reorder Priority** - Drag sort items to change their priority order
5. **Remove Sorts** - Drag items to the removal zone or click the X button
6. **Persist Settings** - Your sort preferences are automatically saved

## 📁 Project Structure

```
src/
├── App.tsx              # Main application with sort logic
├── components/
│   ├── ClientTable.tsx  # Animated data table
│   ├── SortPanel.tsx    # Interactive sort interface
│   ├── SortItem.tsx     # Draggable sort items
│   └── ui/              # Reusable UI components
├── types.ts             # TypeScript definitions
└── index.css            # Global styles
```

## 🎯 Key Components

- **ClientTable**: Professional table with staggered animations and color-coded indicators
- **SortPanel**: Pill-based interface with drag-to-remove zones and clickable direction toggles
- **SortItem**: Individual draggable sort criteria with visual feedback
- **UI Components**: Modern button and select components with variant system

Built with ❤️ using modern React patterns and best practices.
