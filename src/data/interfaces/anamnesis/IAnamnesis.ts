export interface IAnamnesis {
    anamnesisId: number,
    groupName: string,
    tenantFk: number
    topics: IAnamnesisTopic[]
}

export interface IAnamnesisTopic {
    anamnesisTopicId: number,
    name: string,
    order: number,
    anamnesisFk: number,
    fields: IAnamnesisField[]
}

export interface IAnamnesisField {
    anamnesisFieldId: number,
    title: string,
    order: number,
    anamnesisFieldType: string,
    options: string[],
    anamnesisTopicFk: number
}