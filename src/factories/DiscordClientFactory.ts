import { Client } from "discord.js"

export default class DiscordClientFactory {
  public createClient(token: string): Promise<Client<true>> {
    const client = new Client({ intents: [] })

    return new Promise(resolve => {
      client.login(token).catch(() => {
        throw new Error("Invalid Discord bot token provided")
      })

      client.on("ready", () => {
        resolve(client)
      })
    })
  }
}
