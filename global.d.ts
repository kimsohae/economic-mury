import { ShareOptions } from "@/components/ShareButton"


declare global {
    interface Window {
        Kakao: {
            init: (key:string)=>void
            Share: {
                sendDefault: (options: ShareOptions) => void
            }  
        }
    }
}