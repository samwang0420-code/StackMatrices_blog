# SaaS Buying Checklist PDF Generator

## Installation

Install the required dependencies:

```bash
npm install html2canvas jspdf
# or
yarn add html2canvas jspdf
```

## Usage

Import and use the component:

```tsx
import BuyingChecklist from './components/tools/BuyingChecklist';

function App() {
  return (
    <div>
      <BuyingChecklist />
    </div>
  );
}
```

## Features

- **20 Essential Questions** organized into 5 categories:
  - 💰 Pricing (5 questions)
  - 🔒 Security (4 questions)
  - 🔌 Integration (4 questions)
  - 🎧 Support (4 questions)
  - 🚪 Exit Strategy (3 questions)

- **Each question includes**:
  - Why it's important (explanation)
  - Checkboxes for tracking

- **Contract Red Flags Checklist**:
  - 8 dangerous contract clauses to watch out for
  - Why each is problematic

- **Interactive Features**:
  - Beautiful preview UI
  - One-click PDF download
  - Checkboxes in PDF for printing
  - Notes section for vendor responses

## Customization

You can customize the checklist by editing the `checklistData` and `redFlags` arrays in the component:

```tsx
const checklistData: Category[] = [
  // Add or modify categories and questions
];

const redFlags: RedFlag[] = [
  // Add or modify red flags
];
```
