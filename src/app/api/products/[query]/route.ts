import { NextRequest } from "next/server";
import { getProducts, getToken } from "../../../../../lib/order-cloud";

//export const runtime = 'edge';

export async function GET(req: NextRequest, { params }: { params: { query: string } }) {
    const data = await getProducts({ query: params.query }, await getToken());
    return await Response.json(data);
}
