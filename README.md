# Description
E-commers for publishing itemas such as clothes. shoes, hats, etc.

## Diploy in development
1. Clone repository
2. Create a copy of ```.env.template```, rename to ```.env``` and change enviaronment variables
3. Intall depends 
```
npm install
```
4. Deploy database  
```
docker compose up -d
```
5. Execute the migrations of Prisma 
```
npx prisma migrate dev
```
6. Execute seed 
```
npm run seed
```
7. Deploy proyect 
```
npm run dev
```

