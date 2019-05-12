import React, { useState } from 'react';
import { Form, FormData, Button } from '../../../lib';
import { ValidateFields } from '../../../lib/components/form/validator';

export default () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  const [fields] = useState([
    { name: 'username', label: '用户名', input: { type: 'text' }, autoComplete: 'new-password' },
    { name: 'password', label: '密码', input: { type: 'password' }, autoComplete: 'new-password' },
  ]);
  const [errors, setErrors] = useState({});

  const onSubmit = () => {
    const rules = [
      { name: 'username', isRequired: true, message: '必填项' },
      { name: 'username', minLen: 2, maxLen: 4, message: '未在2-4之间' },
      { name: 'password', minLen: 1, maxLen: 4, message: '未在1-4之间' },
      { name: 'password', pattern: /\d+/, message: '不符合正则条件' },
    ];
    const errors = ValidateFields(formData, rules);
    setErrors(errors);
  };

  const onReset = () => {
    const resetFormData: FormData = {};
    const errors = {};
    Object.keys(formData).forEach((k: string) => resetFormData[k] = '');
    setErrors(errors);
    setFormData(resetFormData);
  };

  return <div>
    <div>
      <h1 style={{marginBottom: 20}}>第一个例子</h1>
      <Form 
        onChange={(newFormData: FormData) => setFormData(newFormData)}
        fields={fields} 
        formData={formData}
        errors={errors}
        buttons={[
          <Button type="primary" onClick={onSubmit}>提交</Button>,
          <Button onClick={onReset}>重置</Button>
        ]}
      />
    </div>
  </div>
}