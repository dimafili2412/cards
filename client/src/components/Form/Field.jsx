import React from 'react';
import { FieldContainer, Label, Input, Issue, CheckboxContainer, HiddenCheckbox, PillCheckbox } from './Form.styled';

const Field = ({ label, type, id, value, required = false, onChange = () => {}, issue = '', password = false, placeholder = '' }) => {
  const handleCheckboxClick = (e) => {
    onChange({ ...e, target: { ...e.target, value: value ? 0 : 1 } });
  };
  return (
    <FieldContainer>
      <Label htmlFor={id}>
        {required ? '*' : ''}
        {label}
      </Label>
      {type === 'checkbox' ? (
        <PillCheckbox checked={value ? true : false} onClick={handleCheckboxClick} />
      ) : (
        <Input id={id} type={type} value={value || ''} onChange={onChange} className={`${issue ? 'error' : ''}`} placeholder={placeholder} />
      )}
      {issue ? <Issue>{issue}</Issue> : null}
    </FieldContainer>
  );
};

export default Field;
