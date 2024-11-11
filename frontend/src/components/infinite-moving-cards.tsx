const items = [
  { title: "A group of flamingos is called a 'flamboyance'." },
  { title: "Honey never spoils, even after 3,000 years." },
  { title: "Bananas are berries, but strawberries are not." },
  { title: "Octopuses have three hearts and blue-colored blood." },
  { title: "A day on Venus lasts longer than its year." },
  { title: "More stars exist than grains of Earth's sand." },
  { title: "Wombat poop is uniquely shaped like a cube." },
  { title: "Humans share 50% of DNA with bananas." },
  { title: "The shortest war lasted only 38 minutes." },
  { title: "Sharks are older than trees on Earth." },
  { title: "Sloths can hold breath longer than most dolphins." },
  { title: "Koalas have fingerprints remarkably similar to human ones." },
  { title: "Butterflies use their feet to taste different foods." },
  { title: "Cows form best friendships and stay together often." },
];


export function InfiniteMovingCards() {
  return (
    <div className="relative overflow-hidden bg-neutral-100 py-2 dark:bg-neutral-800">
      <div className="flex w-full">
        <div className="animate-infinite-scroll flex">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-[250px] flex-shrink-0 rounded-lg bg-white p-3 mx-2 shadow-md dark:bg-neutral-950"
            >
              <h3 className="text-lg font-semibold text-neutral-900 text-center dark:text-neutral-50">{item.title}</h3>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="animate-infinite-scroll flex">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-[250px] flex-shrink-0 rounded-lg bg-white p-3 mx-2 shadow-md dark:bg-neutral-950"
            >
              <h3 className="text-lg font-semibold text-neutral-900 text-center dark:text-neutral-50">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}