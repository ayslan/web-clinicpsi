import * as Yup from 'yup';

const schema = Yup.object().shape({
    name: Yup.string().required('O campo deve ser preenchido'),
    email: Yup.string().required('O campo deve ser preenchido').email('Informe um email válido'),
    password: Yup.string().required('O campo deve ser preenchido').min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: Yup.string()
        .test('passwords-match', 'As senhas devem ser iguais', function (value) {
            return this.parent.password === value
        })
});

export default schema;