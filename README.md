# EduLink

## Table of Contents

- [Get started](#get-started)
- [References](#references)
- [Standards](#standards)

## Get started

1. Use Node LTS Version, Basic Docker File is included for development.

2. Install dependencies using npm, yarn or pnpm in app and server

   ```bash
   cd app/
   npm i
   yarn i
   pnpm i
   cd ../server
   npm i
   yarn i
   pnpm i
   cd ../web
   npm i
   yarn i
   pnpm i
   ```

   - NOTE: There is a problem with pnpm and expo, so it is recommended to use npm or yarn.

3. Start the app using expo, npm, yarn or pnpm from the main directory

   ```bash
   cd app/
   npx expo start
   ```

   To remove the cache and start fresh, use the following command:

   ```bash
   npx expo start -c
   ```

 ```bash
   cd web/
   npm run dev
   yarn run dev
   pnpm run dev
   ```
For AI directory, you have to create new virtual environment, install requirements, and run it.
```bash
python -m venv /path/to/virtual-env
pip install -r requirements.txt\
fastapi run api.py
```

4. Start the server using npm, yarn or pnpm from the main directory

   ```bash
   cd server/
   npm run dev
   yarn run dev
   pnpm run dev
   ```

   To remove the cache and start fresh, use the following command:

   ```bash
   npx expo start -c
   ```

5. In Local Development, Request the `.env` file from the project owner.

## References

- [Prisma](https://www.prisma.io/docs/)
- [Figma](https://www.figma.com/design/5k8xTl5jkWyIShEKXxdNOM/Senior-Project)
- [Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/docs/getting-started)
- [NativeWind](https://www.nativewind.dev/v4/overview/)
- [Testing React Native Apps](https://reactnative.dev/docs/testing-overview)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Clerk](https://clerk.com/docs/quickstarts/expo)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/react-native)
- [React Native Reusable](https://rnr-docs.vercel.app/getting-started/introduction/)
- [tRPC](https://trpc.io/docs/quick-start)

## Branching

- Branches should be named in the following format: `type/feature-fe|be-description`.
- Type Includes: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`.
- BE or FE indicates whether the feature is a front-end or back-end feature.
- Description should be a brief description of the feature.
- Example: `feat/login-fe-form`, `refactor/schedule-be-fetchInfo`.
