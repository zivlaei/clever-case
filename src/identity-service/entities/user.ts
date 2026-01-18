export class User {
	public constructor(data: any) {
		this.id = data.id;
		this.name = data.name;
	}

	public readonly id: number;

	public readonly name: string;
}
