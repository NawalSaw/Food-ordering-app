# Food Ordering App

A full-stack food ordering platform where users can search for restaurants by city, browse menus, place orders, and track delivery status. Restaurant owners can manage their restaurant profile, menu items, and view/update incoming orders.

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** + **shadcn/ui** (Radix primitives) for styling
- **React Router v6** for client-side routing
- **React Query** for server state management and caching
- **Auth0 React SDK** for authentication
- **React Hook Form** + **Zod** for form validation
- **Stripe** for payment processing
- **Sonner** for toast notifications
- **Lucide React** for icons

### Backend
- **Node.js** with **Express** and TypeScript
- **MongoDB** with **Mongoose** ODM
- **Auth0** JWT validation (`express-oauth2-jwt-bearer`)
- **Cloudinary** for restaurant image uploads (Multer)
- **Stripe** Checkout Sessions & Webhooks for payments
- **express-validator** for request validation

## Architecture

```
frontend/  (Vite + React + TypeScript)
  src/
    main.tsx          - App entry, providers (Router, QueryClient, Auth0)
    AppRoutes.tsx     - Route definitions (7 pages, protected routes)
    pages/            - Page-level components
    api/              - API client hooks (react-query wrappers)
    auth/             - Auth0 provider + ProtectedRoute
    components/       - Shared UI components (shadcn + custom)
    forms/            - Restaurant & user profile forms
    config/           - Order status config, cuisine options
    types.ts          - Shared TypeScript types

backend/  (Express + TypeScript)
  src/
    index.ts          - Server entry, middleware, route mounting
    routes/           - 4 route files (MyUser, MyRestaurant, Order, Restaurant)
    controller/       - 4 controllers with request handlers
    middleware/       - Auth JWT check/parse + validation
    models/           - Mongoose schemas (User, Restaurant, Order)
```

## API Endpoints

### User Management (`/api/my/user`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create a new user (Auth0 callback) |
| GET | `/` | Get current user profile |
| PUT | `/` | Update current user profile |

### Restaurant Owner (`/api/my/restaurant`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Create restaurant listing |
| GET | `/` | Get own restaurant |
| PUT | `/` | Update restaurant details/image |
| GET | `/orders` | Get orders for own restaurant |
| PATCH | `/:orderId` | Update order status |

### Public Restaurant Search (`/api/restaurant`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/search/:city` | Search restaurants by city (pagination, cuisine filter, sort) |
| GET | `/:restaurantId` | Get restaurant details |

### Ordering (`/api/order`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get current user's orders |
| POST | `/checkout/create-checkout-session` | Create Stripe checkout session |
| POST | `/checkout/webhook` | Stripe webhook (order paid) |

## Features

- **Auth0 Authentication** - login/signup with social or email/password
- **Restaurant Search** - search by city, filter by cuisine, sort by distance/delivery price
- **Restaurant Management** - owners can register, update their restaurant, upload images, manage menu items
- **Cart & Checkout** - add menu items to cart, proceed to Stripe Checkout
- **Order Tracking** - real-time order status (placed → paid → in progress → out for delivery → delivered)
- **Order Management** - restaurant owners can update order status as they prepare and deliver food
- **Responsive UI** - mobile-friendly with Tailwind CSS

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGODB_CONNECTION_STRING=<your-mongodb-uri>
AUTH0_AUDIENCE=<auth0-api-audience>
AUTH0_ISSUER_BASE_URL=<auth0-tenant-url>
CLOUDINARY_CLOUD_NAME=<cloudinary-name>
CLOUDINARY_API_KEY=<cloudinary-key>
CLOUDINARY_API_SECRET=<cloudinary-secret>
FRONTEND_URL=http://localhost:5173
STRIPE_API_KEY=<stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<stripe-webhook-secret>
```

### Frontend (`frontend/.env`)
```
VITE_API_BASE_URL=http://localhost:5000
VITE_AUTH0_DOMAIN=<auth0-domain>
VITE_AUTH0_CLIENT_ID=<auth0-client-id>
VITE_AUTH0_CALLBACK_URL=http://localhost:5173
VITE_AUTH0_AUDIENCE=<auth0-api-audience>
```

## Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB instance (Atlas or local)
- Auth0 account & application
- Cloudinary account
- Stripe account (test mode)

### Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd food-ordering-app
   ```

2. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. **Configure environment variables**
   - Copy the template above into `backend/.env` and fill in your values
   - Copy the template above into `frontend/.env` and fill in your values

4. **Start the backend**
   ```bash
   cd backend
   npm run dev
   ```
   Runs the Express server (port 5000) and Stripe webhook listener concurrently.

5. **Start the frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   Runs the Vite dev server on port 5173.

### Scripts

**Backend**
| Command | Description |
|---------|-------------|
| `npm run dev` | Start server + Stripe webhook listener |
| `npm run stripe` | Run Stripe CLI webhook forwarding |

**Frontend**
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run lint` | ESLint check |
| `npm run preview` | Preview production build |

## Data Models

### User
| Field | Type | Description |
|-------|------|-------------|
| `auth0Id` | String | Auth0 user ID |
| `email` | String | User email |
| `name` | String | Full name |
| `addressLine1` | String | Street address |
| `city` | String | City |
| `country` | String | Country |

### Restaurant
| Field | Type | Description |
|-------|------|-------------|
| `user` | ObjectId (ref: User) | Owner reference |
| `restaurantName` | String | Name of restaurant |
| `city` | String | City location |
| `country` | String | Country |
| `deliveryPrice` | Number | Delivery fee |
| `estimatedDeliveryTime` | Number | Minutes |
| `cuisines` | String[] | Cuisine types |
| `menuItems` | MenuItem[] | Menu items (name + price) |
| `imageUrl` | String | Cloudinary image URL |
| `lastUpdated` | Date | Last update timestamp |

### Order
| Field | Type | Description |
|-------|------|-------------|
| `restaurant` | ObjectId (ref: Restaurant) | Restaurant reference |
| `user` | ObjectId (ref: User) | Customer reference |
| `deliveryDetails` | Object | Email, name, addressLine1, city |
| `cartItems` | Array | Menu items ordered |
| `totalAmount` | Number | Order total (set by Stripe webhook) |
| `status` | String | placed / paid / inProgress / outForDelivery / delivered |

## Order Status Flow

```
Placed → Paid (Stripe) → In Progress → Out For Delivery → Delivered
```

- **Placed**: Customer completes checkout on Stripe
- **Paid**: Stripe webhook confirms payment, restaurant sees the order
- **In Progress**: Restaurant starts preparing the order
- **Out For Delivery**: Order is on its way
- **Delivered**: Order completed
