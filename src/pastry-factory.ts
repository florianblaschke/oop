type PastryType = "hörnchen" | "bestechungshörnchen";
type Ingredients =
	| "flour"
	| "sugar"
	| "cream_cheese"
	| "margarine"
	| "ground_hazelnuts";

class Pastry {
	protected price: number;
	public readonly type: PastryType;

	constructor(type: PastryType, price: number) {
		this.type = type;
		this.price = price;
	}
}

class Hörnchen extends Pastry {
	public recipe: string;
	protected ingredients: Record<Ingredients, number>;

	constructor() {
		super("hörnchen", 0.5);
		this.ingredients = {
			flour: 4.68,
			margarine: 3.12,
			cream_cheese: 3.12,
			sugar: 3.12,
			ground_hazelnuts: 1.87,
		};

		this.recipe =
			"https://emmikochteinfach.de/mini-haselnuss-hoernchen-mit-frischkaese/";
	}

	getIngredientsForAmount(amount: number) {
		return Object.fromEntries(
			Object.entries(this.ingredients).map(([ingredient, gramm]) => [
				ingredient,
				Math.ceil(gramm * amount),
			]),
		) as Record<Ingredients, number>;
	}

	getRecipe() {
		return this.recipe;
	}
}

class Bestechnungshörnchen extends Pastry {
	protected order: number;
	constructor() {
		super("bestechungshörnchen", 0);
		this.order = 0;
	}

	setOrder(amount: number) {
		this.order = amount;
		return this;
	}

	getOrder() {
		return this.order;
	}
}

class PastryFactory {
	static createPastry(arg: "bake_self"): Hörnchen;
	static createPastry(arg: "invite"): Bestechnungshörnchen;
	static createPastry(arg: "invite" | "bake_self"): Pastry {
		if (arg === "invite") {
			return new Bestechnungshörnchen();
		}
		return new Hörnchen();
	}
}

const bestechungshörnchen = PastryFactory.createPastry("invite");
// @ts-expect-error
bestechungshörnchen.setOrder();

const hörnchen = PastryFactory.createPastry("bake_self");
const amount = 32;
const ingredients = hörnchen.getIngredientsForAmount(amount);
const recipe = hörnchen.getRecipe();

if (bestechungshörnchen.getOrder()) {
	console.log(
		`I will bring ${bestechungshörnchen.getOrder()} Bestechnungshörnchen\n`,
	);
} else {
	console.log(
		`You need: \nWhite Flour: ${ingredients.flour}g \nSugar: ${ingredients.sugar}g \nMargarine: ${ingredients.margarine}g \nCream Cheese: ${ingredients.cream_cheese}g \nGround Hazelnuts: ${ingredients.ground_hazelnuts}g \nfor ${amount} Hörnchen.\nFollow the instructions here: ${recipe}`,
	);
}
