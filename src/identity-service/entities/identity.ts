import Cookies from "js-cookie";
import { DateTime } from "luxon";
import { User } from "./user";

const enum Path {
	AccessToken = "access-token",
	RefreshToken = "refresh-token",
	Locale = "locale"
}

export class Identity {
	public constructor() {
		const accessToken = this._cookies.get(Path.AccessToken);
		const refreshToken = this._cookies.get(Path.RefreshToken);

		if (accessToken != null && refreshToken != null) {
			this.tokens = { access: accessToken, refresh: refreshToken };
		}
	}

	private readonly _cookies: Cookies.CookiesStatic<string> = Cookies;

	public tokens: { refresh: string; access: string } | undefined;
	
	public employee: User | undefined;
	
	public setTokens(accessToken: string, refreshToken: string) {
		this._cookies.set(Path.RefreshToken, refreshToken, { path: "/" });
		this._cookies.set(Path.AccessToken, accessToken, { path: "/" });
		this.tokens = { access: accessToken, refresh: refreshToken };
	}

	public get authenticated() {
		if (this.tokens == null) {
			return false;
		}

		const expires = this.accessTokenExpirationDateTime;

		if (expires < DateTime.local()) {
			return false;
		}

		return true;
	}
	
	public setInitialInformations() {
		// Set user data
	}

	public get accessTokenExpirationDateTime() {
		let expirationDateInSeconds: number;

		try {
			// Check JWT token exp
			expirationDateInSeconds = DateTime.now().plus({ minutes: 5 }).toSeconds(); // Placeholder implementation
		} catch(error: any) {
			throw new Error(`Could not parse the JWT token. ${error.message}`);

			expirationDateInSeconds = 0;
		}

		return DateTime.fromSeconds(expirationDateInSeconds);
	}

	/**
	 * Resets the identity of the user
	 */
	private reset() {
		this.tokens = undefined;
		this.employee = undefined;

		this._cookies.set(Path.AccessToken, "", { path: "/" });
		this._cookies.set(Path.RefreshToken, "", { path: "/" });
	}

	public logout() {
		// Can be extended in the future to do more logout related tasks
		this.reset();
	}
}
