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
      <Button.Transaction target="/mint">Mint in Frame</Button.Transaction>,
      <Button.Link href="https://opensea.io/collection/onchain-blobs">Opensea</Button.Link>,
      <Button.Link href="https://mint.fun/base/0xD1fCb4BDBde69F04540d2c52a81AE33aBEA46400">Mint.fun</Button.Link>
    ]
  })
})
 
app.frame('/finish', (c) => {
  const { } = c
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 40 }}>
        Frame by Apex777.eth - Rawr!
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
    args: [BigInt(1)],
    to: '0xD1fCb4BDBde69F04540d2c52a81AE33aBEA46400',
    value: BigInt(500000000000000)
  })
})

export const GET = handle(app)
export const POST = handle(app)
