import { LoginRequest } from "@/app/common/models/LoginRequest";
import { LoginError } from "../LoginError";

type Options = {
    request: LoginRequest,
    onSuccess: () => void,
    onError: (error: LoginError) => void
}

export async function loginUser({
    request,
    onSuccess,
    onError
}: Options
): Promise<void> {
    return;
}