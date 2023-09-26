import { BusinessType } from "@/app/common/models/BusinessType";
import { RegistrationError } from "../RegistrationError";
import { BusinessRegistrationRequest } from "@/app/common/models/BusinessRegistrationRequest";

type Options = {
    request: BusinessRegistrationRequest,
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

type FindBusinessTypesOptions = {
    onSuccess: (payload: Array<BusinessType>) => void,
    onError: () => void,
}

export async function findBusinessTypes({
    onSuccess,
    onError
}: FindBusinessTypesOptions
): Promise<void> {
    setTimeout(() => {
        onSuccess([{ id: 0, name: 'Pastelería' }]);
    }, 1000);
}