import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().nullable().required('O campo deve ser preenchido'),
    ageGroup: Yup.string().nullable().required('O campo deve ser preenchido'),
    status: Yup.string().nullable().required('O campo deve ser preenchido'),
    gender: Yup.string().nullable().required('O campo deve ser preenchido'),
});

export default schema;