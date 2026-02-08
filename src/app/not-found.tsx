import { isMobileDevice } from "@/lib/device";
import DesktopNotFound from "@/components/sections/desktop/NotFound";
import MobileNotFound from "@/components/sections/mobile/NotFound";

export default async function NotFound() {
    const isMobile = await isMobileDevice();

    if (isMobile) {
        return <MobileNotFound />;
    }

    return <DesktopNotFound />;
}
