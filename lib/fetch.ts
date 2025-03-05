import { User, UserResult } from "@/lib/type";
const RETRY_COUNT = 3;

async function fetchRetry(url:RequestInfo, init?:RequestInit) {
    let retry = RETRY_COUNT;
    while(retry > 0) {
        try{  
            const response = await fetch(`${process.env.API_URL || process.env.NEXT_PUBLIC_ROOT_URL}/api${url}`, {
                method: 'GET',
                ...init,
                signal: AbortSignal.timeout(3000)
            });
            if(!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                retry -= 1;
                continue;
            }
            return response;
        } catch(error) {
            console.error(`Fetch attemp failed`, error);
        }
        retry -= 1;
    }
    return null // 최종 실패 시 null 반환
}


export async function fetchUserResult(user:string):Promise<UserResult> {
    const response = await fetchRetry(`/result/${user}`);

    if (!response) {
        throw new Error("Failed to fetch user result");
    }

    return response.json();
}

export async function updateUserResult(userId:string, userData:User) {
    const {score, selectedAnswers} = userData;
    const response = await fetchRetry(`/result/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
            score,
            selectedAnswers
        })
    });
    if (!response) {
        throw new Error("Failed to fetch user result");
    }
    return response.json();
}