import crypto from "node:crypto"

import http from "node:http"
import url from "node:url"
import { encode } from "node:querystring"
import open from "open"
import { AUTH_AUTHORIZE_URL, AUTH_REDIRECT_LISTENER_PORT, DISCORD_CLIENT_ID } from "../constants/constants"


function generateCodeVerifier() {
  const codeVerifier = crypto.randomBytes(32).toString("hex")
  return codeVerifier
}

function generateCodeChallenge(codeVerifier: string) {
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64")
    .replace(/=/g, "") // Remove padding characters
    .replace(/\+/g, "-")
    .replace(/\//g, "_")

  return codeChallenge
}

function processConsent() {
  const codeVerifier = generateCodeVerifier()
  const codeChallenge = generateCodeChallenge(codeVerifier)
  const redirectUri = `http://localhost:${AUTH_REDIRECT_LISTENER_PORT}/`
  const authUrl = `${AUTH_AUTHORIZE_URL}?${encode({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "identify guilds",
    code_challenge: codeChallenge,
    code_challenge_method: "S256"
  })}`

  console.log(
    "A tab will open in your browser, log in to Discord and provide your consent to continue."
  )
  open(authUrl)

const server = http.createServer((req, res) => {
  const query = url.parse(req.url, true).query

  // Exchange the received authorization code along with the code verifier for a token
  const token = http.get(
    `https://discord.com/api/oauth2/token?grant_type=authorization_code&${encode(
      {
        code: query.code
      }
    )}`
  )
  res.writeHead(200, { "Content-Type": "text/plain" })
  res.end("Success! You can now close this tab.")

  // Immediately close the server after the first request is handled
  server.close(() => {
    console.log("Server has been closed.")
  })
})

  const port = AUTH_REDIRECT_LISTENER_PORT
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}
