import * as Yup from 'yup';

const schema = Yup.object().shape({
    email: Yup.string().required('O campo deve ser preenchido').email('Informe um email válido'),
    password: Yup.string().required('O campo deve ser preenchido'),
});

export default schema;