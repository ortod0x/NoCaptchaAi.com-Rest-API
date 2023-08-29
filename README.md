# NoCaptchaAi.com Rest API

### Disclaimer
- Get Your API Key (You must buy and enable your plans in [NoCaptchaAI](https://nocaptchaai.com) before using this service.)
- Rename from .env.example to .env
- Put your NoCaptchaAi.com Api Key into .env (Ex: NO_CAPTCHA_AI_API_KEY=Your_Api_key)

### How to use
- npm i
- node index.js

## Endpoint & Example
- your_url/api/v1/in (POST)
  ```
  curl -s 'your_url/api/v1/in' -d 'method=captcha_method&sitekey=captcha_sitekey&pageurl=captcha_page_url'
  ```
- your_url/api/v1/out (POST)
  ```
  curl -s 'your_url/api/v1/out' -d 'id=nocaptcha_captcha_id'
  ```
