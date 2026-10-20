type BrandWallpaperProps = {
  children: React.ReactNode;
};

export function BrandWallpaper({ children }: BrandWallpaperProps) {
  return (
    <div className="flex flex-col w-full min-h-dvh justify-center items-center bg-[url(/cavono-wallpaper.svg)]">
      {children}
    </div>
  );
}
