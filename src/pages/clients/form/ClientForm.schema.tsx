import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().required('O campo deve ser preenchido'),
    birthDate: Yup.string().required('O campo deve ser preenchido'),
    gender: Yup.string().required('O campo deve ser preenchido'),
    status: Yup.string().required('O campo deve ser preenchido'),
    phone: Yup.string().required('O campo deve ser preenchido'),
});

export default schema;