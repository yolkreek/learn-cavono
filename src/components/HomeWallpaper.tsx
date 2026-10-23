export default function HomeWallpaper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-brand-lite w-screen min-h-dvh h-dvh ">{children}</div>
  );
}
