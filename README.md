# Lantana

## Overview

- Application Deck can be found at [here] (https://docs.google.com/presentation/d/1eAeva1noI_XTJQfPGRWLnhdjqVC1VVHqZQeC3eWNE6I/edit?usp=sharing)

This is a platform for grassroot organizer to organize sustainability and fundraise form companies, which can easily report on their CSR & ESG initiatives. Social Data and Donating Data are on-chain based on lens protocol with mint of Hypercerts as impact certificate

### Screenshots

Discover

- ![image](https://github.com/web3devcommunity/lantana-hacksg/assets/1883877/1d5e20bd-013a-46b8-ab3b-e7da3d0c1be2)

Donate & Participate

- ![image](https://github.com/web3devcommunity/lantana-hacksg/assets/1883877/dff2b32e-d20b-4175-a65d-d922aa546bb6)

Dashboard

- ![image](https://github.com/web3devcommunity/lantana-hacksg/assets/1883877/9148e0b4-a665-4898-ab2d-f12511253280)

AI Reporting Recommendations

- ![image](https://github.com/web3devcommunity/you-will-never-rust-alone/assets/1883877/46bea6fa-b801-4577-9cba-6c1d36ef277b)

## Structure

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Material ui

- we're forcing @mui/styled-engine to resolve to @mui/styled-engine-sc, so make sure this is installed under node_modules instead of @mui/styled-engine

## Objects on Lens

- We create both Causes and Events as lens object Publication, so we can query in similar fashion
- Practically, user can follow / mint i.e. donate to Cause / Event .
- will need to query events of causes dynamically via tag, while we can just join the data at discovery feed
- We skipped to create event page for now, actions do-able inside cause page

### Note on Lens

- wagmi@0.12.13 is used Lens packages do not support latest version of wagmi which use viem
  - namely, LensProvider in "@lens-protocol/react-web" with @lens-protocol/wagmi requires bindings which use ethers Provider / Signer, and thus rely
- we are also not using @particle-network/connect-react-ui but wallet, to avoid need of injecting provider to wagmi

- On successful login via the useWalletLogin hook, the Lens SDK retrieves the Lens Profile owned by the authenticated wallet address and selects the first profile as the Active Profile.
- creating another lens sdk via `loadClient` cannot retrieve the state of the one inside wagmi
- will need to create from established signer -> wallet onto lens

### Environment variables

- check env.sample and configure `.env` at local
- env-cmd should automatically pick up from that, while it is expected environment variables is injected in Prd/CI

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Bounty Challenge: VMware Tanzu Solutions

Refers to [README.md](./vmware-deployment/README.md) in vmware-deployment file
