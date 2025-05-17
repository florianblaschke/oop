class Messager<TMessage extends string[] = []> {
	private message: TMessage;

	constructor() {
		// biome-ignore lint/suspicious/noExplicitAny: any is fine and needed here. ts will yell at us at this stage and the return type gets inferred later on
		this.message = [] as any;
	}

	add<TString extends string>(s: TString): Messager<[...TMessage, TString]> {
		this.message.push(s);

		return this as unknown as Messager<[...TMessage, TString]>;
	}

	print() {
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

const i_mean_that = anotherChance
	.add("It")
	.add("would")
	.add("be")
	.add("nice")
	.add("working")
	.add("for")
	.add("you");

const result = i_mean_that.print();

console.log(result);
