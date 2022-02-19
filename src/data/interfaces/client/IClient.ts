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
    number?: number,
    complement: string,
    district: string,
    cityId?: number,
    state: string,
    countryId?: number,
    foreignStateName: string,
    foreignCityName: string,
    
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
    'Solteiro(a)' = 1, //Single
    'Casado(a)' = 2, //Married
    'Viúvo(a)' = 3, //Widowed
    'Divorciado(a)' = 4, //Divorced
    'União Estável' = 5 //DomesticPartnership
}

export enum ClientStatusEnum {
    'Ativo' = 1, //Active
    'Inativo' = 2, //Inactive
    'Cancelado' = 3, //Withdrawal
    'Alta' = 4, //Discharge
    'Falecido(a)' = 5 //Death
}

export enum ServiceModalityEnum {
    'Presencial' = 1,//Personal
    'Online' = 2
}

export enum EducationLevelEnum {
    'Jardim de Infância' = 1, //Kindergarten
    '1ª a 5ª Série' = 2, //ElementarySchool
    '6º ao 9º Ano' = 3, //MiddleSchool
    'Ensino Médio' = 4, //HighSchool
    'Ensino Técnico' = 5, //AssociatesDegree
    'Ensino Superior' = 6, //BachelorsDegree
    'Pós Graduação+' = 7, //GraduateSchool
}

export enum AgeGroupEnum {
    'Criança' = 1, //Child
    'Adolescente' = 2, //Teenager
    'Adulto' = 3,
    'Idoso' = 4 //Senior
}

export enum GenderEnum {
    'Masculino' = 1, //Male
    'Feminino' = 2 //Female
}

export enum CalculationTypeEnum {
    'Porcentagem' = 1, //Percentage
    'Valor' = 2 //Value
}