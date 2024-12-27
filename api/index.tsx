import { Button, Frog } from "frog"
import { handle } from "frog/vercel"
import { abi } from "./abi.js"

export const app = new Frog({
  imageAspectRatio: "1:1",
  assetsPath: "/",
  basePath: "/api",
})

app.frame("/", (c) => {
  return c.res({
    action: "/finish",
    image: "/lazybirbs.gif",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action="/faq">Tell me more</Button>,
      <Button action="/links">Links</Button>,
    ],
  })
})

app.frame("/links", (c) => {
  return c.res({
    image: "/hooty-hoo.gif",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button.Link href="https://opensea.io/collection/lazybirbs">
        Opensea
      </Button.Link>,
      <Button.Link href="https://birbs.lazyfrank.xyz/">Website</Button.Link>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/faq", (c) => {
  return c.res({
    image: "/birb-faq1.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action="/faq2">➡️</Button>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/faq2", (c) => {
  return c.res({
    image: "/birb-faq2.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action="/faq1">⬅️</Button>,
      <Button action="/faq3">➡️</Button>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/faq3", (c) => {
  return c.res({
    image: "/birb-faq3.png",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
      <Button action="/faq2">⬅️</Button>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/mint", (c) => {
  return c.res({
    image: "/birb-walk.gif",
    intents: [
      <Button.Transaction target="/mint?amount=1">Mint</Button.Transaction>,
      <Button.Transaction target="/mint?amount=5">Mint 5</Button.Transaction>,
      <Button.Transaction target="/mint?amount=10">Mint 10</Button.Transaction>,
      <Button.Transaction target="/mint?amount=20">Mint 20</Button.Transaction>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/finish", (c) => {
  const {} = c
  return c.res({
    image: "/hooty-hoo.gif",
    intents: [
      <Button.Link href="https://opensea.io/collection/lazybirbs">
        Lazy Birbs Opensea
      </Button.Link>,
      <Button.Link href="https://warpcast.com/lazyfrank">
        LazyFrank.eth
      </Button.Link>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.transaction("/mint", (c) => {
  const amount = c.req.query("amount") ? Number(c.req.query("amount")) : 1

  return c.contract({
    abi,
    chainId: "eip155:84532" as any, // Mainnet: "eip155:8453",
    functionName: "devMint",
    args: [BigInt(amount)],
    to: "0xe65bb470d6a59c895fdc878d3f796818ab1ccb06",
    value: BigInt(500000000000000),
  })
})

export const GET = handle(app)
export const POST = handle(app)
