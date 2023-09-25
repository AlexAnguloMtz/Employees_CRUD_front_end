import { Secret } from "@/app/common/models/Secret";
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

type SecretFindOptions = {
    id: number,
    onSuccess: (secret: Secret) => void,
    onError: (e: Error) => void,
}

export async function findSecretById({
    id,
    onSuccess,
    onError
}: SecretFindOptions
): Promise<void> {
    setTimeout(() => {
        onSuccess({ id: 0, name: 'Nice', body: 'Hello world' });
    }, 2000);
}

type SecretDeleteOptions = {
    id: number,
    onSuccess: (page: UserPage) => void,
    onError: (e: Error) => void,
}

export async function deleteSecretById({
    id,
    onSuccess,
    onError
}: SecretDeleteOptions
): Promise<void> {
    setTimeout(() => {
        onSuccess({ username: 'nice', secrets: [] });
    }, 2000);
}