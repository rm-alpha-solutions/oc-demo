import { cookies } from "next/headers";
import { BuyerProduct } from "ordercloud-javascript-sdk";
import { Suspense } from "react";
import styles from "./page.module.css";

async function getProducts(query: string | undefined) {
    const res = await fetch(`http://localhost:3000/api/products/${query}`, {
        credentials: 'include',
        headers: { Cookie: cookies().toString() }
    });
    try {
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

export default async function Home() {
    const products = (await getProducts("bike")) ?? [];


    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <Suspense>
                    <div>
                        {products.map((product: BuyerProduct) => (
                            <div>{product.Name}</div>
                        ))
                        }
                    </div>
                </Suspense>
            </div>
        </main>
    );
}
