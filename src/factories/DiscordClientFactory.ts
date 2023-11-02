import { Client } from "discord.js"

export default class DiscordClientFactory {
  public createClient(token: string): Promise<Client<true>> {
    const client = new Client({ intents: [] })

    return new Promise((resolve, reject) => {
      client.login(token).catch(() => {
        console.error("Error: Invalid Discord bot token provided")
        reject()
      })

      client.on("ready", () => {
        resolve(client)
      })
    })
  }
}
