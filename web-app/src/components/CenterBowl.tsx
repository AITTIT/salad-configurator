export default function CenterBowl() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] mt-4 lg:mt-0">
      <div className="flex-1 flex flex-row gap-5">
        <button className="flex gap-3 mb-6 items-center">Salaatti</button>
        <button className="flex gap-3 mb-6 items-center">Rahka</button>
        <button className="flex gap-3 mb-6 items-center">Icons</button>
      </div>
      <div className="w-80 h-80 rounded-full border-[12px] border-gray-200 bg-gray-50 flex items-center justify-center shadow-inner relative"></div>
      {/*Added margin*/}
      <div className="my-5">100 g / 1.99 € 500ml</div>
    </div>
  );
}

