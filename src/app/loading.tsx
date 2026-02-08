import { isMobileDevice } from "@/lib/device";
import DesktopLoading from "@/components/sections/desktop/Loading";
import MobileLoading from "@/components/sections/mobile/Loading";

export default async function Loading() {
    const isMobile = await isMobileDevice();

    if (isMobile) {
        return <MobileLoading />;
    }

    return <DesktopLoading />;
}
