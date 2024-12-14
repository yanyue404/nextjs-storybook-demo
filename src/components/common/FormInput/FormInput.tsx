import { forwardRef } from 'react';
import styles from './FormInput.module.scss';
// https://zh-hans.react.dev/reference/react/forwardRef 使用 forwardRef() 让组件接收 ref 并将其传递给子组件
const FormInput = forwardRef((props: any, ref: any) => {
  return (
    <label className={`${styles['form-input']}`}>
      <input
        ref={ref}
        type="text"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className={`${styles['input']}`}
      />
    </label>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
