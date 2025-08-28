# Full-Stack PRP Template

## Feature: [FEATURE_NAME]
**Frontend**: [React | Vue | Angular]  
**Backend**: [Node.js | Python | Go]  
**Database**: [PostgreSQL | MongoDB | Redis]  
**Priority**: [High | Medium | Low]

## Goal
[One sentence describing the full feature]

## Success Criteria
- [ ] End-to-end functionality working
- [ ] Frontend and backend integrated
- [ ] Data persistence working
- [ ] Authentication/authorization implemented
- [ ] All tests passing
- [ ] Deployed and accessible

## Architecture
```
Frontend (React)
    ↓ API calls
Backend (Node.js)
    ↓ Database queries
Database (PostgreSQL)
```

## Tasks

### Backend Tasks
1. [ ] Design database schema
2. [ ] Create migrations
3. [ ] Implement API endpoints
4. [ ] Add authentication
5. [ ] Write API tests

### Frontend Tasks
6. [ ] Create UI components
7. [ ] Implement API client
8. [ ] Add state management
9. [ ] Handle loading/error states
10. [ ] Write component tests

### Integration Tasks
11. [ ] Connect frontend to backend
12. [ ] Test full flow
13. [ ] Add error handling
14. [ ] Performance optimization
15. [ ] Security audit

## API Contract
```typescript
// Request
POST /api/feature
{
  field1: string;
  field2: number;
}

// Response
{
  id: string;
  field1: string;
  field2: number;
  createdAt: string;
}
```

## Validation Loops
1. Backend: `npm run test:backend`
2. Frontend: `npm run test:frontend`
3. E2E: `npm run test:e2e`
4. Security: `npm run audit`

## Deployment Checklist
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] SSL certificates configured
- [ ] Monitoring enabled
- [ ] Backups configured

## Examples
- Backend: `examples/api-patterns/`
- Frontend: `examples/component-patterns/`
- Integration: `examples/fullstack-patterns/`

## Notes
[Additional context or requirements]