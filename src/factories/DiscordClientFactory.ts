import { Client } from "discord.js"
import InvalidBotTokenError from "../errors/InvalidBotTokenError"

export default class DiscordClientFactory {
  public createClient(token: string): Promise<Client<true>> {
    const client = new Client({ intents: [] })

    return new Promise(resolve => {
      client.login(token).catch(() => {
        throw new InvalidBotTokenError()
      })

      client.on("ready", () => {
        resolve(client)
      })
    })
  }
}
