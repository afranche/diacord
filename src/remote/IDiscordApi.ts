export default interface IDiscordApi {
  getAutomodRules: (guildId: string) => Promise<any>;
  getGuild: (guildId: string) => Promise<any>;
  getGuildChannels: (guildId: string) => Promise<any>;
  getGuildRoles: (guildId: string) => Promise<any>;
}
