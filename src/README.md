# Source Code Directory

This is where your application code will live. The structure will depend on your project type and framework choice.

## Common Structure Examples

### React/TypeScript Project
```
src/
├── components/       # React components
├── hooks/           # Custom React hooks
├── contexts/        # React contexts
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── styles/          # Global styles
├── assets/          # Images, fonts, etc.
├── App.tsx          # Main app component
├── main.tsx         # Entry point
└── index.css        # Global CSS
```

### Node.js/Express Project
```
src/
├── routes/          # API routes
├── controllers/     # Route controllers
├── models/          # Data models
├── services/        # Business logic
├── middleware/      # Express middleware
├── utils/           # Utility functions
├── config/          # Configuration
├── types/           # TypeScript types
└── index.ts         # Entry point
```

### Full-Stack Project
```
src/
├── client/          # Frontend code
│   ├── components/
│   ├── hooks/
│   └── styles/
├── server/          # Backend code
│   ├── routes/
│   ├── models/
│   └── services/
├── shared/          # Shared code
│   ├── types/
│   └── utils/
└── index.ts         # Entry point
```

## Getting Started

1. Choose your project structure based on your needs
2. Create the necessary directories
3. Start building your application
4. Refer to `examples/` for patterns to follow

## Remember

- Keep files small and focused (< 500 lines)
- Use TypeScript for type safety
- Follow the patterns in `examples/`
- Write tests alongside your code
- Document complex logic