import { IOptionData } from "../components/ui/select";

export const convertEnumToOptionData = (objEnum: any) => {
    const arrayObjects = []
    // Retrieve key and values using Object.entries() method. 
    for (const [propertyKey, propertyValue] of Object.entries(objEnum)) {

        // Ignore keys that are not numbers
        if (!Number.isNaN(Number(propertyKey))) {
            continue;
        }

        // Add keys and values to array
        arrayObjects.push({ value: propertyValue, text: propertyKey } as IOptionData);
    }

    return arrayObjects
}