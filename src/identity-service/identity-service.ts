import { DateTime, Duration } from "luxon";
import { Identity } from "./entities/identity";

export class IdentityService {
	public constructor() {
		// Dependency injection with api client can be added here in the future
	}

	private _identity: Identity | undefined;
	private _refreshTokenTimeout: any;

	/**
	 * The identity of the currently authenticated user, or undefined if not authenticated.
	 */
	public get identity() {
		if (this._identity == null)
		{
			this._identity = new Identity();
		}

		return this._identity;
	}

	public authenticated() {
		this.verifyAccessTokenExpireDate();
	}
	
	public async autoLogin() {
		if (this.identity.tokens != null)
		{
			try
			{
				if (this.identity.accessTokenExpirationDateTime < DateTime.local())
				{
					await this.reauthenticate();
				}
				else
				{
					await this.verifyAccessTokenExpireDate();
				}
			} catch {
				this.unauthenticate();
			}
		}
	}
	
	public async unauthenticate() {
		try
		{
			this.identity.logout();
			this._identity = undefined;
		}
		catch
		{
			return Promise.resolve(false);
		}

		return Promise.resolve(true);
	}
	
	private async verifyAccessTokenExpireDate() {
		clearTimeout(this._refreshTokenTimeout);

		if (this.identity.tokens == null)
		{
			return;
		}

		const tokenValidityInterval = DateTime.local().until(this.identity.accessTokenExpirationDateTime);
		if (!tokenValidityInterval.isValid)
		{
			await this.reauthenticate();
		}
		var tokenValidityTime = Duration.fromMillis(tokenValidityInterval.length());
		const oneMinute = Duration.fromMillis(1000 * 60);

		const refresh = tokenValidityTime.minus(oneMinute);

		this._refreshTokenTimeout = setTimeout(
			async () => await this.reauthenticate(),
			refresh.get("milliseconds")
		);
	}
	
	public async reauthenticate() {
		try
		{
			// Implementation call to API to refresh token
			this.identity.setTokens("result.data.accessToken", this.identity.tokens?.refresh!);
		}
		catch
		{
			this.unauthenticate();
			return false;
		}
		finally
		{
			this.authenticated();
		}

		return Promise.resolve(this.identity.tokens != null);
	}
	
	public async logIn(username: string, password: string) {
		// Implementation call to API to log in
		await new Promise(resolve => setTimeout(resolve, 200));
		if (username !== "hej@clever.dk" || password !== "123456") {
			throw new Error("Invalid credentials");
		}


		this.identity.setTokens("access_token", "refresh_token");
		this.verifyAccessTokenExpireDate();
	}
}
