import type { Equal, Expect } from "./test-helpers";

class Messager<TMessage extends string[] = []> {
	private message: TMessage;

	constructor() {
		this.message = [] as any;
	}

	add<TString extends string>(s: TString): Messager<[...TMessage, TString]> {
		this.message.push(s);

		return this as unknown as Messager<[...TMessage, TString]>;
	}

	getMessage() {
		return this.message.join(" ") as JoinMessage<TMessage>;
	}
}

type JoinMessage<
	TMessage extends string[],
	TAcc extends string = "",
> = TMessage extends [infer Word extends string, ...infer Rest extends string[]]
	? JoinMessage<Rest, TAcc extends "" ? Word : `${TAcc} ${Word}`>
	: TAcc;

const anotherChance = new Messager();

// Continue here and watch the types of i_mean_that and message change
const i_mean_that = anotherChance.add("It");
const message = i_mean_that.getMessage();

console.log(message);
// @ts-expect-error
type test = Expect<Equal<typeof message, "It would be nice working for you">>;
