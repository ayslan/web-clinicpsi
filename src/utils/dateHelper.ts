import { format } from 'date-fns';
import { IOptionData } from '../components/ui/select';

export const DATE_FORMAT = 'DD/MM/YYYY';

export const datetimeToString = (date: Date, strFormat?: string): string => {
    return format(date, strFormat ?? 'dd/MM/yyyy');
};

export const dateStringUStoPTBR = (date: any): string => {
    var mes = date.toString().substr(5, 2);
    var dia = date.toString().substr(8, 2);
    var ano = date.toString().substr(0, 4);

    return `${dia}/${mes}/${ano}`;
}

//"2021-03-18T10:50:00.0096572Z"
export const dateTimeStringUStoPTBR = (date: any): string => {
    var mes = date.toString().substr(5, 2);
    var dia = date.toString().substr(8, 2);
    var ano = date.toString().substr(0, 4);

    var time = date.toString().substr(11, 8);

    return `${dia}/${mes}/${ano} ${time}`;
}

export const secondsToMs = (d: number) => {
    d = Number(d);
    var m = Math.floor(d / 60).toString().padStart(2, '0');
    var s = Math.floor(d % 3600 % 60).toString().padStart(2, '0');

    return `${m}:${s}`;
}

export const getStatesOptionsData = () => {
    return [
        { value: 'AC', text: 'Acre' },
        { value: 'AL', text: 'Alagoas' },
        { value: 'AP', text: 'Amapá' },
        { value: 'AM', text: 'Amazonas' },
        { value: 'BA', text: 'Bahia' },
        { value: 'CE', text: 'Ceará' },
        { value: 'DF', text: 'Distrito Federal' },
        { value: 'ES', text: 'Espírito Santo' },
        { value: 'GO', text: 'Goías' },
        { value: 'MA', text: 'Maranhão' },
        { value: 'MT', text: 'Mato Grosso' },
        { value: 'MS', text: 'Mato Grosso do Sul' },
        { value: 'MG', text: 'Minas Gerais' },
        { value: 'PA', text: 'Pará' },
        { value: 'PB', text: 'Paraíba' },
        { value: 'PR', text: 'Paraná' },
        { value: 'PE', text: 'Pernambuco' },
        { value: 'PI', text: 'Piauí' },
        { value: 'RJ', text: 'Rio de Janeiro' },
        { value: 'RN', text: 'Rio Grande do Norte' },
        { value: 'RS', text: 'Rio Grande do Sul' },
        { value: 'RO', text: 'Rondônia' },
        { value: 'RR', text: 'Roraíma' },
        { value: 'SC', text: 'Santa Catarina' },
        { value: 'SP', text: 'São Paulo' },
        { value: 'SE', text: 'Sergipe' },
        { value: 'TO', text: 'Tocantins' },
    ] as IOptionData[];
}