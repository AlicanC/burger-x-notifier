const fetch = require("node-fetch");
const notifier = require("node-notifier");
const opn = require("opn");

const url = "https://www.yemeksepeti.com/burger-x-goztepe-istanbul";
const closedText = "bir yoğunluk sebebiyle şu anda servis dışıdır";

const isClosed = async () => {
  const response = await fetch(url);
  const text = await response.text();
  const closed = text.indexOf(closedText) !== -1;
  return closed;
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  console.log("Burger X Notifier is running!");

  while (await isClosed()) {
    await sleep(1000);
  }

  notifier.notify(
    {
      title: "Burger X Time!",
      message: "Burger X is ready to take your order.",
      sound: true,
      wait: true
    },
    (err, response) => {
      if (response === "activate") {
        opn(url);
      }
    }
  );
})();
