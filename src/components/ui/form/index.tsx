import React, { FC, useEffect } from 'react';
import styles from './Form.module.scss';
import { Form as FormReact } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Decorator, Mutator } from 'final-form';
import { ObjectSchema } from 'yup';
import { CSSProperties } from 'react';

export interface IForm {
    onSubmit?: (values?: any, erros?: string[]) => void;
    initialValues?: object;
    schema?: ObjectSchema;
    decorators?: Decorator[];
    mutators?: { [key: string]: Mutator };
    className?: string;
    children?: React.ReactNode;
    isSubmited?: boolean;
    resetForm?: boolean;
    style?: CSSProperties;
}

const Form: FC<IForm> = ({
    onSubmit,
    initialValues,
    schema,
    decorators,
    className,
    mutators,
    children,
    isSubmited,
    resetForm,
    style
}) => {
    let formProps: any;

    useEffect(() => {
        if (isSubmited && formProps) {
            formProps.form.submit();
        }
    }, [isSubmited, formProps]);

    const validateForm = async (values: any) => {
        try {
            return (await schema?.validate(values, { abortEarly: false })) === null;
        } catch (error) {
            const errors = error.inner.reduce(
                (formError: any, innerError: any) => ({
                    ...formError,
                    [innerError.path]: innerError.message,
                }),
                {},
            );
            if (isSubmited) {
                onSubmit && onSubmit(undefined, []);
            }
            return errors;
        }
    };

    return (
        <div className={`${styles['Form']} ${className || ''}`} style={style}>
            <FormReact
                onSubmit={(values) => onSubmit && onSubmit(values)}
                initialValues={initialValues}
                keepDirtyOnReinitialize={true}
                mutators={{
                    ...arrayMutators,
                    ...mutators,
                    addValue: ([name, val], state, { changeValue }) => {
                        changeValue(state, name, (value) => (value = val));
                    },
                }}
                decorators={[...(decorators || [])]}
                validate={validateForm}
            >
                {(props) => {
                    formProps = props;
                    return (
                        <form onSubmit={(e) => {

                            props.handleSubmit(e);
                            if (resetForm && formProps.valid) {
                                props.form.reset();
                                Object.keys(props.values).forEach((key) => {
                                    props.form.resetFieldState(key);
                                });
                            }
                        }}>
                            {typeof children === 'function' ? children(formProps) : children}
                        </form>
                    );
                }
                }
            </FormReact>
        </div >
    );
};

export default Form;
