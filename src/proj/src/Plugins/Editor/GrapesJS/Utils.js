export const formSerialize = formElement => {
	const values = {};
	const inputs = formElement.elements;

	for (let i = 0; i < inputs.length; i++) {
		if(inputs[i].name)
			values[inputs[i].name] = inputs[i].value;
	}
	return values;
}
 