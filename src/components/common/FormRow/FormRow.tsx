import styles from './FormRow.module.scss';

export default function FormRow({
  title,
  noborder = false,
  round = false,
  onAction = () => {},
  children,
}) {
  return (
    <div
      className={`${styles['form-row']} ${noborder ? styles.noborder : ''} ${
        round ? styles.round : ''
      }`}
    >
      <label onClick={onAction}>
        <span>{title}</span>
      </label>
      {children}
    </div>
  );
}
