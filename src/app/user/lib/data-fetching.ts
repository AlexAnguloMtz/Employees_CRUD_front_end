import { SecretCreationRequest } from "@/app/common/models/SecretCreationRequest"
import { UserPage } from "@/app/common/models/UserPage";

type SecretCreationOptions = {
    request: SecretCreationRequest,
    onSuccess: (response: UserPage) => void,
    onError: (e: Error) => void,
}

export async function createSecret({
    request,
    onSuccess,
    onError
}: SecretCreationOptions
): Promise<void> {
    setTimeout(() => {
        onError(new Error());
    }, 2000);
}