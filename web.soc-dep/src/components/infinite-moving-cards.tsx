const items = [
  { title: "Aa aa... 🫦💃" },
  { title: "Angadaiyaan leti hoon main jab zor zor se 🫦" },
  { title: "uff angadaiyaan leti hoon main jab zor zor se 🫦💃" },
  { title: "Ooh aah ki awaaz hai aati har aur se 🫦🫦" },
  { title: "Main toh chalun is kadar 🫦💃" },
  { title: "Ki mach jaaye re gadar 🫦" },
  { title: "Hosh wale bhi madhosh aaye re nazar 🫦💃💃" },
  { title: "Mere photo ko mere photo ko seene se yaar 💃" },
  { title: "Chipka le saiyan Fevicol se 🫦" },
]
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