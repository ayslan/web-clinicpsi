export enum AnamnesisFieldTypeEnum {
    TextField = 1,
    LargeTextField = 2,
    YesNoOption = 3,
    SingleOption = 4,
    MultipleOption = 5
}

export const AnamnesisFieldTypeLabel = ['Campo de Texto', 'Campo de Texto Grande', 'Campo de Seleção Sim/Não', 'Campo de Seleção Única', 'Campo de Seleção Múltipla'];

export const getLabelAnamnesisFieldType = (value: AnamnesisFieldTypeEnum) => {
    return AnamnesisFieldTypeLabel[value];
}