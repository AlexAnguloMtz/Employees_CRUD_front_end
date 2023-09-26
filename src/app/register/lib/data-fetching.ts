import { BusinessRegistrationError } from "../RegistrationError";
import { BusinessRegistrationRequest } from "@/app/common/models/BusinessRegistrationRequest";
import { RegistrationOptions } from "@/app/common/models/RegistrationOptions";

type Options = {
    request: BusinessRegistrationRequest,
    onSuccess: () => void,
    onError: (error: BusinessRegistrationError) => void,
}

export async function registerBusiness({
    request,
    onSuccess,
    onError
}: Options): Promise<void> {
    try {
        const response: Response = await fetch('/api/businesses', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        });
        if (response.ok) {
            onSuccess();
        }
        else {
            throw new Error('Could not save data');
        }
    } catch (e) {
        onError(BusinessRegistrationError.UNKNOWN_ERROR);
    }
}

type FindDropdownsOptions = {
    onSuccess: (payload: RegistrationOptions) => void,
    onError: (error: Error) => void,
}

export async function findDropdownsOptions({
    onSuccess,
    onError
}: FindDropdownsOptions
): Promise<void> {
    try {
        const response: Response = await fetch('/api/registration-options');
        if (response.ok) {
            const data: RegistrationOptions = await response.json();
            onSuccess(data);
        }
        else {
            throw new Error('Could not load data');
        }
    } catch (e) {
        onError(e as Error);
    }
}