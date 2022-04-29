import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().required('O campo deve ser preenchido'),
});

export default schema;