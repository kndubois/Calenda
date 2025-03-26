This is a [Next.js](https://nextjs.org) application that manages a collection of events using a custom REST API powered by [`json-server`](https://github.com/typicode/json-server) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It allows users to view event listings, see details, and manage (create, edit, delete) events from an admin interface.

# Calenda

An application that manages events.

## Useful Information

### localhost

view: [http://localhost:3000](http://localhost:3000)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the API Server

```bash
npm run serve-json
```

This runs json-server on [http://localhost:4000](http://localhost:4000), using the db.json file as the data source.


### 3. Start Next.js Development Server

In a new terminal window, run:

```bash
npm run dev
```

This starts the frontend on [http://localhost:3000](http://localhost:3000).