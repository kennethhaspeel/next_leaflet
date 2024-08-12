import dynamic from "next/dynamic";

export default function MyPage() {
  const Map = dynamic(() => import("@/modules/LocatieUpdateModule"), {
    ssr: false,
  });

  return (
    <main>
      <Map />
    </main>
  );
}
