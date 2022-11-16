## Setup

* Use NVM: https://github.com/coreybutler/nvm-windows/releases
* Use .Net: `winget install Microsoft.DotNet.SDK.7`

## How I got here

*(I renamed folders for clarity after running the commands below)*

* `npx create-next-app --example with-typescript my-auth-app`
* `dotnet new webapi`

## Running

* `dotnet run --project .\backend\backend.csproj`
    * Sanity check by going to `SomeURL/swagger/index.html`
* 