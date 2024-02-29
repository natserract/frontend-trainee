import {useLoaderData, useParams, Await } from "react-router-dom";
import {LoaderFunctionArgs} from "@remix-run/router/utils";
import { Suspense } from 'react'

import Skeleton from "./information-skeleton";

type Params = {
    userId: string;
}

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
    const response = await fetch( `https://jsonplaceholder.typicode.com/todos/${params.userId}`, {
        method: 'get',
        signal: request.signal
    })
    const result = await response.json();

    /**
    return defer({
        data: result
    })
     **/
    return ({
        data: result
    })
}

export function Page() {
    const params = useParams<Params>();
    const result = useLoaderData() as {
        data: Record<string, never>
    }

    return (
        <div>
            Settings Information
            UserID: {JSON.stringify(params)}

            <Suspense fallback={<Skeleton />}>
                <Await
                    resolve={result.data}
                    errorElement={<div>Could not load data 😬</div>}
                    children={(data) => (
                        <>{JSON.stringify(data)}</>
                    )}
                />
            </Suspense>
        </div>
    )
}

