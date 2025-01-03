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
    image: "/lazybirbs.gif",
    intents: [
      <Button action="/mintLinks">Mint</Button>,
      <Button action="/faq">Tell me more</Button>,
      <Button action="/links">Links</Button>,
    ],
  })
})

app.frame("/links", (c) => {
  return c.res({
    image: "/hooty-hoo.gif",
    intents: [
      <Button action="/mintLinks">Mint</Button>,
      <Button.Link href="https://opensea.io/collection/lazy-birbs">
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
      <Button action="/mintLinks">Mint</Button>,
      <Button action="/faq2">➡️</Button>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/faq2", (c) => {
  return c.res({
    image: "/birb-faq2.png",
    intents: [
      <Button action="/mintLinks">Mint</Button>,
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
      <Button action="/mintLinks">Mint</Button>,
      <Button action="/faq2">⬅️</Button>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.frame("/mintLinks", (c) => {
  return c.res({
    action: "/finish",
    image: "/birb-walk.gif",
    intents: [
      <Button.Transaction target="/mint?amount=1">Mint</Button.Transaction>,
      <Button.Transaction target="/mint?amount=5">Mint 5</Button.Transaction>,
      <Button.Transaction target="/mint?amount=10">Mint 10</Button.Transaction>,
      <Button.Link href="https://birbs.lazyfrank.xyz/">More</Button.Link>,
    ],
  })
})

app.frame("/finish", (c) => {
  if (!c.transactionId) return c.res({ image: "/icon.png" })

  return c.res({
    image: "/congrats.png",
    intents: [
      <Button.Link href="https://opensea.io/collection/lazy-birbs">
        Lazy Birbs Opensea
      </Button.Link>,
      <Button action="/">🏠</Button>,
    ],
  })
})

app.transaction("/mint", (c) => {
  const amount = c.req.query("amount") ? Number(c.req.query("amount")) : 1

  return c.contract({
    abi,
    chainId: "eip155:8453",
    functionName: "mint",
    args: [BigInt(amount)],
    to: "0xc11f09103c575a4e898eb9a1c7bb4486b06546ce",
    value: BigInt(amount * 2000000000000000),
  })
})

export const GET = handle(app)
export const POST = handle(app)
