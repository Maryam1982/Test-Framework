const assert = require("assert");

it("Has a text input", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  assert(input);
});

it("Shows confirmation message with correct email", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  input.value = "dummyEmail@dummy.com";
  dom.window.document
    .querySelector("form")
    .dispatchEvent(new dom.window.Event("submit"));

  const h1 = dom.window.document.querySelector("h1");
  assert.strictEqual(h1.innerHTML, "This is a valid Email!");
});

it("Shows error message with incorrect email", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  input.value = "invalidEmail";
  dom.window.document
    .querySelector("form")
    .dispatchEvent(new dom.window.Event("submit"));
  const h1 = dom.window.document.querySelector("h1");
  assert.strictEqual(h1.innerHTML, "This is not a valid Email!");
});
