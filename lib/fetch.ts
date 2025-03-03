import { User, UserResponse } from "@/lib/type";


export async function getUserResult(user:string):Promise<UserResponse> {
    try{
        const response = await fetch(`${process.env.API_URL}/api/result/${user}`, {
            method: 'GET'
        });
        console.log(response);
        if (!response.ok) {
            throw new Error("Failed to fetch user result");
        }
        return response.json();
    } catch (error) {
        console.log('에러입니다..', error);
        throw new Error("Failed to fetch user result");
    }
}

export async function postUserResult(userId:string, userData:User) {
    try{
        const {score, selectedAnswers} = userData;
        const response = await fetch(`/api/result/${userId}`, {
            method: 'POST',
            body: JSON.stringify({
                score,
                selectedAnswers
            })
        });
        if (!response.ok) {
            throw new Error("Failed to fetch user result");
        }
        return response.json();
    } catch (error) {
        throw new Error("Failed to fetch user result");
    }

}