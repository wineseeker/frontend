import {LoggedInMenu} from "@/app/components/main-layout/userinfo/logged-in-menu";
import {getUserInfo} from "@/app/lib/get-userinfo";
import {NotLoggedInMenu} from "@/app/components/main-layout/userinfo/not-logged-in-menu";

async function getGravatarURL(email: string): Promise<string> {
    const address = String( email ).trim().toLowerCase();

    const {
        createHash,
    } = await import('node:crypto');
    const hash = createHash('sha256');

    hash.update(address);

    return `https://www.gravatar.com/avatar/${ hash.digest('hex').toString() }?d=mp`
}

export async function UserInfo() {
    const userInfo = await getUserInfo();

    if (userInfo === null || userInfo === -1) {
        return <NotLoggedInMenu userInfo={userInfo} />
    } else {
        return <LoggedInMenu avatarUrl={await getGravatarURL(userInfo.email)} userEmail={userInfo.email} />;
    }
}