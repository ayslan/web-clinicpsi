import * as Yup from 'yup';

const schema = Yup.object().shape({
    title: Yup.string().required('O campo deve ser preenchido'),
    anamnesisFieldType: Yup.string().required('Escolha uma opção'),
});

export default schema;