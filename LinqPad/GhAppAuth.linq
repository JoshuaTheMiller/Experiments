<Query Kind="Program">
  <NuGetReference>Microsoft.IdentityModel.Tokens</NuGetReference>
  <NuGetReference>Octokit</NuGetReference>
  <NuGetReference>System.IdentityModel.Tokens.Jwt</NuGetReference>
  <NuGetReference>System.Security.Cryptography.OpenSsl</NuGetReference>
  <Namespace>Microsoft.IdentityModel.Tokens</Namespace>
  <Namespace>System.IdentityModel.Tokens.Jwt</Namespace>
  <Namespace>System.Security.Claims</Namespace>
  <Namespace>System.Security.Cryptography</Namespace>
  <Namespace>System.Security.Cryptography.X509Certificates</Namespace>
  <Namespace>Octokit</Namespace>
  <Namespace>System.Threading.Tasks</Namespace>
</Query>

async Task Main()
{
	//	require 'openssl'
	//	require 'jwt'  # https://rubygems.org/gems/jwt
	//
	//	# Private key contents
	//	private_pem = File.read("YOUR_PATH_TO_PEM")
	//	private_key = OpenSSL::PKey::RSA.new(private_pem)
	//
	//	# Generate the JWT
	//	payload = {
	//	# issued at time, 60 seconds in the past to allow for clock drift
	//		iat: Time.now.to_i - 60,
	//	  # JWT expiration time (10 minute maximum)
	//	  exp: Time.now.to_i + (10 * 60),
	//	  # GitHub App's identifier
	//	  iss: "YOUR_APP_ID"
	//	}
	//
	//	jwt = JWT.encode(payload, private_key, "RS256")
	//	puts jwt

	var appName = "TeamSync";
	var privateKeyPath = @"C:\Users\joshu\Downloads\team-sync-josh.2023-01-17.private-key.pem";
	var appId = "282534";
	var jwtToken = GetJwt(privateKeyPath, appId);
	
	jwtToken.Dump();

	// https://octokitnet.readthedocs.io/en/latest/github-apps/#authentication
	var appClient = new GitHubClient(new ProductHeaderValue(appName))
	{
		Credentials = new Credentials(jwtToken, AuthenticationType.Bearer)
	};

	var app = await appClient.GitHubApps.GetCurrent();

	// Get a list of installations for the authenticated GitHubApp
	var installations = await appClient.GitHubApps.GetAllInstallationsForCurrent();

	// Get a specific installation of the authenticated GitHubApp by it's installation Id
	var installation = await appClient.GitHubApps.GetAllInstallationsForCurrent();
	
	installation.Dump();

	var installationId = installation.First().Id;
	var response = await appClient.GitHubApps.CreateInstallationToken(installationId);

	// Create a new GitHubClient using the installation token as authentication
	var installationClient = new GitHubClient(new ProductHeaderValue($"{appName}-{installationId}"))
	{
		Credentials = new Credentials(response.Token)
	};
	
	var createIssueResponse = await installationClient.Issue.Comment.Create("JoshuaTheMiller", "Experiments", 1, "Hello from my GitHubApp Installation!");
}

string GetJwt(string privateKeyPath, string appId)
{
	// https://docs.hidglobal.com/auth-service/docs/buildingapps/csharp/create-and-sign-a-json-web-token--jwt--with-c--and--net.htm
	string privateKeyPem = File.ReadAllText(privateKeyPath);

	privateKeyPem = privateKeyPem.Replace("-----BEGIN PRIVATE KEY-----", "");
	privateKeyPem = privateKeyPem.Replace("-----END PRIVATE KEY-----", "");

	RSACryptoServiceProvider provider = new RSACryptoServiceProvider();
	provider.ImportFromPem(privateKeyPem);
	RsaSecurityKey rsaSecurityKey = new RsaSecurityKey(provider);

	var handler = new JwtSecurityTokenHandler();

	var signingCredentials = new SigningCredentials(rsaSecurityKey, SecurityAlgorithms.RsaSha256);
	
	var header = new JwtHeader(signingCredentials);
	var notBefore = DateTime.UtcNow;
	var expires = notBefore.AddMinutes(10);
	var issuedAt = DateTime.UtcNow;
	var payload = new JwtPayload(issuer: appId, "", Enumerable.Empty<Claim>(), notBefore, expires, issuedAt);

	var token = new JwtSecurityToken
	(
		header: header,
		payload: payload
	);

	return handler.WriteToken(token);
}