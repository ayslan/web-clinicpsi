export interface IClientResponse {
    clientId: number,
    name: string,
    creationDateUtc: Date,
    email: string,
    phone: string,
    phoneAux: string,
    CPF: string,
    observation: string,
    code: string,
    RG: string,
    birthDate: Date,
    maritalStatus: MaritalStatusEnum,
    status: ClientStatusEnum,
    serviceModality: ServiceModalityEnum,
    educationLevel: EducationLevelEnum,
    ageGroup: AgeGroupEnum,
    gender: GenderEnum,
    occupation: string,
    religion: string,
    profession: string,
    tags: string,

    //Address
    zip: string,
    streetAddress: string,
    number: number,
    complement: string,
    district: string,
    city: number,
    state: number,
    country: number,

    //Payment
    insuranceFk: number,
    servicePrice: number,
    insuranceTransferType: CalculationTypeEnum,
    insuranceTransferValue: number,

    //Emergency contact
    emergencyContact: string,
    emergencyPhone: string,

    //fk
    tenantFk: number,
}

export enum MaritalStatusEnum {
    Single = 1,
    Married = 2,
    Widowed = 3,
    Divorced = 4,
    DomesticPartnership = 5
}

export enum ClientStatusEnum {
    Active = 1,
    Inactive = 2,
    Withdrawal = 3,
    Discharge = 4,
    Death = 5
}

export enum ServiceModalityEnum {
    Personal = 1,
    Online = 2
}

export enum EducationLevelEnum {
    Kindergarten = 1, //jardim de infancia
    ElementarySchool = 2, //1 a 5 serie
    MiddleSchool = 3, //6 a 9 serie
    HighSchool = 4, //ensino medio
    AssociatesDegree = 5, //ensino tecnico
    BachelorsDegree = 6, //ensino superior
    GraduateSchool = 7, //pos graduação+
}

export enum AgeGroupEnum {
    Child = 1,
    Teenager = 2,
    Adulto = 3,
    Senior = 4
}

export enum GenderEnum {
    Male = 1,
    Female = 2
}

export enum CalculationTypeEnum {
    Percentage = 1,
    Value = 2
}