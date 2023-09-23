import { RegistrationError } from "../RegistrationError";

type Options = {
    request: RegistrationRequest,
    onSuccess: () => void,
    onError: (error: RegistrationError) => void,
}

export async function registerUser({
    request,
    onSuccess,
    onError
}: Options): Promise<void> {
    setTimeout(() => {
        onSuccess();
    }, 1000);
}