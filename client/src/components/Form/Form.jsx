import React, { useEffect, useState } from 'react';
import { FormContainer, ButtonContainer } from './Form.styled';
import { useNavigate } from 'react-router-dom';
import Field from './Field';
import validations from './validations';
import Button from '../Button/Button';

//pass fields as: {label: str, name: str, type: str, placeholder: str, required: bool, validationType: str, password: bool}
//make sure field names are uniqe
const Form = ({ columns = 1, fields = [], onSubmit = () => {} }) => {
  const [values, setValues] = useState({});
  const [issues, setIssues] = useState({});
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    let issues = {};
    fields.forEach((field) => {
      if (field.required && !values[field.name]) {
        issues[field.name] = `Please enter ${field.label}`;
        return;
      }
      if (validations[field.validationType]) {
        const valdiationIssue = validations[field.validationType](values[field.name]);
        if (valdiationIssue) issues[field.name] = valdiationIssue;
      }
    });
    setIssues(issues);
    if (Object.keys(issues).length) {
      return;
    }
    onSubmit(values);
  };

  const handleReset = () => {
    navigate(0);
  };

  useEffect(() => {
    let defaultValues = {};
    fields.forEach((field) => {
      if (field.default !== undefined) {
        defaultValues[field.name] = field.default;
      }
    });
    setValues({ ...values, ...defaultValues });
  }, [fields]);
  return (
    <>
      <FormContainer columns={columns}>
        {fields.map((field, i) => {
          //prevent undefined checkbox
          if (field.type === 'checkbox' && typeof values[field.name] === 'undefined') {
            values[field.name] = 0;
          }
          return (
            <Field
              value={values[field.name]}
              key={`input-${i}-${field.name}`}
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) => {
                setValues({ ...values, [field.name]: e.target.value });
              }}
              issue={issues[field.name]}
            />
          );
        })}
        <ButtonContainer>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleReset}>Reset</Button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
};

export default Form;
