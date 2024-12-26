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
    image: "/nameless.gif",
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
      <Button action="/keepitmovin">➡️</Button>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/keepitmovin", (c) => {
  return c.res({
    image: "/birb-walk.gif",
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
      <Button action="/hootyhoot">➡️</Button>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/hootyhoo", (c) => {
  return c.res({
    image: "/hooty-hoo.gif",
    intents: [
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
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

// app.frame("/faq4", (c) => {
//   return c.res({
//     image: "/blobs4.png",
//     intents: [
//       <Button.Transaction target="/mint">Mint</Button.Transaction>,
//       <Button action="/faq3">⬅️</Button>,
//       <Button action="/faq5">➡️</Button>,
//       <Button action="/">🏠</Button>,
//     ],
//   })
// })

// app.frame("/faq5", (c) => {
//   return c.res({
//     image: "/blobsend.png",
//     intents: [
//       <Button.Transaction target="/mint">Mint</Button.Transaction>,
//       <Button action="/">🏠</Button>,
//     ],
//   })
// })

app.frame("/finish", (c) => {
  const {} = c
  return c.res({
    image: "/birbs.png",
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
  // Contract transaction response.
  return c.contract({
    abi,
    chainId: "eip155:8453",
    functionName: "mint",
    args: [BigInt(1)],
    to: "0xD1fCb4BDBde69F04540d2c52a81AE33aBEA46400",
    value: BigInt(500000000000000),
  })
})

export const GET = handle(app)
export const POST = handle(app)
