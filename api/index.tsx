import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/vercel'
import { abi } from './abi.js'


export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})

app.frame('/', (c) => {
  return c.res({
    action: '/finish',
    image: "/blobs.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action='/faq1'>What are Blobs?</Button>,
      <Button action='/links'>Links</Button>
    ]
  })
})

app.frame('/links', (c) => {
  return c.res({
    image: "/blobs.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button.Link href="https://opensea.io/collection/onchain-blobs">Opensea</Button.Link>,
      <Button.Link href="https://mint.fun/base/0xD1fCb4BDBde69F04540d2c52a81AE33aBEA46400">Mint.fun</Button.Link>,
      <Button action='/'>🏠</Button>
    ]
  })
})

app.frame('/faq1', (c) => {
  return c.res({
    image: "/blobs1.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action='/faq2'>➡️</Button>,
      <Button action='/'>🏠</Button>
    ]
  })
})

app.frame('/faq2', (c) => {
  return c.res({
    image: "/blobs2.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action='/faq1'>⬅️</Button>,
      <Button action='/faq3'>➡️</Button>,
      <Button action='/'>🏠</Button>
    ]
  })
})

app.frame('/faq3', (c) => {
  return c.res({
    image: "/blobs3.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action='/faq2'>⬅️</Button>,
      <Button action='/faq4'>➡️</Button>,
      <Button action='/'>🏠</Button>
    ]
  })
})

app.frame('/faq4', (c) => {
  return c.res({
    image: "/blobs4.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action='/faq3'>⬅️</Button>,
      <Button action='/faq5'>➡️</Button>,
      <Button action='/'>🏠</Button>
    ]
  })
})

app.frame('/faq5', (c) => {
  return c.res({
    image: "/blobsend.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action='/'>🏠</Button>
    ]
  })
})
 
app.frame('/finish', (c) => {
  const { } = c
  return c.res({
    image: "/finish.png",
    intents: [
      <Button.Link href="https://opensea.io/collection/onchain-blobs">Blobs Opensea</Button.Link>,
      <Button.Link href="https://warpcast.com/apex777">Apex777.eth</Button.Link>,
      <Button action='/'>🏠</Button>
    ]
  })
})
 
app.transaction('/mint', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:8453',
    functionName: 'mint',
    args: [BigInt(1)],
    to: '0xD1fCb4BDBde69F04540d2c52a81AE33aBEA46400',
    value: BigInt(500000000000000)
  })
})

export const GET = handle(app)
export const POST = handle(app)
