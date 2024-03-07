import { cookies } from "next/headers";
import { ApiRole, Auth, BuyerProduct, Configuration, Me, Tokens } from "ordercloud-javascript-sdk";

const clientID = '311D3A03-B94F-460C-9B24-2BCEB54CC138'; //anonymous
const scope: ApiRole[] = [
    'ProductReader',
    'CategoryReader',
    'MeAddressAdmin',
    'MeCreditCardAdmin',
    'Shopper'
]; //string array of [roles](https://ordercloud.io/knowledge-base/security-profiles) the application has access to

Configuration.Set({
    baseApiUrl: 'https://sandboxapi.ordercloud.io',
    timeoutInMilliseconds: 20 * 1000,
   // axiosAdapter: fetchAdapter,
});


export async function auth(token?: string): Promise<string | undefined> {
    try {
        if (!token) {
            const authResponse = await Auth.Anonymous(clientID, scope);
            Tokens.SetAccessToken(authResponse.access_token);
            return authResponse.access_token;
        } else {
            Tokens.SetAccessToken(token);
            return token;
        }
    } catch (err) {
        console.error(err);
    }
}

export async function getToken(skip?: boolean) {
    let token = cookies().get('token')?.value;
    if (token) return token;
    token = await auth();
    if (!skip && token) cookies().set('token', token);
    return token as string;
}

export async function getProducts({ query }: { query?: string }, token: string): Promise<BuyerProduct[] | undefined> {
    try {
        await auth(token);
        let products;
        if (query)
            products = await Me.ListProducts({ search: query }).catch((err) => (console.log(err)));
        else
            products = await Me.ListProducts().catch((err) => (console.log(err)));
        return products?.Items;
    } catch (err) {
        console.error(err);
    }
}