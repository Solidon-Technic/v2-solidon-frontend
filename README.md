# V2 Solidon Frontend

Solidon E-commerce Frontend - A modern, responsive storefront built with Next.js and Tailwind CSS.

## Overview

This is the customer-facing storefront for the Solidon e-commerce platform, featuring:
- Product browsing and search
- Shopping cart functionality
- Secure checkout process
- Customer account management
- Order tracking
- Responsive design for all devices

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Headless UI
- **State Management**: React Context/Hooks
- **Payment**: Stripe integration
- **Runtime**: Node.js 20+

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Running Solidon Backend API

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd v2-solidon-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up your environment variables:
   - Copy `.env.example` to `.env.local`
   - Configure your backend API URL
   - Add Stripe keys and other required variables

4. Start the development server:
```bash
npm run dev
```

The storefront will be available at `http://localhost:8000`

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
# Add other required environment variables
```

## Project Structure

```
src/
├── app/           # Next.js app directory
├── components/    # Reusable UI components
├── lib/           # Utility functions and configurations
├── modules/       # Feature-specific modules
└── ...
```

## Features

- **Product Catalog**: Browse and search products
- **Shopping Cart**: Add, remove, and manage cart items
- **Checkout**: Secure payment processing with Stripe
- **User Accounts**: Registration, login, and profile management
- **Order Management**: View order history and track shipments
- **Responsive Design**: Optimized for desktop, tablet, and mobile

## Customization

The storefront is built with modularity in mind:
- Easily customizable with Tailwind CSS
- Component-based architecture
- Configurable through environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT