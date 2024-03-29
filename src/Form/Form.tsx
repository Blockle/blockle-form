import React, { FC, ReactNode, SyntheticEvent } from 'react';
import { FormContext } from '../FormContext/FormContext';
import { setFormSubmitting, setFormTouched } from '../store/actions';
import { UseForm } from '../useForm/useForm';

interface Props {
  children: ReactNode;
  form: UseForm<any>;
  autoComplete?: string;
  className?: string;
}

export const Form: FC<Props> = ({ children, form, ...restProps }) => {
  async function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.invalid) {
      form.store.dispatch(setFormTouched());
      return;
    }

    try {
      form.store.dispatch(setFormSubmitting(true));
      await form.submit(form.values);
    } finally {
      form.store.dispatch(setFormSubmitting(false));
    }
  }

  return (
    <FormContext.Provider value={form.store}>
      <form onSubmit={submit} noValidate {...restProps}>
        {children}
      </form>
    </FormContext.Provider>
  );
};
