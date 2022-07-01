export function coroutine(generatorFn) {
  const generator = generatorFn();

  const handleAsync = async (value) => {
    const val = await value().value;
    nextResponse(val);
  };

  const nextResponse = (value) => {
    const response = generator.next(value);
    if (response.done) return;

    handleAsync(response.value);
  };

  nextResponse();
}
