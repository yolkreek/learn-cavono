import { BrandWallpaper } from "@/components/BrandWallpaper";
import { IconAlertCircle } from "@tabler/icons-react";

export default function Page404() {
  return (
    <>
      <BrandWallpaper>
        <p className="flex flex-row gap-5 items-center text-brand font-extrabold text-[70px]">
          <IconAlertCircle stroke={3} size={80}></IconAlertCircle>
          Error 404
        </p>
      </BrandWallpaper>
    </>
  );
}
