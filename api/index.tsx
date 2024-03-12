import { Button, Frog } from 'frog'
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
      <Button.Transaction target="/mint">Mint an Onchain Blob</Button.Transaction>,
      <Button.Link href="https://opensea.io/collection/onchain-blobs">Blobs Opensea</Button.Link>
    ]
  })
})
 
app.frame('/finish', (c) => {
  const { } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 40 }}>
        Click button to view on Opensea!
      </div>
    ),
    intents: [
      <Button.Link href="https://opensea.io/collection/onchain-blobs">Blobs Opensea</Button.Link>,
      <Button action='/'>Start Again</Button>
    ]
  })
})
 
app.transaction('/mint', (c) => {
  // Contract transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:8453',
    functionName: 'mint',
    args: [],
    to: '0xc03665CFC813F89d1BB1A959A2819Da1A136dbF5',
    value: BigInt(250000000000000)
  })
})

export const GET = handle(app)
export const POST = handle(app)
